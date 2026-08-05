export type IconName =
  | "layers"
  | "trend"
  | "ruble"
  | "shield"
  | "case"
  | "building"
  | "pin"
  | "check"
  | "minus";

const paths: Record<IconName, React.ReactNode> = {
  layers: (
    <>
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
      <path d="m3 12.5 9 4.5 9-4.5" />
      <path d="m3 17 9 4.5 9-4.5" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17 9.5 10.5l3.5 3.5L21 6" />
      <path d="M15 6h6v6" />
    </>
  ),
  ruble: (
    <>
      <path d="M9 20V5h4.5a4 4 0 0 1 0 8H7" />
      <path d="M7 17h7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 7.7 7 9.5 4.1-1.8 7-5.3 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  case: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M3 12h18" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V6l7-3v18" />
      <path d="M11 10h6a2 2 0 0 1 2 2v9" />
      <path d="M7 9h.01M7 13h.01M7 17h.01M15 14h.01M15 17h.01" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  check: <path d="m4 12.5 5 5L20 7" />,
  minus: <path d="M5 12h14" />,
};

export function Icon({
  name,
  className = "size-5",
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
