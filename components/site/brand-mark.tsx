import Image from 'next/image'

type BrandMarkProps = {
  className?: string
  decorative?: boolean
  title?: string
}

export function BrandMark({
  className,
  decorative = true,
  title = 'Sonicverse logo',
}: BrandMarkProps) {
  const source = '/brand/signal-aperture-mark.svg'

  return (
    <Image
      src={source}
      width={128}
      height={128}
      className={className}
      alt={decorative ? '' : title}
      aria-hidden={decorative}
      role={decorative ? undefined : 'img'}
      loading="eager"
      decoding="async"
    />
  )
}
