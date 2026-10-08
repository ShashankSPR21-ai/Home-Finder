// ============================================================================
// PropertyCard.jsx
//
// One property shown as a card in the grid.
// It is a "dumb" component: it only displays what it is given and calls back
// to the parent through props (onViewDetails / onToggleCompare).
// ============================================================================

import { formatPrice, formatCount, formatArea, isRent, FALLBACK_IMAGE } from '../lib/format'
import { IconPin, IconBed, IconBath, IconArea, IconCheck } from './Icons'

function PropertyCard({ property, onViewDetails, onToggleCompare, isCompared, compareDisabled }) {
  const rent = isRent(property)

  return (
    <article className="card">
      {/* ---- Image + overlay badges ---- */}
      <div className="card-media">
        <img
          src={property.image_url || FALLBACK_IMAGE}
          alt={property.title}
          loading="lazy"
          onError={(event) => {
            // If the remote image fails, swap in a neutral placeholder once.
            event.currentTarget.onerror = null
            event.currentTarget.src = FALLBACK_IMAGE
          }}
        />

        <span className={`badge ${rent ? 'badge-rent' : 'badge-buy'} card-badge`}>
          {rent ? 'For Rent' : 'For Sale'}
        </span>

        {/* Compare toggle sits on the image so it is easy to reach */}
        <button
          type="button"
          className={`compare-toggle ${isCompared ? 'is-on' : ''}`}
          onClick={() => onToggleCompare(property.id)}
          disabled={compareDisabled && !isCompared}
          title={
            compareDisabled && !isCompared
              ? 'You can compare up to 3 properties'
              : isCompared
                ? 'Remove from compare'
                : 'Add to compare'
          }
          aria-pressed={isCompared}
        >
          <span className="compare-box">{isCompared && <IconCheck size={13} />}</span>
          <span className="compare-label">Compare</span>
        </button>
      </div>

      {/* ---- Text content ---- */}
      <div className="card-body">
        <h3 className="card-title">{property.title}</h3>

        <p className="card-location">
          <IconPin size={15} />
          <span>{property.location}</span>
        </p>

        {/* Bedrooms / bathrooms / size */}
        <ul className="card-meta">
          <li>
            <IconBed size={16} />
            <span>{formatCount(property.bedrooms)} Beds</span>
          </li>
          <li>
            <IconBath size={16} />
            <span>{formatCount(property.bathrooms)} Baths</span>
          </li>
          <li>
            <IconArea size={16} />
            <span>{formatArea(property.area)}</span>
          </li>
        </ul>

        <span className="badge card-type">{property.type}</span>
      </div>

      {/* ---- Price + action ---- */}
      <div className="card-footer">
        <div className="card-price">
          {formatPrice(property.price, { perMonth: rent })}
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => onViewDetails(property)}
        >
          View Details
        </button>
      </div>
    </article>
  )
}

export default PropertyCard
