# ~/.jimp

[![Release Please](https://github.com/yelo/jimmy.kumpulainen.se/actions/workflows/release-please.yml/badge.svg)](https://github.com/yelo/jimmy.kumpulainen.se/actions/workflows/release-please.yml)
[![CodeQL](https://github.com/yelo/jimmy.kumpulainen.se/actions/workflows/codeql.yml/badge.svg)](https://github.com/yelo/jimmy.kumpulainen.se/actions/workflows/codeql.yml)
[![Deployment Status](https://img.shields.io/github/deployments/yelo/jimmy.kumpulainen.se/production?label=deployment&logo=azure)](https://github.com/yelo/jimmy.kumpulainen.se/deployments)

Personal site for Jimmy Kumpulainen — rendered as a clean terminal buffer in your browser. No flash, no fluff. Just a `profile.org` file, open in a text editor like Emacs.

## Look & Feel

Inspired by Emacs org-mode and vim `:help` pages. The page renders as an org-mode buffer with semantic heading hierarchy, collapsible sections, and a full Emacs-style modeline pinned to the bottom. Gruvbox-inspired 256-color palette throughout — warm dark background, red/orange section headers with org hierarchy coloring, and tags styled as org properties.

## Features

- **Emacs org-mode aesthetic:** Org-mode heading hierarchy with visual distinction (*, **, ***, etc.), collapsible sections with folding support
- **Full Emacs modeline:** Live position tracking (line/column), file encoding (utf-8), major mode (Org), percentage through buffer, and system clock
- **Light & Dark themes:** Toggle between light (Gruvbox light) and dark (Gruvbox dark) themes; respects system color scheme preference and persists user choice
- **Theme switcher:** Convenient theme toggle button (🌙/☀️) in the modeline footer that syncs with system-wide theme changes
- **Org-mode elements:** Tags styled as property tags, proper heading hierarchy with color distinction
- **Collapsible sections:** Toggle org-mode style folding (▼/▶ indicators) with vanilla JS
- **Status indicators:** Buffer status including file mode and encoding
- **Monospace font stack:** Iosevka Web with Courier New, Menlo, Consolas fallbacks.
- **Content from `profile.md`:** The site's text is derived from the single-source-of-truth profile at the repo root.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (org-mode semantic structure) |
| Styling | CSS3 (custom properties, no preprocessors) |
| Scripting | Vanilla JavaScript (no frameworks or libraries) |
| Deployment | Azure Static Web Apps via GitHub Actions |
| CI/CD | Release Please, build-and-minify pipeline |

No frameworks, no build tools, no npm. Just plain files.

## Local Development

```bash
git clone https://github.com/yelo/jimmy.kumpulainen.se.git
cd jimmy.kumpulainen.se

# Open src/index.html in your browser, or serve locally:
python3 -m http.server 8080 --directory src
```

## Deployment

Pushes to `main` trigger `release-please`, which creates a release PR. On merge, the release tag triggers a build-and-deploy workflow that copies `src/*` into a `/build` directory, minifies all HTML, CSS, and JS with `minify`, and deploys to Azure Static Web Apps.

---

**Live Site:** [jimmy.kumpulainen.se](https://jimmy.kumpulainen.se)
