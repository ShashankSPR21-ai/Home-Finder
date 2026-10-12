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
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center', animation: 'fadeIn 0.4s ease-out' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main, #0f172a)', marginBottom: '1rem' }}>Property not found</h2>
        <button 
          onClick={onBack} 
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.625rem 1.25rem', background: 'var(--card-bg, #ffffff)', color: 'var(--text-main, #1e293b)', fontWeight: '600', borderRadius: '0.75rem', border: '1px solid var(--border-color, #cbd5e1)', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary, #2563eb)'; e.currentTarget.style.color = 'var(--primary, #2563eb)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color, #cbd5e1)'; e.currentTarget.style.color = 'var(--text-main, #1e293b)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
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
    <div className="container property-details-page" style={{ padding: '2.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto', animation: 'fadeIn 0.4s ease-out' }}>
      <button 
        onClick={onBack} 
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '0.5rem 1rem', background: 'transparent', color: 'var(--text-muted, #64748b)', fontWeight: '600', borderRadius: '0.5rem', border: '1px solid var(--border-color, #cbd5e1)', cursor: 'pointer', transition: 'all 0.2s ease', fontSize: '0.875rem' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary, #2563eb)'; e.currentTarget.style.color = 'var(--primary, #2563eb)'; e.currentTarget.style.background = 'var(--primary-light, #eff6ff)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color, #cbd5e1)'; e.currentTarget.style.color = 'var(--text-muted, #64748b)'; e.currentTarget.style.background = 'transparent'; }}
      >
        ← Back to listings
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        {/* Left Column: Details */}
        <div style={{ background: 'var(--card-bg, #ffffff)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid var(--border-color, #e2e8f0)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
          <div style={{ overflow: 'hidden', borderRadius: '1rem', marginBottom: '1.5rem' }}>
            <img
              src={property.image_url || property.image}
              alt={property.title}
              style={{ width: '100%', height: 'auto', objectFit: 'cover', maxHeight: '420px', transition: 'transform 0.3s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
          <h1 style={{ marginTop: '0', marginBottom: '0.5rem', fontSize: '2rem', fontWeight: '800', color: 'var(--text-main, #0f172a)' }}>{property.title}</h1>
          <p style={{ color: 'var(--text-muted, #64748b)', fontSize: '1.1rem', marginBottom: '1rem' }}>{property.location}</p>
          <h2 style={{ color: 'var(--primary, #2563eb)', margin: '1rem 0', fontSize: '1.75rem', fontWeight: '800' }}>
            ₹{property.price?.toLocaleString()}
            {property.listing_type === 'Rent' ? ' / month' : ''}
          </h2>

          <div style={{ display: 'flex', gap: '1.5rem', margin: '1.5rem 0', background: 'var(--bg-secondary, #f8fafc)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid var(--border-color, #e2e8f0)', flexWrap: 'wrap' }}>
            <div><strong>Bedrooms:</strong> {property.bedrooms}</div>
            <div><strong>Bathrooms:</strong> {property.bathrooms}</div>
            <div><strong>Area:</strong> {property.sqft} sq.ft</div>
          </div>

          <p style={{ color: 'var(--text-muted, #475569)', lineHeight: '1.6', marginBottom: '1.5rem' }}>{property.description}</p>

          <button
            onClick={() => onToggleCompare(property.id)}
            disabled={compareDisabled && !isCompared}
            style={{ 
              width: '100%',
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '0.75rem 1.5rem', 
              background: isCompared ? '#fee2e2' : 'var(--primary, #2563eb)', 
              color: isCompared ? '#991b1b' : '#ffffff', 
              fontWeight: '600', 
              borderRadius: '0.75rem', 
              border: isCompared ? '1px solid #fecaca' : 'none', 
              cursor: (compareDisabled && !isCompared) ? 'not-allowed' : 'pointer', 
              transition: 'all 0.2s ease',
              opacity: (compareDisabled && !isCompared) ? 0.6 : 1,
              boxShadow: isCompared ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.25)'
            }}
            onMouseEnter={(e) => { if (!compareDisabled || isCompared) e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { if (!compareDisabled || isCompared) e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {isCompared ? 'Remove from Compare' : 'Add to Compare'}
          </button>
        </div>

        {/* Right Column: Enquiry Form */}
        <div style={{ background: 'var(--card-bg, #ffffff)', padding: '2rem', borderRadius: '1.25rem', border: '1px solid var(--border-color, #e2e8f0)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main, #0f172a)', marginBottom: '1rem' }}>Enquire About This Property</h3>
          
          {submitted ? (
            <div style={{ color: '#16a34a', padding: '1.5rem 0', textAlign: 'center' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}><strong>Thank you!</strong> Your enquiry has been submitted successfully.</p>
              <button 
                onClick={() => setSubmitted(false)} 
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem 1.5rem', background: 'var(--primary, #2563eb)', color: '#ffffff', fontWeight: '600', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
              {errorMsg && <p style={{ color: '#dc2626', margin: 0, padding: '0.75rem', background: '#fee2e2', borderRadius: '0.5rem', fontSize: '0.9rem' }}>{errorMsg}</p>}

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main, #1e293b)' }}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color, #cbd5e1)', background: 'var(--bg-secondary, #f8fafc)', fontSize: '1rem', outline: 'none', color: 'var(--text-main, #0f172a)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main, #1e293b)' }}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color, #cbd5e1)', background: 'var(--bg-secondary, #f8fafc)', fontSize: '1rem', outline: 'none', color: 'var(--text-main, #0f172a)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main, #1e293b)' }}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color, #cbd5e1)', background: 'var(--bg-secondary, #f8fafc)', fontSize: '1rem', outline: 'none', color: 'var(--text-main, #0f172a)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main, #1e293b)' }}>Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="I am interested in this property..."
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color, #cbd5e1)', background: 'var(--bg-secondary, #f8fafc)', fontSize: '1rem', outline: 'none', color: 'var(--text-main, #0f172a)', resize: 'vertical' }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '0.875rem 1.5rem',
                  background: 'var(--primary, #2563eb)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                  opacity: submitting ? 0.7 : 1,
                }}
                onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.transform = 'translateY(0)'; }}
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