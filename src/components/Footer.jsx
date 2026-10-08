// ============================================================================
// Footer.jsx - simple site footer with useful links and a note.
// ============================================================================

import { IconHome } from './Icons'

function Footer({ onBrowseClick, onCompareClick, onLogoClick }) {
  // The year is computed so the footer never goes stale.
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand">
            <span className="brand-mark">
              <IconHome size={18} />
            </span>
            <span className="brand-name">HomeFinder</span>
          </span>
          <p className="muted footer-tagline">
            Find, filter and compare homes for sale and rent — all in one place.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <button type="button" className="footer-link" onClick={onLogoClick}>
            Home
          </button>
          <button type="button" className="footer-link" onClick={onBrowseClick}>
            All properties
          </button>
          <button type="button" className="footer-link" onClick={onCompareClick}>
            Compare properties
          </button>
        </div>

        <div className="footer-col">
          <h4>Listing types</h4>
          <button type="button" className="footer-link" onClick={() => onBrowseClick({ listingType: 'Buy' })}>
            Properties to buy
          </button>
          <button type="button" className="footer-link" onClick={() => onBrowseClick({ listingType: 'Rent' })}>
            Properties to rent
          </button>
        </div>
      </div>

      <div className="container footer-bottom">
        <span className="muted">© {year} HomeFinder. Built for a hackathon demo.</span>
        <span className="muted">Made with React, CSS &amp; Supabase</span>
      </div>
    </footer>
  )
}

export default Footer
