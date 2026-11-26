// Hand-drawn romantic icon set (inline SVG, no dependencies).
// Every icon accepts a `size` prop plus any regular SVG props.

const HEART_PATH =
  "M12 21s-7.5-4.6-9.6-9.1C.9 8.6 2.9 4.5 6.7 4.5c2.1 0 3.6 1.1 5.3 3 1.7-1.9 3.2-3 5.3-3 3.8 0 5.8 4.1 4.3 7.4C19.5 16.4 12 21 12 21z";

function Svg({ size = 24, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function HeartIcon(props) {
  return (
    <Svg {...props}>
      <path d={HEART_PATH} fill="currentColor" />
      <path
        d="M7.2 7.6c-1.4.2-2.4 1.5-2.3 3"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

export function HeartCrackIcon(props) {
  return (
    <Svg {...props}>
      <path d={HEART_PATH} fill="currentColor" />
      <path
        d="M12 7.6l-1.6 3.1 2.6 2-2.1 3.4 1.1 2.6"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function SparkleIcon(props) {
  return (
    <Svg {...props}>
      <path
        d="M12 2l2.1 6.4L20.5 10.5l-6.4 2.1L12 19l-2.1-6.4L3.5 10.5l6.4-2.1z"
        fill="currentColor"
      />
      <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" fill="currentColor" opacity="0.7" />
    </Svg>
  );
}

export function EnvelopeIcon(props) {
  return (
    <Svg {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2.6" fill="#fff" />
      <path
        d="M2.8 6.6L12 13.2l9.2-6.6"
        stroke="#ffb3c6"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path d={HEART_PATH} fill="#ff2e63" transform="translate(9.3 10.6) scale(0.225)" />
    </Svg>
  );
}

export function RingIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="15.5" r="5.8" stroke="currentColor" strokeWidth="2.2" fill="none" />
      <path d="M8.6 5.2h6.8l2 2.5L12 12.4 6.6 7.7z" fill="#e0f4ff" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M6.6 7.7h10.8M10 5.2l2 7.2 2-7.2" stroke="currentColor" strokeWidth="0.7" fill="none" />
    </Svg>
  );
}

export function ReplayIcon(props) {
  return (
    <Svg {...props}>
      <path
        d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
