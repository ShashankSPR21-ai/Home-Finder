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
    <nav className="navbar">
      <div className="logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
        HomeFinder
      </div>
      <div className="nav-links">
        <button onClick={onBrowseClick}>Browse</button>
        <button onClick={onCompareClick}>Compare ({compareCount})</button>
        {onHistoryClick && <button onClick={onHistoryClick}>History</button>}
      </div>
    </nav>
  )
}