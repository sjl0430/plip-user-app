type NavIconProps = {
  className?: string;
};

export function NavHomeIcon({ className = "" }: NavIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 10.2V19.5C5 20.05 5.45 20.5 6 20.5H9.5V15.5H14.5V20.5H18C18.55 20.5 19 20.05 19 19.5V10.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.2 10.8L11.2 5.2C11.7 4.75 12.3 4.75 12.8 5.2L19.8 10.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NavDiaryIcon({ className = "" }: NavIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="4.5"
        y="3.5"
        width="15"
        height="17"
        rx="2.25"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M8 3.5V5.5M16 3.5V5.5M8 11.5H16M8 15H13"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M9.5 8.2L11 9.8L14.2 6.4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NavMyPageIcon({ className = "" }: NavIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M6.2 19.2C6.95 16.45 9.2 14.8 12 14.8C14.8 14.8 17.05 16.45 17.8 19.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
