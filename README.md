# dotlnk

Your identity, configured.

dotlnk is a lightweight, open source, static first link in bio and profile platform powered by JSON. No database, no API server, no authentication backend. Just data, a fast frontend, a theme engine, multiple layouts, a local profile editor, and QR sharing.

## Features

- JSON powered profiles: every profile is a single static JSON file
- Static first architecture, no traditional backend required
- 15 visual themes, each with its own colors, typography, backgrounds, and animations
- 6 profile layouts: Classic, Cards, Compact, Terminal, Grid, and Featured
- Local profile editor at `/editor`, runs entirely in the browser, no login or server needed
- JSON import and export, including downloadable profile files
- QR code sharing for every profile, with native Web Share API support
- Client side profile validation with polished error states
- Responsive, mobile first design
- Self hosting, clone and deploy your own instance in minutes
- Privacy first: no analytics, no tracking, no cookies, no account required
- Lightweight deployment on Cloudflare Pages, Vercel, Netlify, or GitHub Pages

## How It Works

A URL such as `https://lnk.shuvakharel.com.np/shuva` loads the profile stored at `/data/shuva.json`.

The frontend reads the username from the URL, fetches the matching JSON file, validates it against the profile schema, loads the selected theme and layout, and renders the profile. No application backend is required; everything happens client side.

## Profile JSON

```json
{
  "username": "shuva",
  "name": "Shuva Kharel",
  "bio": "Cybersecurity, Linux, Programming",
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
| `username` | string | yes | The profile username, becomes the URL path |
| `name` | string | yes | Display name |
| `bio` | string | yes | Short bio or tagline |
| `avatar` | string | yes | Avatar image URL |
| `location` | string | no | Optional location text |
| `verified` | boolean | no | Shows a verified badge |
| `theme` | string | no | Theme ID, e.g. `midnight`, `cyberpunk` |
| `layout` | string | no | Layout ID: `classic`, `cards`, `compact`, `terminal`, `grid`, `featured` |
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

dotlnk ships with 15 visual themes. Adding a new one is a single definition in `src/themes/definitions.ts`.

Midnight, Aurora, Cyberpunk, Terminal, Ocean, Sunset, Minimal, Paper, Glass, AMOLED, Forest, Retro, Synthwave, Sakura, and Matrix. Each has its own color palette, typography, and background treatment, ranging from clean minimal surfaces to neon and terminal aesthetics.

## Layouts

Layouts control the structure of a profile, independent of the theme. Set the `layout` field in the profile JSON to choose one:

- Classic: centered avatar, name, bio, and stacked link cards
- Cards: links displayed as a grid of compact cards
- Compact: minimal text only links with dividers
- Terminal: terminal style layout with command prompts and monospace text
- Grid: two column grid of icon tiles
- Featured: a large featured link on top, then stacked links

Adding a new layout is a single component in `src/layouts/LayoutRenderer.tsx` plus an entry in `src/layouts/index.ts`.

## Local Editor

The profile editor at `/editor` runs entirely in the browser and never uploads or stores profile data on a server. It supports live preview, switching between all themes and layouts, adding and reordering links, importing JSON, exporting JSON, and real time validation.

This is central to dotlnk's privacy philosophy: your data never leaves your browser.

## QR Sharing

Every profile page includes a share button that opens a themed modal with the profile URL, a QR code, a copy URL button, a download QR button, and native Web Share API support on mobile browsers, falling back to copy on desktop. QR generation happens entirely client side using the `qrcode` library.

## Profile Validation

dotlnk validates all profile data client side using a schema based approach. Invalid JSON produces a polished error state instead of a crash. Validation errors are logged to the console for debugging but never shown as raw stack traces. Validated fields include username format, required fields, theme IDs, layout IDs, social keys, link URLs, and icon names.

## Create Your Own

### Clone and customize

```bash
git clone https://github.com/shuva-kharel/dotlnk.git
cd dotlnk
npm install
npm run dev
```

The entire codebase is yours to modify: themes, layouts, branding, colors, fonts, and components. Deploy to any static host.

### Submit a profile

1. Open `public/data/template.json`
2. Copy the template
3. Fill in your information
4. Save it as `username.json`
5. Email it to admin@shuvakharel.com.np

Profiles are reviewed and added manually, so automatic publishing should not be expected. Once approved, your profile will be live at `https://lnk.shuvakharel.com.np/username`.

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

dotlnk works with any static hosting platform, including Cloudflare Pages, Vercel, Netlify, and GitHub Pages. The build output in `dist/` is fully static and needs no server runtime.

## Privacy Philosophy

dotlnk is built privacy first: no analytics or tracking scripts, no cookies unless strictly necessary, no account or login required, and the local editor never sends data to a server. Profile data is static JSON served as is.

Your profile shouldn't need a database.

## Links

Repository: https://github.com/shuva-kharel/dotlnk

Public profile domain: https://lnk.shuvakharel.com.np

Example profile: https://lnk.shuvakharel.com.np/shuva

## SEO and Social Sharing

dotlnk is a static single page app. Global Open Graph and Twitter metadata are set in `index.html`. Per profile dynamic OG tags are not supported without a backend, which is a known limitation of the static first architecture.

## License

License information will be added soon.
