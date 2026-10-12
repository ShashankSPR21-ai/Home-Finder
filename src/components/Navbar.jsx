import React from 'react'

export default function Navbar({
  onLogoClick,
  onBrowseClick,
  onCompareClick,
  onHistoryClick,
  compareCount,
  onRemoveCompare,
}) {
  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: 'var(--card-bg, #ffffff)', borderBottom: '1px solid var(--border-color, #e2e8f0)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div 
        className="logo" 
        onClick={onLogoClick} 
        style={{ cursor: 'pointer', fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary, #2563eb)', letterSpacing: '-0.025em', transition: 'opacity 0.2s ease' }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        HomeFinder
      </div>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button 
          onClick={onBrowseClick}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 1rem', background: 'transparent', color: 'var(--text-main, #1e293b)', fontWeight: '600', borderRadius: '0.5rem', border: '1px solid var(--border-color, #cbd5e1)', cursor: 'pointer', transition: 'all 0.2s ease', fontSize: '0.875rem' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary, #2563eb)'; e.currentTarget.style.color = 'var(--primary, #2563eb)'; e.currentTarget.style.background = 'var(--primary-light, #eff6ff)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color, #cbd5e1)'; e.currentTarget.style.color = 'var(--text-main, #1e293b)'; e.currentTarget.style.background = 'transparent'; }}
        >
          Browse
        </button>
        <button 
          onClick={onCompareClick}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 1rem', background: compareCount > 0 ? 'var(--primary, #2563eb)' : 'transparent', color: compareCount > 0 ? '#ffffff' : 'var(--text-main, #1e293b)', fontWeight: '600', borderRadius: '0.5rem', border: '1px solid', borderColor: compareCount > 0 ? 'var(--primary, #2563eb)' : 'var(--border-color, #cbd5e1)', cursor: 'pointer', transition: 'all 0.2s ease', fontSize: '0.875rem', boxShadow: compareCount > 0 ? '0 2px 8px rgba(37, 99, 235, 0.25)' : 'none' }}
          onMouseEnter={(e) => { 
            if (compareCount === 0) {
              e.currentTarget.style.borderColor = 'var(--primary, #2563eb)'; 
              e.currentTarget.style.color = 'var(--primary, #2563eb)'; 
              e.currentTarget.style.background = 'var(--primary-light, #eff6ff)';
            } else {
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => { 
            if (compareCount === 0) {
              e.currentTarget.style.borderColor = 'var(--border-color, #cbd5e1)'; 
              e.currentTarget.style.color = 'var(--text-main, #1e293b)'; 
              e.currentTarget.style.background = 'transparent';
            } else {
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          Compare ({compareCount})
        </button>
        {onHistoryClick && (
          <button 
            onClick={onHistoryClick}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 1rem', background: 'transparent', color: 'var(--text-main, #1e293b)', fontWeight: '600', borderRadius: '0.5rem', border: '1px solid var(--border-color, #cbd5e1)', cursor: 'pointer', transition: 'all 0.2s ease', fontSize: '0.875rem' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary, #2563eb)'; e.currentTarget.style.color = 'var(--primary, #2563eb)'; e.currentTarget.style.background = 'var(--primary-light, #eff6ff)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color, #cbd5e1)'; e.currentTarget.style.color = 'var(--text-main, #1e293b)'; e.currentTarget.style.background = 'transparent'; }}
          >
            History
          </button>
        )}
      </div>
    </nav>
  )
}