// ============================================================================
// SearchFilter.jsx
//
// The filter bar: location text, Buy/Rent, property type and a price range.
//
// It does NOT filter anything itself. Whenever a field changes it calls
// onChange({ ...filters, [field]: value }) and the parent (App.jsx) updates
// the state. App then passes the matching properties down to PropertyList.
// This "state lives in one place" pattern is called lifting state up.
// ============================================================================

import { PROPERTY_TYPES } from '../lib/propertyApi'

const LISTING_TYPES = ['All', 'Buy', 'Rent']

function SearchFilter({ filters, onChange, onReset, hasActiveFilters, resultCount }) {
  // Helper: update one field while keeping the others untouched.
  const update = (field) => (event) => {
    onChange({ ...filters, [field]: event.target.value })
  }

  return (
    <section className="filter-panel" aria-label="Search and filter properties">
      {/* Row 1: location + listing type */}
      <div className="filter-row">
        <div className="field field-grow">
          <label htmlFor="filter-location">Location or keyword</label>
          <input
            id="filter-location"
            className="input"
            type="text"
            placeholder="e.g. Mumbai, Bengaluru, villa..."
            value={filters.location}
            onChange={update('location')}
          />
        </div>

        <div className="field">
          <label htmlFor="filter-listing">Buy or Rent</label>
          <select
            id="filter-listing"
            className="select"
            value={filters.listingType}
            onChange={update('listingType')}
          >
            {LISTING_TYPES.map((option) => (
              <option key={option} value={option}>
                {option === 'All' ? 'All listings' : `For ${option}`}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="filter-type">Property type</label>
          <select
            id="filter-type"
            className="select"
            value={filters.type}
            onChange={update('type')}
          >
            <option value="All">All types</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: price range + reset */}
      <div className="filter-row">
        <div className="field">
          <label htmlFor="filter-min">Minimum price (₹)</label>
          <input
            id="filter-min"
            className="input"
            type="number"
            min="0"
            placeholder="No minimum"
            value={filters.minPrice}
            onChange={update('minPrice')}
          />
        </div>

        <div className="field">
          <label htmlFor="filter-max">Maximum price (₹)</label>
          <input
            id="filter-max"
            className="input"
            type="number"
            min="0"
            placeholder="No maximum"
            value={filters.maxPrice}
            onChange={update('maxPrice')}
          />
        </div>

        <div className="filter-actions">
          <span className="filter-count muted">
            {resultCount} {resultCount === 1 ? 'property' : 'properties'}
          </span>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onReset}
            disabled={!hasActiveFilters}
          >
            Reset filters
          </button>
        </div>
      </div>
    </section>
  )
}

export default SearchFilter
