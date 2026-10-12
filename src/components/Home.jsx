// ============================================================================
// Home.jsx - the landing page
//
// Sections, top to bottom:
//   1. Hero: headline, search bar and quick Buy / Rent / Home buttons
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

  const statCardStyle = {
    background: 'var(--card-bg, #ffffff)',
    padding: '1.5rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
    border: '1px solid var(--border-color, #e2e8f0)',
    textAlign: 'center',
    transition: 'transform 0.2s ease',
  }

  return (
    <div className="home" style={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* ---------------------------------------------------------------
          1. HERO
         --------------------------------------------------------------- */}
      <section className="hero" style={{ background: 'linear-gradient(135deg, var(--bg-secondary, #f8fafc) 0%, var(--bg-primary, #ffffff) 100%)', padding: '4rem 1.5rem', borderBottom: '1px solid var(--border-color, #e2e8f0)' }}>
        <div className="container hero-inner" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span className="hero-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'var(--primary-light, #eff6ff)', color: 'var(--primary, #2563eb)', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1.25rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
            <IconHome size={15} />
            Buy • Rent • Compare
          </span>

          <h1 className="hero-title" style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', fontWeight: '800', lineHeight: '1.2', letterSpacing: '-0.025em', color: 'var(--text-main, #0f172a)', marginBottom: '1.25rem' }}>
            Find a place you'll love to call home
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '1.125rem', lineHeight: '1.6', color: 'var(--text-muted, #475569)', marginBottom: '2.5rem', maxWidth: '640px', marginInline: 'auto' }}>
            Search verified listings, filter by exactly what you need, and compare
            your favourites side by side — all in one simple place.
          </p>

          {/* Search bar */}
          <form className="hero-search" onSubmit={submitSearch} role="search" style={{ display: 'flex', alignItems: 'center', background: 'var(--card-bg, #ffffff)', padding: '0.375rem', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)', border: '1px solid var(--border-color, #cbd5e1)', marginBottom: '2rem', transition: 'all 0.2s ease' }}>
            <span className="hero-search-icon" style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem', color: 'var(--text-muted, #64748b)' }}>
              <IconSearch size={19} />
            </span>
            <input
              className="hero-search-input"
              type="text"
              placeholder="Search by location or keyword — try “Bengaluru” or “villa”"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              aria-label="Search properties by location or keyword"
              style={{ flex: 1, border: 'none', background: 'transparent', padding: '0.75rem 1rem', fontSize: '1rem', color: 'var(--text-main, #0f172a)', outline: 'none' }}
            />
            <button 
              type="submit" 
              className="btn btn-primary hero-search-btn"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem 1.75rem', background: 'var(--primary, #2563eb)', color: '#ffffff', fontWeight: '600', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Search
            </button>
          </form>

          {/* Quick actions */}
          <div className="hero-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center', alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onBrowse({ listingType: 'Buy' })}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.625rem 1.25rem', background: 'var(--card-bg, #ffffff)', color: 'var(--text-main, #1e293b)', fontWeight: '600', borderRadius: '0.75rem', border: '1px solid var(--border-color, #cbd5e1)', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary, #2563eb)'; e.currentTarget.style.color = 'var(--primary, #2563eb)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color, #cbd5e1)'; e.currentTarget.style.color = 'var(--text-main, #1e293b)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Buy a home
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onBrowse({ listingType: 'Rent' })}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.625rem 1.25rem', background: 'var(--card-bg, #ffffff)', color: 'var(--text-main, #1e293b)', fontWeight: '600', borderRadius: '0.75rem', border: '1px solid var(--border-color, #cbd5e1)', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary, #2563eb)'; e.currentTarget.style.color = 'var(--primary, #2563eb)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color, #cbd5e1)'; e.currentTarget.style.color = 'var(--text-main, #1e293b)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Rent a home
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onBrowse({})}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: 'var(--card-bg, #ffffff)', color: 'var(--text-main, #1e293b)', fontWeight: '600', borderRadius: '0.75rem', border: '1px solid var(--border-color, #cbd5e1)', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary, #2563eb)'; e.currentTarget.style.color = 'var(--primary, #2563eb)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color, #cbd5e1)'; e.currentTarget.style.color = 'var(--text-main, #1e293b)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <IconHome size={16} />
              Home
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onBrowse({ listingType: 'All' })}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.625rem 1.25rem', background: 'transparent', color: 'var(--primary, #2563eb)', fontWeight: '600', borderRadius: '0.75rem', border: '1px solid transparent', cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary-light, #eff6ff)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Browse all properties →
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          2. STATS
         --------------------------------------------------------------- */}
      <section className="container stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', margin: '-2rem auto 3rem', position: 'relative', zIndex: '10', padding: '0 1.5rem' }}>
        <div className="stat" style={statCardStyle} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
          <span className="stat-number" style={{ display: 'block', fontSize: '2rem', fontWeight: '800', color: 'var(--primary, #2563eb)', marginBottom: '0.25rem' }}>{loading ? '—' : properties.length}</span>
          <span className="stat-label" style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted, #64748b)' }}>Total listings</span>
        </div>
        <div className="stat" style={statCardStyle} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
          <span className="stat-number" style={{ display: 'block', fontSize: '2rem', fontWeight: '800', color: 'var(--primary, #2563eb)', marginBottom: '0.25rem' }}>{loading ? '—' : forSale}</span>
          <span className="stat-label" style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted, #64748b)' }}>For sale</span>
        </div>
        <div className="stat" style={statCardStyle} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
          <span className="stat-number" style={{ display: 'block', fontSize: '2rem', fontWeight: '800', color: 'var(--primary, #2563eb)', marginBottom: '0.25rem' }}>{loading ? '—' : forRent}</span>
          <span className="stat-label" style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted, #64748b)' }}>For rent</span>
        </div>
        <div className="stat" style={statCardStyle} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
          <span className="stat-number" style={{ display: 'block', fontSize: '2rem', fontWeight: '800', color: 'var(--primary, #2563eb)', marginBottom: '0.25rem' }}>{loading ? '—' : properties.length}</span>
          <span className="stat-label" style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted, #64748b)' }}>Ready to compare</span>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          3. FEATURED PROPERTIES
         --------------------------------------------------------------- */}
      <section className="container home-section" style={{ padding: '2rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 className="section-title" style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main, #0f172a)', marginBottom: '0.375rem' }}>Featured properties</h2>
            <p className="muted" style={{ margin: 0, color: 'var(--text-muted, #64748b)', fontSize: '1rem' }}>
              A first look at what is available right now.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => onBrowse({})}
            style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', background: 'var(--card-bg, #ffffff)', color: 'var(--text-main, #1e293b)', fontWeight: '600', borderRadius: '0.50rem', border: '1px solid var(--border-color, #cbd5e1)', cursor: 'pointer', transition: 'all 0.2s ease', fontSize: '0.875rem' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary, #2563eb)'; e.currentTarget.style.color = 'var(--primary, #2563eb)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color, #cbd5e1)'; e.currentTarget.style.color = 'var(--text-main, #1e293b)'; }}
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
      <section className="container home-section" style={{ padding: '3rem 1.5rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-head" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main, #0f172a)' }}>How HomeFinder works</h2>
        </div>

        <div className="steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div className="step" style={{ background: 'var(--card-bg, #ffffff)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color, #e2e8f0)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', textAlign: 'center', transition: 'transform 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
            <span className="step-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '3.5rem', height: '3.5rem', background: 'var(--primary-light, #eff6ff)', color: 'var(--primary, #2563eb)', borderRadius: '1rem', marginBottom: '1.25rem' }}><IconSearch size={22} /></span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-main, #0f172a)', marginBottom: '0.75rem' }}>1. Search &amp; filter</h3>
            <p className="muted" style={{ color: 'var(--text-muted, #64748b)', lineHeight: '1.5', margin: 0 }}>
              Narrow listings by location, Buy or Rent, property type and price range.
            </p>
          </div>
          <div className="step" style={{ background: 'var(--card-bg, #ffffff)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color, #e2e8f0)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', textAlign: 'center', transition: 'transform 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
            <span className="step-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '3.5rem', height: '3.5rem', background: 'var(--primary-light, #eff6ff)', color: 'var(--primary, #2563eb)', borderRadius: '1rem', marginBottom: '1.25rem' }}><IconHome size={22} /></span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-main, #0f172a)', marginBottom: '0.75rem' }}>2. View the details</h3>
            <p className="muted" style={{ color: 'var(--text-muted, #64748b)', lineHeight: '1.5', margin: 0 }}>
              Open any property for the full description, size and an enquiry option.
            </p>
          </div>
          <div className="step" style={{ background: 'var(--card-bg, #ffffff)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color, #e2e8f0)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', textAlign: 'center', transition: 'transform 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
            <span className="step-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '3.5rem', height: '3.5rem', background: 'var(--primary-light, #eff6ff)', color: 'var(--primary, #2563eb)', borderRadius: '1rem', marginBottom: '1.25rem' }}><IconCompare size={22} /></span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-main, #0f172a)', marginBottom: '0.75rem' }}>3. Compare &amp; decide</h3>
            <p className="muted" style={{ color: 'var(--text-muted, #64748b)', lineHeight: '1.5', margin: 0 }}>
              Tick 2 to 3 favourites and see price, size and rooms side by side.
            </p>
          </div>
        </div>

        <div className="home-cta" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, var(--primary-light, #eff6ff) 0%, var(--bg-secondary, #f8fafc) 100%)', padding: '2.5rem', borderRadius: '1.25rem', border: '1px solid var(--border-color, #cbd5e1)', gap: '1.5rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
          <div className="home-cta-text" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '2.5rem', height: '2.5rem', background: 'var(--primary, #2563eb)', color: '#ffffff', borderRadius: '50%', flexShrink: 0 }}>
              <IconCheck size={18} />
            </span>
            <span style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-main, #1e293b)' }}>Ready to start? Pick a favourite and add it to your comparison.</span>
          </div>
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={() => onBrowse({})}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.875rem 2rem', background: 'var(--primary, #2563eb)', color: '#ffffff', fontWeight: '600', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Browse properties
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home