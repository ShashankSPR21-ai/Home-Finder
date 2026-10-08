// ============================================================================
// PropertyList.jsx
//
// Renders the responsive grid of PropertyCard components, plus the three
// states we must handle: loading, empty and normal.
// ============================================================================

import PropertyCard from './PropertyCard'
import { IconSearch } from './Icons'

function PropertyList({
  properties,
  loading,
  compareIds,
  onViewDetails,
  onToggleCompare,
  onClearFilters,
  hasActiveFilters,
}) {
  // --- 1. Loading: show simple grey placeholder cards -------------------
  if (loading) {
    return (
      <div className="grid">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div className="card skeleton" key={n} aria-hidden="true">
            <div className="skeleton-media" />
            <div className="card-body">
              <div className="skeleton-line w-70" />
              <div className="skeleton-line w-45" />
              <div className="skeleton-line w-90" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // --- 2. Nothing matched the filters -----------------------------------
  if (properties.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">
          <IconSearch size={30} />
        </span>
        <h3>No properties found</h3>
        <p className="muted">
          Try a different location, widen the price range, or reset the filters.
        </p>
        {hasActiveFilters && (
          <button type="button" className="btn btn-outline" onClick={onClearFilters}>
            Reset filters
          </button>
        )}
      </div>
    )
  }

  // --- 3. Normal grid ----------------------------------------------------
  return (
    <div className="grid">
      {properties.map((property) => (
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
  )
}

export default PropertyList
