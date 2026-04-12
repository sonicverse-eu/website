"use client";

import Image, { ImageProps } from 'next/image';
import { workerImageLoader } from '@/lib/worker-image-loader';

export default function WorkerImage(props: ImageProps) {
  return <Image {...props} loader={workerImageLoader} />;
}
