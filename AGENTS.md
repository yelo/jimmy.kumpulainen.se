
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
- **Pull Requests:** Ensure all pull requests reference relevant issues and provide a clear description of changes. All pull requests, especially those from AI assistants, must include the original task and the thought process behind the solution in the "Task and Thought Process" section.

Refer to [Conventional Commits](https://www.conventionalcommits.org/) for details and examples.

---

## Agents & Automation

This section lists the agents, bots, and automated systems involved in the development, deployment, or operation of this project.

### AI Assistants & LLMs

- **Role:** AI coding assistants and language models
- **Purpose:** Assist with code generation, suggestions, documentation, debugging, and general development tasks
- **Usage:** Various AI tools including GitHub Copilot, Claude, ChatGPT, Gemini CLI, and other LLMs integrated across different development environments and workflows

### CI/CD Agents (if applicable)

	- **Role:** Automate build, test, and deployment processes
	- **Purpose:** Ensure code quality and automate deployment
	- **Usage:** Configured via GitHub Actions (detected and actively used in this repository for release management, build, and deployment workflows)

### Other Agents

- No other agents or bots detected in this project as of August 2025

---

*Update this file as new agents, standards, or automation tools are added to the project.*
