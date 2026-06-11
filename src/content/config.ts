import { defineCollection, z } from 'astro:content';

const apps = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    // Astro reserves `slug` in MDX frontmatter and exposes it as entry.slug.
    // Keep the schema field optional so frontmatter can include it without build failures.
    slug: z.string().optional(),
    tagline: z.string(),
    description: z.string(),
    icon: z.string(),
    screenshots: z.array(z.string()).optional(),
    appStoreUrl: z.string().url().optional(),
    playStoreUrl: z.string().url().optional(),
    webUrl: z.string().url().optional(),
    downloadUrl: z.string().url().optional(),
    platforms: z.array(z.enum(['ios', 'android', 'web', 'windows', 'macos', 'linux'])).default([]),
    // Which sunset-stripe color this app carries throughout the site.
    accent: z.enum(['tangerine', 'magenta', 'golden', 'teal']).default('tangerine'),
    published: z.boolean().default(true),
    releaseDate: z.date(),
  }),
});

export const collections = { apps };
