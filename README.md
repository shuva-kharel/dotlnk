# dotlnk

Your identity, configured.

dotlnk is a lightweight, open-source, static-first link-in-bio and profile platform powered by JSON. No database, no API server, no authentication backend — just data, a fast frontend, a powerful theme engine, multiple layouts, a local profile editor, and QR sharing.

## Features

- **JSON-powered profiles** — every profile is a single static JSON file
- **Static-first architecture** — no traditional backend required
- **15 visual themes** — each a complete visual identity with its own colors, typography, backgrounds, and animations
- **6 profile layouts** — Classic, Cards, Compact, Terminal, Grid, and Featured
- **Local profile editor** — `/editor` runs entirely in the browser, no login or server needed
- **JSON import / export** — import existing profiles, export as downloadable JSON files
- **QR code sharing** — every profile gets a shareable QR code, with native Web Share API support
- **Profile validation** — robust client-side schema validation with polished error states
- **Responsive design** — mobile-first, looks great on every screen size
- **Self-hosting** — clone and deploy your own instance in minutes
- **Privacy-first** — no analytics, no tracking, no cookies, no account required
- **Lightweight deployment** — works on Cloudflare Pages, Vercel, Netlify, GitHub Pages

## Architecture

```
User
  │
  ▼
/username
  │
  ▼
Static Frontend
  │
  ▼
/data/username.json
  │
  ▼
Schema Validation
  │
  ├── Invalid → Error UI
  │
  ▼
Theme + Layout
  │
  ▼
Profile Renderer
```

No application backend is required. The frontend reads the username from the URL, fetches the corresponding JSON file, validates it, loads the theme and layout, and renders the profile — all client-side.

## How Profiles Work

A URL such as:

```
https://lnk.shuvakharel.com.np/shuva
```

loads the profile associated with:

```
/data/shuva.json
```

The frontend reads the username from the URL, fetches the JSON file, validates it against the profile schema, loads the selected theme and layout, and renders the profile.

## Profile JSON

```json
{
  "username": "shuva",
  "name": "Shuva Kharel",
  "bio": "Cybersecurity • Linux • Programming",
  "avatar": "/avatars/shuva.png",
  "location": "Kathmandu, Nepal",
  "verified": true,
  "theme": "midnight",
  "layout": "classic",
  "socials": {
    "github": "https://github.com/shuva-kharel",
    "x": "https://x.com/shuva-kharel",
    "linkedin": "https://linkedin.com/in/shuva-kharel"
  },
  "links": [
    {
      "title": "My Website",
      "description": "Visit my personal website",
      "url": "https://example.com",
      "icon": "globe",
      "featured": true
    },
    {
      "title": "GitHub",
      "description": "Check out my projects",
      "url": "https://github.com/shuva-kharel",
      "icon": "github"
    }
  ]
}
```

A blank template is available at `public/data/template.json`.

### Supported Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | string | yes | The profile username (becomes the URL path) |
| `name` | string | yes | Display name |
| `bio` | string | yes | Short bio / tagline |
| `avatar` | string | yes | Avatar image URL |
| `location` | string | no | Optional location text |
| `verified` | boolean | no | Shows a verified badge |
| `theme` | string | no | Theme ID (e.g. `midnight`, `cyberpunk`) |
| `layout` | string | no | Layout ID (`classic`, `cards`, `compact`, `terminal`, `grid`, `featured`) |
| `socials` | object | no | Map of social platform to URL |
| `links` | array | yes | Array of link cards |
| `links[].title` | string | yes | Link title |
| `links[].url` | string | yes | Link URL |
| `links[].description` | string | no | Optional description |
| `links[].icon` | string | no | Icon name |
| `links[].thumbnail` | string | no | Optional thumbnail image URL |
| `links[].featured` | boolean | no | Marks the link as featured |

### Available Social Keys

`github`, `x`, `twitter`, `linkedin`, `instagram`, `youtube`, `dribbble`, `behance`, `tiktok`, `twitch`, `discord`, `email`, `website`, `mastodon`, `threads`

### Available Link Icons

`github`, `globe`, `link`, `mail`, `twitter`, `linkedin`, `youtube`, `instagram`, `dribbble`, `behance`, `book`, `code`, `terminal`, `rocket`, `star`, `award`, `briefcase`, `music`, `camera`, `pen-tool`, `zap`, `heart`, `shopping-bag`, `play`, `external-link`

## Themes

dotlnk supports 15 visual themes out of the box. The theme system is designed to be extensible — adding a new theme is a single definition in `src/themes/definitions.ts`.

- **Midnight** — deep black with subtle blue accents and glass cards
- **Aurora** — animated aurora gradients with glowing cards
- **Cyberpunk** — neon pink and cyan on dark futuristic surfaces
- **Terminal** — green monospace on black with terminal aesthetics
- **Ocean** — deep blue with cyan accents and soft gradients
- **Sunset** — warm orange, pink, and purple gradient skies
- **Minimal** — clean white with black text, ultra-refined
- **Paper** — off-white editorial with paper card aesthetic
- **Glass** — glassmorphism with blurred translucent surfaces
- **AMOLED** — pure black with minimal white accents
- **Forest** — dark green with natural earthy tones
- **Retro** — 80s/90s inspired with CRT effects and pixel vibes
- **Synthwave** — purple and pink neon with a retro grid horizon
- **Sakura** — soft pink with an elegant Japanese-inspired feel
- **Matrix** — black with green terminal aesthetic and falling code

## Layouts

Layouts control the structure of a profile, independent of the theme. Set the `layout` field in the profile JSON to choose one:

- **Classic** — Centered avatar, name, bio, and stacked link cards
- **Cards** — Links displayed as a grid of compact cards
- **Compact** — Minimal text-only links with dividers
- **Terminal** — Terminal-style with command prompts and monospace
- **Grid** — Two-column grid of icon tiles
- **Featured** — Large featured link on top, then stacked links

Adding a new layout is a single component in `src/layouts/LayoutRenderer.tsx` and an entry in `src/layouts/index.ts`.

## Local Editor

The profile editor at `/editor` runs entirely in the browser. It does not upload or store profile data on a server.

Features:
- Edit all profile fields with a live preview
- Switch between all 15 themes and 6 layouts
- Add, remove, and reorder links
- Import JSON (paste or upload a file)
- Export JSON as a downloadable file
- Real-time validation with error feedback

This is an important part of dotlnk's privacy-first philosophy — your data never leaves your browser.

## QR Sharing

Every profile page includes a share button that opens a themed modal containing:
- The profile URL
- A QR code pointing to the profile
- A copy URL button
- A download QR button (PNG)
- Native Web Share API support on mobile browsers (falls back to copy)

QR generation happens entirely client-side using the `qrcode` library.

## Profile Validation

dotlnk validates all profile data client-side using a schema-based approach. If a profile JSON is invalid, the app shows a polished error state instead of crashing. Validation errors are logged to the console for debugging but never shown as raw stack traces to users.

Validated fields include: username format, required fields, theme IDs, layout IDs, social keys, link URLs, and icon names.

## Create Your Own

### Clone and customize

```bash
git clone https://github.com/shuva-kharel/dotlnk.git
cd dotlnk
npm install
npm run dev
```

Customize themes, layouts, branding, colors, fonts, components, and features. The entire codebase is yours to modify. Deploy to any static host.

Clone → Customize → Deploy

### Submit a profile

1. Open `/data/template.json`
2. Copy the template
3. Fill in your information
4. Save it as `username.json`
5. Email it to **admin@shuvakharel.com.np**
6. The administrator manually reviews and adds the profile

Do NOT expect automatic publishing — profiles are added manually.

Once approved, your profile will be available at `https://lnk.shuvakharel.com.np/username`.

## Profile Submission

**Template:** `/data/template.json`

**Submission email:** admin@shuvakharel.com.np

## Project Structure

```
dotlnk/
├── public/
│   └── data/
│       ├── template.json
│       ├── shuva.json
│       ├── alex.json
│       ├── maya.json
│       └── dev.json
├── src/
│   ├── components/
│   │   ├── BackgroundEffects.tsx
│   │   ├── LinkCard.tsx
│   │   ├── Profile.tsx
│   │   ├── ProfileError.tsx
│   │   ├── ProfileSkeleton.tsx
│   │   ├── ShareModal.tsx
│   │   ├── SocialIcons.tsx
│   │   ├── ThemePreview.tsx
│   │   └── ThemeSelector.tsx
│   ├── layouts/
│   │   ├── index.ts
│   │   └── LayoutRenderer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Editor.tsx
│   │   └── ProfilePage.tsx
│   ├── themes/
│   │   ├── definitions.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── profile.ts
│   │   └── theme.ts
│   ├── utils/
│   │   ├── iconMap.ts
│   │   ├── loadProfile.ts
│   │   ├── router.ts
│   │   ├── useReducedMotion.ts
│   │   └── validateProfile.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production build outputs a fully static bundle in `dist/`.

To run the type checker:

```bash
npm run typecheck
```

## Deployment

dotlnk is designed to work with any static hosting platform:

- **Cloudflare Pages** — connect the repo and deploy
- **Vercel** — zero-config deployment with `npm run build`
- **Netlify** — drag-and-drop the `dist/` folder or connect the repo
- **GitHub Pages** — serve the built `dist/` directory

The build output is a fully static bundle in `dist/` — no server runtime required.

## Privacy Philosophy

dotlnk is built privacy-first:

- No analytics or tracking scripts
- No cookies unless strictly necessary
- No account or login required
- The local editor does not send data to any server
- Profile data is static JSON served as-is

Your profile shouldn't need a database.

## GitHub

Official repository: https://github.com/shuva-kharel/dotlnk

Public profile domain: https://lnk.shuvakharel.com.np

Example profile: https://lnk.shuvakharel.com.np/shuva

## SEO / Social Sharing

dotlnk is a static SPA. Global Open Graph and Twitter metadata are set in `index.html`. Per-profile dynamic OG tags are not supported without a backend — this is a known limitation of the static-first architecture. The global metadata accurately describes the project.

## License

License information will be added soon.
