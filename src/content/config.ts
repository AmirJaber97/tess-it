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

    // --- Marketing page ---
    // One- or two-sentence opener (the lead line of the App Store description).
    pitch: z.string().optional(),
    // Feature blocks rendered as a grid on the marketing page.
    features: z
      .array(
        z.object({
          icon: z.enum([
            'hotkey',
            'edge',
            'switcher',
            'richtext',
            'lock',
            'bolt',
            'sparkles',
            'sync',
          ]),
          title: z.string(),
          description: z.string(),
        })
      )
      .default([]),

    // --- Support page (per-app) ---
    supportEmail: z.string().default('support@tess-it.net'),
    responseTime: z.string().default('1–2 business days'),
    // Labelled quick-start rows: { label: 'Open', value: '⌘⇧⌥N or …' }.
    quickStart: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),

    // --- Privacy ---
    // Short plain-language summary shown on both support and privacy pages.
    privacyNote: z.string().optional(),
  }),
});

export const collections = { apps };
