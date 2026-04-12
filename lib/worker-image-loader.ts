import { ImageLoaderProps } from 'next/image';

// Builds a URL that points to a deployed Image Worker which applies transforms.
// Configure `NEXT_PUBLIC_IMAGE_WORKER_URL` to your worker endpoint (absolute or relative).
export function workerImageLoader({ src, width, quality }: ImageLoaderProps) {
  // Use environment variable if set, otherwise default to the local worker endpoint
  const base = process.env.NEXT_PUBLIC_IMAGE_WORKER_URL ?? '/workers/image';
  
  // Ensure src starts with a slash for consistent path handling
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  try {
    const url = new URL(base, typeof window === 'undefined' ? 'http://localhost' : window.location.origin);
    url.searchParams.set('src', normalizedSrc);
    if (width) url.searchParams.set('w', String(width));
    if (quality) url.searchParams.set('q', String(quality));
    return url.toString();
  } catch (e) {
    // Fallback: append query params manually
    const sep = base.includes('?') ? '&' : '?';
    return `${base}${sep}src=${encodeURIComponent(normalizedSrc)}${width ? `&w=${width}` : ''}${quality ? `&q=${quality}` : ''}`;
  }
}

export default workerImageLoader;
