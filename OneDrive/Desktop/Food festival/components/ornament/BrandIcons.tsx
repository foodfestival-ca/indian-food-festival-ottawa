/**
 * Brand marks. Lucide v1 removed brand icons, so these are inlined as SVG —
 * which is also what we'd want anyway: currentColor-driven, no extra request,
 * and consistent optical weight with the Lucide set beside them.
 */

interface IconProps {
  size?: number;
  className?: string;
}

export function InstagramIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true" focusable="false">
      <path d="M15.5 3h-2.2A4.3 4.3 0 0 0 9 7.3V10H6.5v3.2H9V21h3.3v-7.8h2.6l.6-3.2h-3.2V7.6c0-.8.4-1.3 1.3-1.3h2z" />
    </svg>
  );
}

export function YoutubeIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true" focusable="false">
      <path d="M22 12s0-3.3-.4-4.9a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.3A2.5 2.5 0 0 0 2.4 7.1C2 8.7 2 12 2 12s0 3.3.4 4.9a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.3a2.5 2.5 0 0 0 1.8-1.8C22 15.3 22 12 22 12z" />
      <path d="M10 9.2v5.6L15 12z" />
    </svg>
  );
}
