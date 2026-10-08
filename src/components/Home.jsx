// ============================================================================
// Home.jsx - the landing page
//
// Sections, top to bottom:
//   1. Hero: headline, search bar and quick Buy / Rent buttons
//   2. Stats strip (counts taken from the loaded data)
//   3. Featured properties (first 6)
//   4. "How it works" - three short steps
// ============================================================================

import { useState } from 'react'
import PropertyCard from './PropertyCard'
import { IconSearch, IconHome, IconCompare, IconCheck } from './Icons'

function Home({
  properties,
  loading,
  onSearch,
  onBrowse,
  onViewDetails,
  onToggleCompare,
  compareIds,
}) {
  // The hero search box keeps its own small local state until submitted.
  const [term, setTerm] = useState('')

  const forSale = properties.filter((p) => p.listing_type === 'Buy').length
  const forRent = properties.filter((p) => p.listing_type === 'Rent').length
  const featured = properties.slice(0, 6)

  const submitSearch = (event) => {
    event.preventDefault()
    onSearch(term) // App will switch to the listings page with this location
  }

  return (
    <div className="home">
      {/* ---------------------------------------------------------------
          1. HERO
         --------------------------------------------------------------- */}
      <section className="hero">
        <div className="container hero-inner">
          <span className="hero-eyebrow">
            <IconHome size={15} />
            Buy • Rent • Compare
          </span>

          <h1 className="hero-title">Find a place you'll love to call home</h1>
          <p className="hero-subtitle">
            Search verified listings, filter by exactly what you need, and compare
            your favourites side by side — all in one simple place.
          </p>

          {/* Search bar */}
          <form className="hero-search" onSubmit={submitSearch} role="search">
            <span className="hero-search-icon">
              <IconSearch size={19} />
            </span>
            <input
              className="hero-search-input"
              type="text"
              placeholder="Search by location or keyword — try “Bengaluru” or “villa”"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              aria-label="Search properties by location or keyword"
            />
            <button type="submit" className="btn btn-primary hero-search-btn">
              Search
            </button>
          </form>

          {/* Quick actions */}
          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onBrowse({ listingType: 'Buy' })}
            >
              Buy a home
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onBrowse({ listingType: 'Rent' })}
            >
              Rent a home
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onBrowse({ listingType: 'All' })}
            >
              Browse all properties →
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          2. STATS
         --------------------------------------------------------------- */}
      <section className="container stats">
        <div className="stat">
          <span className="stat-number">{loading ? '—' : properties.length}</span>
          <span className="stat-label">Total listings</span>
        </div>
        <div className="stat">
          <span className="stat-number">{loading ? '—' : forSale}</span>
          <span className="stat-label">For sale</span>
        </div>
        <div className="stat">
          <span className="stat-number">{loading ? '—' : forRent}</span>
          <span className="stat-label">For rent</span>
        </div>
        <div className="stat">
          <span className="stat-number">{loading ? '—' : properties.length}</span>
          <span className="stat-label">Ready to compare</span>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          3. FEATURED PROPERTIES
         --------------------------------------------------------------- */}
      <section className="container home-section">
        <div className="section-head">
          <div>
            <h2 className="section-title">Featured properties</h2>
            <p className="muted" style={{ margin: 0 }}>
              A first look at what is available right now.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => onBrowse({})}
          >
            View all
          </button>
        </div>

        <div className="grid">
          {loading
            ? // While the data loads, show six grey placeholder cards
              [1, 2, 3, 4, 5, 6].map((n) => (
                <div className="card skeleton" key={n} aria-hidden="true">
                  <div className="skeleton-media" />
                  <div className="card-body">
                    <div className="skeleton-line w-70" />
                    <div className="skeleton-line w-45" />
                    <div className="skeleton-line w-90" />
                  </div>
                </div>
              ))
            : featured.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={onViewDetails}
                  onToggleCompare={onToggleCompare}
                  isCompared={compareIds.includes(property.id)}
                  compareDisabled={compareIds.length >= 3}
                />
              ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------
          4. HOW IT WORKS
         --------------------------------------------------------------- */}
      <section className="container home-section">
        <div className="section-head">
          <h2 className="section-title">How HomeFinder works</h2>
        </div>

        <div className="steps">
          <div className="step">
            <span className="step-icon"><IconSearch size={22} /></span>
            <h3>1. Search &amp; filter</h3>
            <p className="muted">
              Narrow listings by location, Buy or Rent, property type and price range.
            </p>
          </div>
          <div className="step">
            <span className="step-icon"><IconHome size={22} /></span>
            <h3>2. View the details</h3>
            <p className="muted">
              Open any property for the full description, size and an enquiry option.
            </p>
          </div>
          <div className="step">
            <span className="step-icon"><IconCompare size={22} /></span>
            <h3>3. Compare &amp; decide</h3>
            <p className="muted">
              Tick 2 to 3 favourites and see price, size and rooms side by side.
            </p>
          </div>
        </div>

        <div className="home-cta">
          <div className="home-cta-text">
            <IconCheck size={18} />
            <span>Ready to start? Pick a favourite and add it to your comparison.</span>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => onBrowse({})}>
            Browse properties
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
