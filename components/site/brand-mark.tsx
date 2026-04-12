type BrandMarkProps = {
  className?: string;
  decorative?: boolean;
  title?: string;
};

export function BrandMark({
  className,
  decorative = true,
  title = "Sonicverse logo",
}: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 500 579.19"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={decorative}
      aria-label={decorative ? undefined : title}
      role={decorative ? undefined : "img"}
      focusable="false"
    >
      {!decorative ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M184.55 568.84 18.42 403.36c-6.46-6.79-10.02-15.84-10.02-25.53V360.7c0-20.69 16.48-35.88 37.81-35.88h78.54L20.36 220.1C7.44 207.18 0 188.1 0 165.81v-94.7C0 27.47 27.47 0 70.78 0h216.23c10.34 0 19.39 4.2 25.53 10.34l165.48 165.48c6.46 6.46 10.34 15.2 10.34 25.53v16.49c0 21.33-16.16 36.85-37.81 36.85h-50.74l80.15 80.15c13.9 13.9 20.04 32 20.04 54.3v119.27c0 42.98-27.15 70.78-70.14 70.78H210.08c-10.02 0-19.07-3.88-25.53-10.35Z"
      />
    </svg>
  );
}
