
# AGENTS.md

## Overview

This document describes the standards, agents, and automation tools used in this project, as well as the way of working for branches and pull requests.

---

## Allowed Technologies

Only standard HTML5, CSS, and vanilla JavaScript are permitted for this project.

- **HTML:** Use semantic HTML5 elements and best practices.
- **CSS:** Use standard CSS for styling. No preprocessors or frameworks.
- **JavaScript:** Use vanilla JavaScript only. Do not use external libraries or frameworks.

Any use of non-standard technologies or third-party libraries must be discussed and approved before implementation.

---

## Way of Working: Branches & Pull Requests

All branches and commit messages must follow the Conventional Commit standard.

- **Branch Naming:** Use prefixes such as `feat/`, `fix/`, `chore/`, etc., followed by a short description (e.g., `feat/login-form`).
- **Commit Messages:** Structure commit messages according to Conventional Commit guidelines (e.g., `feat: add login form`).
- **Pull Requests:** Ensure all pull requests reference relevant issues and provide a clear description of changes.

Refer to [Conventional Commits](https://www.conventionalcommits.org/) for details and examples.

---

## Agents & Automation

This section lists the agents, bots, and automated systems involved in the development, deployment, or operation of this project.

### GitHub Copilot

- **Role:** AI coding assistant
- **Purpose:** Assists with code generation, suggestions, and documentation
- **Usage:** Integrated in VS Code for developer productivity

### CI/CD Agents (if applicable)

- **Role:** Automate build, test, and deployment processes
- **Purpose:** Ensure code quality and automate deployment
- **Usage:** Typically configured via GitHub Actions, Travis CI, or similar (not detected in this repo as of August 2025)

### Other Agents

- No other agents or bots detected in this project as of August 2025

---

*Update this file as new agents, standards, or automation tools are added to the project.*
