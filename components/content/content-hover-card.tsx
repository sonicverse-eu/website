"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";

type ContentHoverCardProps = {
  children: ReactNode;
  className?: string;
};

export function ContentHoverCard({ children, className }: ContentHoverCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
            }
      }
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
