'use client'

import Image, { ImageProps } from 'next/image'
import { workerImageLoader } from '@/lib/worker-image-loader'
import { useState } from 'react'

export default function WorkerImage(props: ImageProps) {
  const { alt, ...imageProps } = props
  const [error, setError] = useState(false)

  if (error) {
    // Return a simple placeholder or fallback image
    return (
      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    )
  }

  return (
    <Image
      {...imageProps}
      alt={alt}
      loader={workerImageLoader}
      onError={() => {
        setError(true)
      }}
    />
  )
}
