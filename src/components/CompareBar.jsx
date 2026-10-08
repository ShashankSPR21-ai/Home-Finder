// ============================================================================
// CompareBar.jsx
//
// The floating bar that appears at the bottom of the screen once the user has
// picked at least one property with the "Compare" checkbox.
// It keeps the selection visible and offers the jump to the Compare page.
// ============================================================================

import { IconClose, IconCompare } from './Icons'

function CompareBar({ properties, onOpenCompare, onRemove, onClear }) {
  if (properties.length === 0) return null

  return (
    <div className="compare-bar" role="region" aria-label="Selected properties to compare">
      <div className="container compare-bar-inner">
        {/* --- Selected property chips --- */}
        <div className="compare-chips">
          <span className="compare-bar-label">
            <IconCompare size={16} />
            <span className="compare-bar-text">Compare</span>
          </span>

          {properties.map((property) => (
            <span className="compare-chip" key={property.id}>
              <span className="compare-chip-title">{property.title}</span>
              <button
                type="button"
                className="compare-chip-x"
                onClick={() => onRemove(property.id)}
                aria-label={`Remove ${property.title} from comparison`}
              >
                <IconClose size={12} />
              </button>
            </span>
          ))}

          {properties.length < 3 && (
            <span className="compare-hint muted">
              Select {3 - properties.length} more to reach 3
            </span>
          )}
        </div>

        {/* --- Actions --- */}
        <div className="compare-bar-actions">
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClear}>
            Clear
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onOpenCompare}
            disabled={properties.length < 2}
            title={
              properties.length < 2
                ? 'Pick at least 2 properties to compare'
                : 'Compare the selected properties'
            }
          >
            Compare {properties.length}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompareBar
