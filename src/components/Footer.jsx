import React from 'react'

export default function Footer({ onLogoClick, onBrowseClick, onCompareClick, onHistoryClick }) {
  return (
    <footer className="footer" style={{ background: 'var(--bg-secondary, #f8fafc)', borderTop: '1px solid var(--border-color, #e2e8f0)', padding: '3.5rem 1.5rem 2rem', marginTop: '4rem' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div 
              onClick={onLogoClick} 
              style={{ cursor: 'pointer', fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary, #2563eb)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}
            >
              HomeFinder
            </div>
            <p style={{ color: 'var(--text-muted, #64748b)', fontSize: '0.95rem', maxWidth: '320px', lineHeight: '1.5', margin: 0 }}>
              Find verified listings, filter by what you need, and compare your favourites side by side.
            </p>
          </div>

          <div className="footer-column" style={{ minWidth: '160px' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--text-main, #0f172a)', marginBottom: '1.25rem' }}>EXPLORE</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <button 
                  onClick={onLogoClick}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted, #64748b)', padding: 0, cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s ease', textAlign: 'left' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary, #2563eb)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted, #64748b)'}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onBrowse({})}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted, #64748b)', padding: 0, cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s ease', textAlign: 'left' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary, #2563eb)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted, #64748b)'}
                >
                  All properties
                </button>
              </li>
              <li>
                <button 
                  onClick={onCompareClick}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted, #64748b)', padding: 0, cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s ease', textAlign: 'left' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary, #2563eb)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted, #64748b)'}
                >
                  Compare properties
                </button>
              </li>
              {onHistoryClick && (
                <li>
                  <button 
                    onClick={onHistoryClick}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted, #64748b)', padding: 0, cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s ease', textAlign: 'left' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary, #2563eb)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted, #64748b)'}
                  >
                    Search History
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color, #e2e8f0)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '0.875rem', margin: 0 }}>
            &copy; {new Date().getFullYear()} HomeFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}