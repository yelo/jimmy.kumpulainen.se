# ~/.jimp

[![Release Please](https://github.com/yelo/jimmy.kumpulainen.se/actions/workflows/release-please.yml/badge.svg)](https://github.com/yelo/jimmy.kumpulainen.se/actions/workflows/release-please.yml)
[![CodeQL](https://github.com/yelo/jimmy.kumpulainen.se/actions/workflows/codeql.yml/badge.svg)](https://github.com/yelo/jimmy.kumpulainen.se/actions/workflows/codeql.yml)
[![Deployment Status](https://img.shields.io/github/deployments/yelo/jimmy.kumpulainen.se/production?label=deployment&logo=azure)](https://github.com/yelo/jimmy.kumpulainen.se/deployments)

Personal site for Jimmy Kumpulainen — rendered as a clean terminal buffer in your browser. No flash, no fluff. Just a `resume.txt` file, open in a text editor.

## Look & Feel

Inspired by vim `:help` pages and emacs buffers. The page renders as a single monospaced text file with a status bar pinned to the bottom of the viewport. Gruvbox-inspired 256-color palette throughout — warm dark background, amber section headers, and restrained use of color for emphasis.

## Features

- **Vim/emacs-style layout:** Section headers with `│` leads, tagline underlines, and a `[No Name]` buffer footer.
- **Status bar:** Live UTC clock in the bottom status line.
- **Monospace font stack:** Courier New, Menlo, Consolas, and classic fallbacks.
- **Content from `profile.md`:** The site's text is derived from the single-source-of-truth profile at the repo root.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
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
