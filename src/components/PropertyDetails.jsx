import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function PropertyDetails({
  property,
  onBack,
  onToggleCompare,
  isCompared,
  compareDisabled,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (!property) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Property not found</h2>
        <button onClick={onBack} style={{ marginTop: '15px' }}>
          Back to listings
        </button>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')

    if (supabase) {
      const { error } = await supabase.from('enquiries').insert([
        {
          property_id: String(property.id),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
      ])

      if (error) {
        console.error('Error saving enquiry:', error.message)
        setErrorMsg('Failed to send enquiry. Please try again.')
        setSubmitting(false)
        return
      }
    }

    setSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="container property-details-page" style={{ padding: '30px 20px' }}>
      <button onClick={onBack} style={{ marginBottom: '20px', cursor: 'pointer' }}>
        ← Back to listings
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Left Column: Details */}
        <div>
          <img
            src={property.image_url || property.image}
            alt={property.title}
            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', maxHeight: '400px' }}
          />
          <h1 style={{ marginTop: '15px', marginBottom: '5px' }}>{property.title}</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>{property.location}</p>
          <h2 style={{ color: '#2563eb', margin: '15px 0' }}>
            ₹{property.price?.toLocaleString()}
            {property.listing_type === 'Rent' ? ' / month' : ''}
          </h2>

          <div style={{ display: 'flex', gap: '20px', margin: '20px 0', background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
            <div><strong>Bedrooms:</strong> {property.bedrooms}</div>
            <div><strong>Bathrooms:</strong> {property.bathrooms}</div>
            <div><strong>Area:</strong> {property.sqft} sq.ft</div>
          </div>

          <p>{property.description}</p>

          <button
            onClick={() => onToggleCompare(property.id)}
            disabled={compareDisabled && !isCompared}
            style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
          >
            {isCompared ? 'Remove from Compare' : 'Add to Compare'}
          </button>
        </div>

        {/* Right Column: Enquiry Form */}
        <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '8px', height: 'fit-content' }}>
          <h3>Enquire About This Property</h3>
          
          {submitted ? (
            <div style={{ color: '#16a34a', padding: '15px 0' }}>
              <p><strong>Thank you!</strong> Your enquiry has been submitted successfully.</p>
              <button onClick={() => setSubmitted(false)} style={{ marginTop: '10px' }}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              {errorMsg && <p style={{ color: '#dc2626', margin: 0 }}>{errorMsg}</p>}

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="I am interested in this property..."
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '10px',
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                }}
              >
                {submitting ? 'Sending...' : 'Submit Enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}