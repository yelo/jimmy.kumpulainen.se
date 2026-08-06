# ~/.jimp

[![Release Please](https://github.com/yelo/jimmy.kumpulainen.se/actions/workflows/release-please.yml/badge.svg)](https://github.com/yelo/jimmy.kumpulainen.se/actions/workflows/release-please.yml)
[![CodeQL](https://github.com/yelo/jimmy.kumpulainen.se/actions/workflows/codeql.yml/badge.svg)](https://github.com/yelo/jimmy.kumpulainen.se/actions/workflows/codeql.yml)
[![Deployment Status](https://img.shields.io/github/deployments/yelo/jimmy.kumpulainen.se/production?label=deployment&logo=azure)](https://github.com/yelo/jimmy.kumpulainen.se/deployments)

Personal site for Jimmy Kumpulainen — rendered as a clean terminal buffer in your browser. No flash, no fluff. Just a `profile.md` file, open in a text editor like Emacs.

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

## Allowed Technologies

Only standard HTML5, CSS, and vanilla JavaScript are permitted for this project.

- **HTML:** Semantic HTML5 elements and best practices
- **CSS:** Standard CSS styling only — no preprocessors or frameworks
- **JavaScript:** Vanilla JavaScript only — no external libraries or frameworks

Any non-standard technologies or third-party libraries must be discussed and approved before implementation.

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

## Way of Working: Branches & Pull Requests

All branches and commit messages follow the [Conventional Commit](https://www.conventionalcommits.org/) standard.

- **Branch Naming:** Use prefixes (`feat/`, `fix/`, `chore/`, etc.) followed by a short description (e.g., `feat/dark-mode`)
- **Commit Messages:** Follow Conventional Commit guidelines (e.g., `feat: add dark mode toggle`)
- **Pull Requests:** Must reference relevant issues and include a clear description. AI-generated PRs must include a "Task and Thought Process" section
- **Direct Commits:** All changes must be made in a feature/fix/chore branch and submitted as a pull request. Direct commits to `main` are **not allowed**

For complex PR bodies, use a temporary `pr_body.md` file (add to `.gitignore`) and create with `gh pr create --body-file pr_body.md`.

## Documentation Standards

- **README.md:** The single source of truth for project status, features, and setup. Must be kept meticulously up-to-date
- **profile.md:** Professional profile containing about section, contact details, work history, and skills. Keep updated with professional information changes
- **AI Responsibility:** AI assistants are explicitly responsible for updating documentation to reflect codebase, dependency, or deployment process changes

## Agents & Automation

### AI Assistants & LLMs
- Assist with code generation, suggestions, documentation, debugging, and development tasks
- Integrated across development environments and workflows

### CI/CD (GitHub Actions)
- Automate build, test, and deployment processes
- Active workflows: Release Please, CodeQL, build-and-minify, and deployment to Azure Static Web Apps
- Ensure code quality and automate deployment

---

**Live Site:** [jimmy.kumpulainen.se](https://jimmy.kumpulainen.se)
