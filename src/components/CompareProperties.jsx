// ============================================================================
// CompareProperties.jsx
//
// Side-by-side comparison of the 2 or 3 properties the user selected.
// Rendered as a table so the rows line up neatly on every screen size.
//
// The only "clever" part is highlighting the lowest price, which is worked
// out with a simple Math.min over the selected properties.
// ============================================================================

import { formatPrice, formatCount, formatArea, isRent, FALLBACK_IMAGE } from '../lib/format'
import { IconArrowLeft, IconClose, IconCheck, IconCompare } from './Icons'

function CompareProperties({ properties, onRemove, onBack, onBrowse }) {
  // --- Nothing (or one) selected yet -----------------------------------
  if (properties.length < 2) {
    return (
      <div className="container compare-page">
        <button type="button" className="btn btn-ghost btn-sm back-link" onClick={onBack}>
          <IconArrowLeft size={16} />
          Back to listings
        </button>

        <div className="empty-state">
          <span className="empty-icon">
            <IconCompare size={30} />
          </span>
          <h3>Pick at least 2 properties to compare</h3>
          <p className="muted">
            Use the “Compare” checkbox on any property card, then come back here.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => onBrowse({})}>
            Browse properties
          </button>
        </div>
      </div>
    )
  }

  // --- Work out which column has the lowest price -----------------------
  const prices = properties.map((p) => Number(p.price))
  const lowestPrice = Math.min(...prices)

  return (
    <div className="container compare-page">
      <button type="button" className="btn btn-ghost btn-sm back-link" onClick={onBack}>
        <IconArrowLeft size={16} />
        Back to listings
      </button>

      <div className="compare-head">
        <h1 className="section-title">Compare properties</h1>
        <p className="muted" style={{ margin: 0 }}>
          Comparing {properties.length} of a maximum 3 properties.
        </p>
      </div>

      {/* A horizontally scrollable wrapper keeps the table usable on phones */}
      <div className="compare-scroll">
        <table className="compare-table">
          <tbody>
            {/* --- Images + title + remove button --- */}
            <tr className="compare-images-row">
              <th scope="row" className="compare-row-head"></th>
              {properties.map((property) => (
                <td key={property.id} className="compare-image-cell">
                  <button
                    type="button"
                    className="compare-remove"
                    onClick={() => onRemove(property.id)}
                    aria-label={`Remove ${property.title} from comparison`}
                  >
                    <IconClose size={14} />
                  </button>
                  <img
                    src={property.image_url || FALLBACK_IMAGE}
                    alt={property.title}
                    onError={(event) => {
                      event.currentTarget.onerror = null
                      event.currentTarget.src = FALLBACK_IMAGE
                    }}
                  />
                  <div className="compare-card-title">{property.title}</div>
                </td>
              ))}
            </tr>

            {/* --- Price (lowest one is highlighted) --- */}
            <tr>
              <th scope="row" className="compare-row-head">Price</th>
              {properties.map((property) => {
                const isLowest = Number(property.price) === lowestPrice
                return (
                  <td key={property.id} className="compare-cell">
                    <span className={`compare-price ${isLowest ? 'is-lowest' : ''}`}>
                      {formatPrice(property.price, { perMonth: isRent(property) })}
                    </span>
                    {isLowest && <span className="compare-tag">Lowest price</span>}
                  </td>
                )
              })}
            </tr>

            {/* --- Location --- */}
            <tr>
              <th scope="row" className="compare-row-head">Location</th>
              {properties.map((property) => (
                <td key={property.id} className="compare-cell">{property.location}</td>
              ))}
            </tr>

            {/* --- Listing type --- */}
            <tr>
              <th scope="row" className="compare-row-head">Listing</th>
              {properties.map((property) => (
                <td key={property.id} className="compare-cell">
                  <span className={`badge ${isRent(property) ? 'badge-rent' : 'badge-buy'}`}>
                    {isRent(property) ? 'For Rent' : 'For Sale'}
                  </span>
                </td>
              ))}
            </tr>

            {/* --- Property type --- */}
            <tr>
              <th scope="row" className="compare-row-head">Type</th>
              {properties.map((property) => (
                <td key={property.id} className="compare-cell">{property.type}</td>
              ))}
            </tr>

            {/* --- Bedrooms --- */}
            <tr>
              <th scope="row" className="compare-row-head">Bedrooms</th>
              {properties.map((property) => (
                <td key={property.id} className="compare-cell">
                  {formatCount(property.bedrooms)}
                </td>
              ))}
            </tr>

            {/* --- Bathrooms --- */}
            <tr>
              <th scope="row" className="compare-row-head">Bathrooms</th>
              {properties.map((property) => (
                <td key={property.id} className="compare-cell">
                  {formatCount(property.bathrooms)}
                </td>
              ))}
            </tr>

            {/* --- Size --- */}
            <tr>
              <th scope="row" className="compare-row-head">Size</th>
              {properties.map((property) => (
                <td key={property.id} className="compare-cell">{formatArea(property.area)}</td>
              ))}
            </tr>

            {/* --- Description snippet --- */}
            <tr>
              <th scope="row" className="compare-row-head">Description</th>
              {properties.map((property) => (
                <td key={property.id} className="compare-cell compare-desc">
                  {property.description || '—'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="compare-note muted">
        <IconCheck size={14} /> Tip: the lowest price in your selection is highlighted
        automatically.
      </p>
    </div>
  )
}

export default CompareProperties
