// ============================================================================
// Icons.jsx
//
// Small inline SVG icons. We draw them by hand instead of installing an icon
// library - one less dependency to explain, and they inherit the text colour
// through "currentColor".
// ============================================================================

// Every icon shares the same wrapper so they all line up neatly.
function Svg({ size = 18, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const IconPin = (props) => (
  <Svg {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Svg>
)

export const IconBed = (props) => (
  <Svg {...props}>
    <path d="M2 17v-5h20v5" />
    <path d="M2 12V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" />
    <path d="M2 17h20v3" />
  </Svg>
)

export const IconBath = (props) => (
  <Svg {...props}>
    <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
    <path d="M6 12V6a2 2 0 0 1 4 0" />
    <path d="M6 19l-1 2M18 19l1 2" />
  </Svg>
)

export const IconArea = (props) => (
  <Svg {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 3v5M3 8h5M16 21v-5M21 16h-5" />
  </Svg>
)

export const IconSearch = (props) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </Svg>
)

export const IconClose = (props) => (
  <Svg {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Svg>
)

export const IconCompare = (props) => (
  <Svg {...props}>
    <path d="M4 6h16M4 12h10M4 18h7" />
    <path d="m16 15 3 3 3-3" />
  </Svg>
)

export const IconCheck = (props) => (
  <Svg {...props}>
    <path d="m20 6-11 11-5-5" />
  </Svg>
)

export const IconArrowLeft = (props) => (
  <Svg {...props}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </Svg>
)

export const IconMail = (props) => (
  <Svg {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </Svg>
)

export const IconPhone = (props) => (
  <Svg {...props}>
    <path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" />
  </Svg>
)

export const IconHome = (props) => (
  <Svg {...props}>
    <path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    <path d="M9 22V12h6v10" />
  </Svg>
)
