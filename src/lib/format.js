// ============================================================================
// format.js - tiny display helpers so components stay readable.
// ============================================================================

/**
 * Turns 8500000 into "₹85,00,000" using Indian digit grouping,
 * or 22000 with { perMonth: true } into "₹22,000 / month".
 */
export function formatPrice(price, { perMonth = false } = {}) {
  const number = Number(price)

  if (Number.isNaN(number)) return 'Price on request'

  // The 'en-IN' locale gives Indian grouping (1,25,000).
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(number)

  return perMonth ? `₹${formatted} / month` : `₹${formatted}`
}

/** 1250 -> "1,250 sq.ft"  |  empty -> "—" */
export function formatArea(area) {
  if (area === null || area === undefined || area === '') return '—'
  return `${new Intl.NumberFormat('en-IN').format(Number(area))} sq.ft`
}

/** null / undefined / 0 bedrooms -> "—" (plots have no bedrooms) */
export function formatCount(value) {
  if (value === null || value === undefined || value === '') return '—'
  return String(value)
}

/** True when the listing is a rental - used to pick the right badge. */
export function isRent(property) {
  return String(property.listing_type).toLowerCase() === 'rent'
}

/** A grey placeholder for images that fail to load. */
export const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520">
      <rect width="800" height="520" fill="#eef2f7"/>
      <g fill="#94a3b8" font-family="sans-serif" text-anchor="middle">
        <text x="400" y="250" font-size="34" font-weight="700">HomeFinder</text>
        <text x="400" y="288" font-size="18">Image unavailable</text>
      </g>
    </svg>`
  )
