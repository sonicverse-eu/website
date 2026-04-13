import { z } from 'zod'

import { roadmapStatuses } from './types'

const dateString = z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
  message: 'Expected an ISO-like date string.',
})

const sharedFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: dateString,
  tags: z.array(z.string().min(1)).optional(),
})

export const blogFrontmatterSchema = sharedFrontmatterSchema.extend({
  featured: z.boolean().default(false),
})

export const changelogFrontmatterSchema = sharedFrontmatterSchema.extend({
  version: z.string().min(1),
})

export const roadmapFrontmatterSchema = sharedFrontmatterSchema.extend({
  status: z.enum(roadmapStatuses),
  updatedAt: dateString.optional(),
  order: z.number().int().nonnegative().optional(),
})
