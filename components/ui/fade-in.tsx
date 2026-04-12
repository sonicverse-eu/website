"use client";

import type { ComponentPropsWithoutRef } from "react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function FadeIn({
  className,
  delay = 0,
  y = 18,
  ...props
}: ComponentPropsWithoutRef<typeof motion.div> & {
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className={cn(className)}
      {...props}
    />
  );
}
