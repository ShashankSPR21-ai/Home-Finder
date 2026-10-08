import React from 'react'

export default function Footer({ onLogoClick, onBrowseClick, onCompareClick, onHistoryClick }) {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h3>EXPLORE</h3>
        <ul>
          <li>
            <button onClick={onLogoClick}>Home</button>
          </li>
          <li>
            <button onClick={() => onBrowseClick({})}>All properties</button>
          </li>
          <li>
            <button onClick={onCompareClick}>Compare properties</button>
          </li>
          {onHistoryClick && (
            <li>
              <button onClick={onHistoryClick}>Search History</button>
            </li>
          )}
        </ul>
      </div>
    </footer>
  )
}