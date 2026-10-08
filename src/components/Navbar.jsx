// ============================================================================
// Navbar.jsx
//
// Sticky top bar: logo, section links and a compact compare button.
// On narrow screens the links collapse and the icons stay reachable.
// ============================================================================

import { IconHome, IconClose } from './Icons'

function Navbar({ onLogoClick, onBrowseClick, onCompareClick, compareCount, onRemoveCompare }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* --- Logo / site name --- */}
        <button type="button" className="brand" onClick={onLogoClick}>
          <span className="brand-mark">
            <IconHome size={19} />
          </span>
          <span className="brand-name">HomeFinder</span>
        </button>

        {/* --- Links --- */}
        <nav className="nav-links">
          <button type="button" className="nav-link" onClick={onLogoClick}>
            Home
          </button>
          <button type="button" className="nav-link" onClick={onBrowseClick}>
            Properties
          </button>
          <button type="button" className="nav-link" onClick={onCompareClick}>
            Compare
            {compareCount > 0 && <span className="nav-count">{compareCount}</span>}
          </button>
        </nav>

        {/* --- Compare shortcut --- */}
        <div className="nav-actions">
          {compareCount > 0 && (
            // Note: this is a plain <div>, not a <button>, because it contains
            // two separate controls. Nesting a button inside a button is invalid
            // HTML and confuses screen readers.
            <div className="nav-chip">
              <button
                type="button"
                className="nav-chip-main"
                onClick={onCompareClick}
                title="Open the comparison view"
              >
                {compareCount} to compare
              </button>
              <button
                type="button"
                className="nav-chip-x"
                onClick={onRemoveCompare}
                aria-label="Clear compared properties"
                title="Clear compared properties"
              >
                <IconClose size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
