import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export default function FallbackImage(props: ImageProps) {
  const [error, setError] = useState(false);
  
  if (error) {
    // Return a simple placeholder or fallback image
    return (
      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }
  
  return (
    <Image
      {...props}
      onError={() => {
        console.error(`Failed to load image: ${props.src}`);
        setError(true);
      }}
    />
  );
}