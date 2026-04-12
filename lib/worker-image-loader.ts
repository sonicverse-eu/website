import { ImageLoaderProps } from 'next/image';

// Builds a URL that points to a deployed Image Worker which applies transforms.
// Configure `NEXT_PUBLIC_IMAGE_WORKER_URL` to your worker endpoint (absolute or relative).
export function workerImageLoader({ src, width, quality }: ImageLoaderProps) {
  const base = process.env.NEXT_PUBLIC_IMAGE_WORKER_URL ?? '/workers/image';
  try {
    const url = new URL(base, typeof window === 'undefined' ? 'http://localhost' : window.location.origin);
    url.searchParams.set('src', String(src));
    if (width) url.searchParams.set('w', String(width));
    if (quality) url.searchParams.set('q', String(quality));
    return url.toString();
  } catch (e) {
    // Fallback: append query params manually
    const sep = base.includes('?') ? '&' : '?';
    return `${base}${sep}src=${encodeURIComponent(String(src))}${width ? `&w=${width}` : ''}${quality ? `&q=${quality}` : ''}`;
  }
}

export default workerImageLoader;
