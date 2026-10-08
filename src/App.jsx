// ============================================================================
// App.jsx  —  the "brain" of the application.
// ============================================================================

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Components
import Navbar from './components/Navbar'
import Home from './components/Home'
import SearchFilter from './components/SearchFilter'
import PropertyList from './components/PropertyList'
import PropertyDetails from './components/PropertyDetails'
import CompareProperties from './components/CompareProperties'
import SearchHistory from './components/SearchHistory'
import CompareBar from './components/CompareBar'
import Footer from './components/Footer'

// Data helpers & Supabase
import { fetchProperties, filterProperties } from './lib/propertyApi'
import { supabase } from './lib/supabaseClient'

import './App.css'

// The filter values we reset back to.
const EMPTY_FILTERS = {
  location: '',
  listingType: 'All',
  type: 'All',
  minPrice: '',
  maxPrice: '',
}

// How many properties can be compared at once.
const MAX_COMPARE = 3

function App() {
  // ---- Screen navigation -------------------------------------------------
  // page.name is one of: 'home' | 'listings' | 'details' | 'compare' | 'history'
  const [page, setPage] = useState({ name: 'home', propertyId: null })

  // ---- Data --------------------------------------------------------------
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState('sample') // 'supabase' | 'sample'
  const [dataMessage, setDataMessage] = useState('')

  // ---- Filters & comparison ---------------------------------------------
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [compareIds, setCompareIds] = useState([])

  // ---- Small toast message ----------------------------------------------
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  // ------------------------------------------------------------------------
  // 1. Load the properties once, when the app first mounts.
  // ------------------------------------------------------------------------
  useEffect(() => {
    let cancelled = false // guards against setting state after unmount

    async function load() {
      setLoading(true)
      const result = await fetchProperties()
      if (cancelled) return

      setProperties(result.properties)
      setDataSource(result.source)
      setDataMessage(result.message)
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  // ------------------------------------------------------------------------
  // 2. Scroll back to the top whenever the screen changes.
  // ------------------------------------------------------------------------
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  // ------------------------------------------------------------------------
  // 3. Helper: show a toast that disappears on its own.
  // ------------------------------------------------------------------------
  const showToast = useCallback((message) => {
    setToast(message)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2600)
  }, [])

  // Clean the timer up when the app unmounts.
  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
    }
  }, [])

  // ------------------------------------------------------------------------
  // 4. Navigation & Search helpers
  // ------------------------------------------------------------------------

  // Go to the home page.
  const goHome = () => setPage({ name: 'home', propertyId: null })

  /**
   * Open the listings page with new filters.
   */
  const browse = (partialFilters = {}) => {
    setFilters({ ...EMPTY_FILTERS, ...partialFilters })
    setPage({ name: 'listings', propertyId: null })
  }

  // Used by the hero search box: keep any other filters, set the location,
  // and log search to Supabase search_history table.
  const searchFromHome = async (term) => {
    const trimmed = term.trim()
    setFilters({ ...EMPTY_FILTERS, location: trimmed })
    setPage({ name: 'listings', propertyId: null })

    // Insert into Supabase search_history
    if (trimmed && supabase) {
      const { error } = await supabase
        .from('search_history')
        .insert([{ query: trimmed, filters: { location: trimmed } }])
      
      if (error) {
        console.error('Failed to log search history:', error.message)
      }
    }
  }

  // Open one property's detail page.
  const openDetails = (property) => {
    setPage({ name: 'details', propertyId: property.id })
  }

  const openCompare = () => setPage({ name: 'compare', propertyId: null })

  const openHistory = () => setPage({ name: 'history', propertyId: null })

  const backToListings = () => setPage({ name: 'listings', propertyId: null })

  // ------------------------------------------------------------------------
  // 5. Comparison helpers.
  // ------------------------------------------------------------------------
  const toggleCompare = (id) => {
    setCompareIds((current) => {
      if (current.includes(id)) {
        return current.filter((existingId) => existingId !== id)
      }

      if (current.length >= MAX_COMPARE) {
        showToast(`You can compare up to ${MAX_COMPARE} properties at a time.`)
        return current
      }

      const next = [...current, id]
      showToast('Added to comparison.')
      return next
    })
  }

  const removeFromCompare = (id) =>
    setCompareIds((current) => current.filter((existingId) => existingId !== id))

  const clearCompare = () => {
    setCompareIds([])
    showToast('Comparison cleared.')
  }

  // ------------------------------------------------------------------------
  // 6. Derived values
  // ------------------------------------------------------------------------

  // Which properties match the current filters.
  const visibleProperties = useMemo(
    () => filterProperties(properties, filters),
    [properties, filters]
  )

  const compareProperties = useMemo(
    () =>
      compareIds
        .map((id) => properties.find((p) => String(p.id) === String(id)))
        .filter(Boolean),
    [compareIds, properties]
  )

  const detailProperty = useMemo(
    () =>
      properties.find((p) => String(p.id) === String(page.propertyId)) || null,
    [properties, page.propertyId]
  )

  const hasActiveFilters =
    filters.location.trim() !== '' ||
    filters.listingType !== 'All' ||
    filters.type !== 'All' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== ''

  const resetFilters = () => setFilters(EMPTY_FILTERS)

  // ------------------------------------------------------------------------
  // 7. Render
  // ------------------------------------------------------------------------
  return (
    <div className="app">
      <Navbar
        onLogoClick={goHome}
        onBrowseClick={() => browse({})}
        onCompareClick={openCompare}
        onHistoryClick={openHistory}
        compareCount={compareIds.length}
        onRemoveCompare={clearCompare}
      />

      {/* Banner shown when we are displaying fallback sample data */}
      {dataSource === 'sample' && dataMessage && (
        <div className="data-banner">
          <div className="container data-banner-inner">
            <span className="data-dot" />
            <span>{dataMessage}</span>
          </div>
        </div>
      )}

      <main className="app-content">
        {/* HOME */}
        {page.name === 'home' && (
          <Home
            properties={properties}
            loading={loading}
            onSearch={searchFromHome}
            onBrowse={browse}
            onViewDetails={openDetails}
            onToggleCompare={toggleCompare}
            compareIds={compareIds}
          />
        )}

        {/* LISTINGS */}
        {page.name === 'listings' && (
          <div className="container listings">
            <div className="listings-head">
              <h1 className="section-title">Properties</h1>
              <p className="muted" style={{ margin: 0 }}>
                {loading
                  ? 'Loading listings…'
                  : `${visibleProperties.length} of ${properties.length} listings match your filters.`}
              </p>
            </div>

            <SearchFilter
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
              hasActiveFilters={hasActiveFilters}
              resultCount={visibleProperties.length}
            />

            <PropertyList
              properties={visibleProperties}
              loading={loading}
              compareIds={compareIds}
              onViewDetails={openDetails}
              onToggleCompare={toggleCompare}
              onClearFilters={resetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        )}

        {/* DETAILS */}
        {page.name === 'details' && (
          <PropertyDetails
            property={detailProperty}
            onBack={backToListings}
            onToggleCompare={toggleCompare}
            isCompared={compareIds.some((id) => String(id) === String(page.propertyId))}
            compareDisabled={compareIds.length >= MAX_COMPARE}
          />
        )}

        {/* COMPARE */}
        {page.name === 'compare' && (
          <CompareProperties
            properties={compareProperties}
            onRemove={removeFromCompare}
            onBack={backToListings}
            onBrowse={browse}
          />
        )}

        {/* SEARCH HISTORY */}
        {page.name === 'history' && <SearchHistory />}
      </main>

      <CompareBar
        properties={compareProperties}
        onOpenCompare={openCompare}
        onRemove={removeFromCompare}
        onClear={clearCompare}
      />

      {toast && <div className="toast">{toast}</div>}

      <Footer
        onLogoClick={goHome}
        onBrowseClick={browse}
        onCompareClick={openCompare}
        onHistoryClick={openHistory}
      />
    </div>
  )
}

export default App