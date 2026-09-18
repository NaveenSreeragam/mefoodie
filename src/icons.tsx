type IconProps = { size?: number; className?: string; strokeWidth?: number };

export const HomeIcon = ({ size = 24, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CompassIcon = ({ size = 24, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={strokeWidth} />
    <path
      d="M16.24 7.76L14.12 14.12L7.76 16.24L9.88 9.88L16.24 7.76Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PlusIcon = ({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const BookmarkIcon = ({
  size = 24,
  className = "",
  filled = false,
  strokeWidth = 2,
}: IconProps & { filled?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    className={className}
  >
    <path
      d="M5 3H19C19.55 3 20 3.45 20 4V21L12 17L4 21V4C4 3.45 4.45 3 5 3Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UserIcon = ({ size = 24, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth={strokeWidth} />
    <path
      d="M4 20C4 16.68 7.58 14 12 14C16.42 14 20 16.68 20 20"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const SearchIcon = ({ size = 24, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={strokeWidth} />
    <path
      d="M16.5 16.5L21 21"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const StarIcon = ({
  size = 16,
  className = "",
  filled = true,
}: IconProps & { filled?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    className={className}
  >
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MapPinIcon = ({ size = 16, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 21C12 21 5 14.5 5 9C5 5.69 8.13 3 12 3C15.87 3 19 5.69 19 9C19 14.5 12 21 12 21Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth={strokeWidth} />
  </svg>
);

export const HeartIcon = ({
  size = 20,
  className = "",
  filled = false,
  strokeWidth = 2,
}: IconProps & { filled?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    className={className}
  >
    <path
      d="M20.84 4.61C20.31 4.1 19.68 3.7 18.99 3.42C18.3 3.14 17.56 3 16.82 3C16.07 3 15.34 3.14 14.65 3.42C13.96 3.7 13.33 4.1 12.8 4.61L12 5.41L11.2 4.61C10.13 3.56 8.66 2.97 7.14 2.97C5.62 2.97 4.15 3.56 3.08 4.61C2.01 5.66 1.41 7.1 1.41 8.61C1.41 10.12 2.01 11.56 3.08 12.61L12 21.5L20.92 12.61C21.99 11.56 22.59 10.12 22.59 8.61C22.59 7.1 21.99 5.66 20.92 4.61H20.84Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MessageIcon = ({ size = 20, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M21 15C21 15.53 20.79 16.04 20.41 16.41C20.04 16.79 19.53 17 19 17H7L3 21V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H19C19.53 3 20.04 3.21 20.41 3.59C20.79 3.96 21 4.47 21 5V15Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShareIcon = ({ size = 20, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth={strokeWidth} />
    <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth={strokeWidth} />
    <path
      d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const BellIcon = ({ size = 22, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M18 8C18 6.4 17.37 4.86 16.24 3.74C15.12 2.63 13.59 2 12 2C10.41 2 8.88 2.63 7.76 3.74C6.63 4.86 6 6.4 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.73 21C13.55 21.3 13.3 21.55 12.99 21.73C12.68 21.91 12.34 22 12 22C11.66 22 11.32 21.91 11.01 21.73C10.7 21.55 10.45 21.3 10.27 21"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRightIcon = ({ size = 20, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronLeftIcon = ({ size = 20, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const XIcon = ({ size = 20, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

export const FlameIcon = ({ size = 14, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C12 2 7 7.5 7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 11 15.5 9.5 15.5 9.5C15.5 9.5 14.5 12 13 12C11.5 12 11 10.5 11 10.5C11 10.5 12 7 12 2Z" />
    <path d="M12 18C13.5 18 15 19.5 15 21H9C9 19.5 10.5 18 12 18Z" />
  </svg>
);

export const PhoneIcon = ({ size = 18, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M22 16.92V19.92C22.0011 20.4853 21.7697 21.0268 21.3571 21.4202C20.9444 21.8136 20.3866 22.0272 19.82 21.99C16.7428 21.7004 13.787 20.6782 11.19 19C8.77382 17.4621 6.72533 15.4136 5.18999 13C3.49997 10.3968 2.47788 7.42789 2.20999 4.34C2.173 3.77457 2.38516 3.21803 2.77686 2.80565C3.16856 2.39328 3.70719 2.17867 4.26999 2.18H7.26999C8.27 2.18 9.08 2.86 9.26 3.85C9.59765 5.69 10.2247 7.47 11.11 9.12C11.37 9.59 11.25 10.17 10.83 10.5L9.49999 11.66C10.9439 14.1289 12.8711 16.0561 15.34 17.5L16.5 16.17C16.83 15.75 17.41 15.63 17.88 15.89C19.53 16.7753 21.31 17.4023 23.15 17.74C24.15 17.92 24.82 18.73 24.82 19.73L22 16.92Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const NavigationIcon = ({ size = 18, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <polygon
      points="3 11 22 2 13 21 11 13 3 11"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CameraIcon = ({ size = 22, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth={strokeWidth} />
  </svg>
);

export const SparkleIcon = ({ size = 16, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" />
  </svg>
);

export const ClockIcon = ({ size = 14, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={strokeWidth} />
    <polyline
      points="12 6 12 12 16 14"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SlidersIcon = ({ size = 18, className = "", strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <line
      x1="4"
      y1="21"
      x2="4"
      y2="14"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="4"
      y1="10"
      x2="4"
      y2="3"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="21"
      x2="12"
      y2="12"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="8"
      x2="12"
      y2="3"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="21"
      x2="20"
      y2="16"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="12"
      x2="20"
      y2="3"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="1"
      y1="14"
      x2="7"
      y2="14"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="9"
      y1="8"
      x2="15"
      y2="8"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="17"
      y1="16"
      x2="23"
      y2="16"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);
