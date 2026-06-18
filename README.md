# tess-it.net

Portfolio site for Emir's apps. Astro + Tailwind 4, fully static, deployed on Cloudflare Pages.

## Adding a new app

Each app is one MDX file — the landing-page card, marketing page, support page, and privacy page all generate from it automatically at top-level URLs (`/<slug>`, `/<slug>/support`, `/<slug>/privacy`).

1. **Create the content file**: copy `src/content/apps/slidenote.mdx` to `src/content/apps/<your-slug>.mdx`.
2. **Add assets**: drop an icon and screenshots into `public/apps/<your-slug>/`. Square icon ~512px. Screenshots: phone aspect (390×844) for iOS/Android, landscape 16:10 (1280×800) for Mac/desktop.
3. **Edit the frontmatter** (see the full reference below).
4. The MDX body under the frontmatter is the "story" section on the marketing page — markdown headings, lists, links, and emphasis all work.

Push to `main` and Cloudflare Pages rebuilds the site.

### Frontmatter reference

```yaml
# --- Identity ---
name: My App
slug: my-app                 # URL: /my-app/  (also /my-app/support, /my-app/privacy)
tagline: One line shown on the card and hero.
description: Slightly longer line used for SEO/meta tags.
icon: /apps/my-app/icon.svg
accent: tangerine            # tangerine | magenta | golden | teal — the app's signature color
platforms: [macos]           # ios | android | web | windows | macos | linux
published: true              # false = hidden everywhere
releaseDate: 2026-06-18

# --- Store / download links (all optional; only what you set renders) ---
appStoreUrl: https://...     # lights up the App Store / Mac App Store badge.
                             # Omit it and the badge shows "Coming soon" instead.
playStoreUrl: https://...
webUrl: https://...
downloadUrl: https://...

# --- Marketing page ---
pitch: One or two sentences — the opening line of your App Store description.
screenshots:                 # optional; carousel hides if omitted
  - /apps/my-app/screenshot-1.svg
features:                    # 3–5 blocks; icon is one of the keys below
  - icon: hotkey
    title: Hotkey access
    description: Summon it from anywhere.

# --- Support page (per-app) ---
supportEmail: support@tess-it.net
responseTime: '1–2 business days'
quickStart:
  - label: Open
    value: 'Press ⌘⇧⌥N, or move your mouse to the left edge.'
faq:
  - q: The hotkey doesn’t work
    a: Another app may be using it. Open from the menu bar instead.

# --- Privacy ---
privacyNote: Short plain-language summary shown on the support and privacy pages.
```

**Feature icon keys:** `hotkey`, `edge`, `switcher`, `richtext`, `lock`, `bolt`, `sparkles`, `sync`. (Add more in `src/components/FeatureIcon.astro`.)

## Editing site text

| Text | File |
| :-- | :-- |
| Hero headline, tagline, CTA buttons | `src/pages/index.astro` |
| About snippet on the landing page | `src/pages/index.astro` |
| Footer links (email, GitHub, App Store) | `src/layouts/BaseLayout.astro` |
| Site-wide default title/description | `src/layouts/BaseLayout.astro` |
| An app's marketing / support / privacy content | that app's `*.mdx` frontmatter |

Support (quick-start, FAQ, privacy note) and the marketing feature blocks are **per-app** — they live in each app's frontmatter, so every app shows its own. The privacy page's longer boilerplate sections are in `src/pages/[slug]/privacy.astro`; edit there if an app needs a different policy.

## Development

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview the production build |
| `npx astro check` | Type-check |

## Design system notes

- Palette and theme tokens live in `src/styles/global.css` (`:root` / `.dark`, mapped to Tailwind via `@theme inline`).
- Fonts: Space Grotesk (display), Inter (body), IBM Plex Mono (labels) — self-hosted via Fontsource.
- Motion honors `prefers-reduced-motion`: movement is stripped, opacity fades remain.
- The first-load intro plays once per browser session (`sessionStorage` key `tess-visited`).
- `vite@6` is pinned in `package.json` to match Astro's bundled Vite; remove the pin when Astro moves to Vite 7.
