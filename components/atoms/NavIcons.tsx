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

export function NavHeartIcon({ className = "" }: NavIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 20.2S4.5 15.4 4.5 9.8C4.5 7.2 6.55 5.3 9.1 5.3C10.55 5.3 11.85 6.05 12.5 7.2C13.15 6.05 14.45 5.3 15.9 5.3C18.45 5.3 20.5 7.2 20.5 9.8C20.5 15.4 12 20.2 12 20.2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NavCaptureIcon({ className = "" }: NavIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8.5 7.5L9.4 5.8C9.65 5.3 10.15 5 10.7 5H13.3C13.85 5 14.35 5.3 14.6 5.8L15.5 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="4.5"
        y="7.5"
        width="15"
        height="11.5"
        rx="2.25"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="13.25" r="3" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function NavAgitIcon({ className = "" }: NavIconProps) {
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
        y="4.5"
        width="6"
        height="6"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <rect
        x="13.5"
        y="4.5"
        width="6"
        height="6"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <rect
        x="4.5"
        y="13.5"
        width="6"
        height="6"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <rect
        x="13.5"
        y="13.5"
        width="6"
        height="6"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  );
}
