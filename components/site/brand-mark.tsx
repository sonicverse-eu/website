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
  const source = '/icon-purple.svg'

  return (
    <Image
      src={source}
      width={120}
      height={120}
      className={className}
      alt={decorative ? '' : title}
      aria-hidden={decorative}
      role={decorative ? undefined : 'img'}
      loading="eager"
    />
  )
}
