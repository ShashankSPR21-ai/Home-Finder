// ============================================================================
// PropertyDetails.jsx
//
// The full page for ONE property: large image, every field and an Enquire
// button that opens a small contact modal (no backend, purely a demo).
// ============================================================================

import { useState } from 'react'
import { formatPrice, formatCount, formatArea, isRent, FALLBACK_IMAGE } from '../lib/format'
import {
  IconArrowLeft,
  IconPin,
  IconBed,
  IconBath,
  IconArea,
  IconHome,
  IconCompare,
  IconCheck,
  IconMail,
  IconPhone,
  IconClose,
} from './Icons'

function PropertyDetails({
  property,
  onBack,
  onToggleCompare,
  isCompared,
  compareDisabled,
}) {
  // Local state just for the enquiry modal.
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [sent, setSent] = useState(false)

  // Defensive guard: if the property is missing, show a friendly message
  // instead of crashing.
  if (!property) {
    return (
      <div className="container details-empty">
        <h2>Property not found</h2>
        <p className="muted">That listing is no longer available.</p>
        <button type="button" className="btn btn-primary" onClick={onBack}>
          Back to listings
        </button>
      </div>
    )
  }

  const rent = isRent(property)

  const closeEnquiry = () => {
    setEnquiryOpen(false)
    setSent(false)
  }

  return (
    <div className="container details">
      {/* Back link */}
      <button type="button" className="btn btn-ghost btn-sm back-link" onClick={onBack}>
        <IconArrowLeft size={16} />
        Back to listings
      </button>

      {/* Large image with the Buy/Rent badge */}
      <div className="details-media">
        <img
          src={property.image_url || FALLBACK_IMAGE}
          alt={property.title}
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = FALLBACK_IMAGE
          }}
        />
        <span className={`badge ${rent ? 'badge-rent' : 'badge-buy'} details-badge`}>
          {rent ? 'For Rent' : 'For Sale'}
        </span>
      </div>

      <div className="details-layout">
        {/* -------------------------------------------------------------
            Left column: all the information
           ------------------------------------------------------------- */}
        <div className="details-main">
          <h1 className="details-title">{property.title}</h1>

          <p className="details-location">
            <IconPin size={17} />
            <span>{property.location}</span>
          </p>

          <div className="details-price">
            {formatPrice(property.price, { perMonth: rent })}
          </div>

          {/* Key specs */}
          <div className="specs">
            <div className="spec">
              <IconBed size={20} />
              <span className="spec-value">{formatCount(property.bedrooms)}</span>
              <span className="spec-label">Bedrooms</span>
            </div>
            <div className="spec">
              <IconBath size={20} />
              <span className="spec-value">{formatCount(property.bathrooms)}</span>
              <span className="spec-label">Bathrooms</span>
            </div>
            <div className="spec">
              <IconArea size={20} />
              <span className="spec-value">{formatArea(property.area)}</span>
              <span className="spec-label">Size</span>
            </div>
            <div className="spec">
              <IconHome size={20} />
              <span className="spec-value">{property.type}</span>
              <span className="spec-label">Type</span>
            </div>
          </div>

          {/* Description */}
          <div className="details-block">
            <h2 className="details-block-title">Description</h2>
            <p className="details-description">
              {property.description || 'No description has been added for this listing yet.'}
            </p>
          </div>
        </div>

        {/* -------------------------------------------------------------
            Right column: sticky action card
           ------------------------------------------------------------- */}
        <aside className="details-side">
          <div className="side-card">
            <h3 className="side-card-title">Interested in this property?</h3>
            <p className="muted side-card-text">
              Send a quick enquiry and the agent will get back to you.
            </p>

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => setEnquiryOpen(true)}
            >
              <IconMail size={17} />
              Enquire now
            </button>

            {/* Add / remove from compare */}
            <button
              type="button"
              className={`btn btn-block ${isCompared ? 'btn-outline is-selected' : 'btn-outline'}`}
              onClick={() => onToggleCompare(property.id)}
              disabled={compareDisabled && !isCompared}
            >
              {isCompared ? <IconCheck size={17} /> : <IconCompare size={17} />}
              {isCompared ? 'In comparison' : 'Add to compare'}
            </button>

            <div className="side-agent">
              <span className="side-agent-avatar">{property.title.charAt(0)}</span>
              <div>
                <div className="side-agent-name">HomeFinder Agent</div>
                <div className="muted side-agent-phone">
                  <IconPhone size={13} /> +91 98765 43210
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ---------------------------------------------------------------
          Enquiry modal - local state only, nothing is stored.
         --------------------------------------------------------------- */}
      {enquiryOpen && (
        <div className="modal-backdrop" onClick={closeEnquiry}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Enquire about this property"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-head">
              <h3 className="modal-title">Enquire about {property.title}</h3>
              <button
                type="button"
                className="modal-close"
                onClick={closeEnquiry}
                aria-label="Close enquiry form"
              >
                <IconClose size={18} />
              </button>
            </div>

            {sent ? (
              // Success message after submitting
              <div className="modal-success">
                <span className="modal-success-icon">
                  <IconCheck size={26} />
                </span>
                <h4>Thanks! Your enquiry has been noted.</h4>
                <p className="muted">
                  This is a demo form — no message is actually sent.
                </p>
                <button type="button" className="btn btn-primary" onClick={closeEnquiry}>
                  Close
                </button>
              </div>
            ) : (
              <form
                className="modal-form"
                onSubmit={(event) => {
                  event.preventDefault() // stop the page reload
                  setSent(true)
                }}
              >
                <div className="field">
                  <label htmlFor="enq-name">Your name</label>
                  <input id="enq-name" className="input" required placeholder="Full name" />
                </div>
                <div className="field">
                  <label htmlFor="enq-email">Email</label>
                  <input
                    id="enq-email"
                    className="input"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div className="field">
                  <label htmlFor="enq-message">Message</label>
                  <textarea
                    id="enq-message"
                    className="input"
                    rows="3"
                    defaultValue={`I am interested in ${property.title} at ${property.location}. Please share more details.`}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Send enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertyDetails
