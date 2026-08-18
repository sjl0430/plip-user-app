type NavIconProps = {
  className?: string;
};

export function NavHomeIcon({ className = "" }: NavIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M12 3.2 3.8 10.1c-.3.25-.3.7 0 .95l.7.55c.25.2.6.15.8-.1L12 5.9l6.7 5.6c.2.25.55.3.8.1l.7-.55c.3-.25.3-.7 0-.95L12 3.2Z" />
      <path d="M6.2 11.8v7.5c0 .55.45 1 1 1h3.3v-4.6h3v4.6h3.3c.55 0 1-.45 1-1v-7.5L12 7.1 6.2 11.8Z" />
    </svg>
  );
}

export function NavAzitIcon({ className = "" }: NavIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M8.8 11.2a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm6.5 1.1a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2ZM3.7 18.8c.7-2.7 2.7-4.2 5.1-4.2s4.4 1.5 5.1 4.2c.1.35-.15.7-.5.7H4.2c-.35 0-.6-.35-.5-.7Zm9.8-.2c-.35-1.55-1.2-2.75-2.35-3.5 1.05-.2 2.2-.05 3.25.55 1.45.85 2.4 2.3 2.75 3.95.05.3-.15.6-.45.6h-3.45c.2-.5.25-1.05.25-1.6Z" />
    </svg>
  );
}

export function NavCreateIcon({ className = "" }: NavIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function NavDiaryIcon({ className = "" }: NavIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M5.5 4.5h10.2c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H5.5c-.55 0-1-.45-1-1V5.5c0-.55.45-1 1-1Zm2.2 3.2h7.2v1.6H7.7V7.7Zm0 3.2h7.2v1.6H7.7v-1.6Zm0 3.2h5v1.6h-5v-1.6Z" />
      <path d="M18.8 7.2h.7c.55 0 1 .45 1 1v8.2c0 .55-.45 1-1 1h-.7V7.2Z" />
    </svg>
  );
}

export function NavInboxIcon({ className = "" }: NavIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M4.4 5.6h15.2c.55 0 1 .45 1 1v10.8c0 .55-.45 1-1 1H4.4c-.55 0-1-.45-1-1V6.6c0-.55.45-1 1-1Zm1.3 2.2v1.15l5.7 3.5c.35.2.8.2 1.15 0l5.7-3.5V7.8l-6.25 3.8L5.7 7.8Z" />
    </svg>
  );
}

export function NavMyPageIcon({ className = "" }: NavIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M12 12.2a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Zm0 1.6c-3.1 0-5.7 1.8-6.5 4.3-.1.35.15.7.5.7h12c.35 0 .6-.35.5-.7-.8-2.5-3.4-4.3-6.5-4.3Z" />
    </svg>
  );
}
