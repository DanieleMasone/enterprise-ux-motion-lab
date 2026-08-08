# Enterprise UX Motion Lab

[![CI and GitHub Pages](https://github.com/DanieleMasone/Enterprise-UX-Motion-Lab/actions/workflows/pages.yml/badge.svg)](https://github.com/DanieleMasone/Enterprise-UX-Motion-Lab/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-18201d)](LICENSE)

A production-grade React and TypeScript portfolio project for functional UX micro-interactions in dense enterprise interfaces.

The application models an internal risk operations dashboard. Motion clarifies state change, progressive disclosure, feedback, and loading without reducing information density or turning the product into an animation showcase.

## Project Resources

- [Live dashboard](https://danielemasone.github.io/enterprise-ux-motion-lab/)
- [User Guide](https://danielemasone.github.io/enterprise-ux-motion-lab/user-guide/)
- [Engineering Guide](https://danielemasone.github.io/enterprise-ux-motion-lab/engineering/)
- [TypeDoc API reference](https://danielemasone.github.io/enterprise-ux-motion-lab/docs/)
- [Coverage report](https://danielemasone.github.io/enterprise-ux-motion-lab/coverage/)
- [CI workflow](https://github.com/DanieleMasone/Enterprise-UX-Motion-Lab/actions/workflows/pages.yml)
- [Accessibility checklist](project-docs/accessibility-checklist.md)

## Product Overview

The dashboard supports KPI scanning, governed risk filters, a dense horizontally scrollable data grid, progressive detail disclosure, keyboard commands, persisted theme and density preferences, and explicit loading, empty, and degraded states.

The User Guide documents the operating workflow. The Engineering Guide owns architecture, design-system, motion, testing, coverage, documentation, performance, and delivery decisions.

## Architecture Summary

- `src/app/`: application shell and app-wide preference state
- `src/features/`: dashboard, command palette, and data-state behavior
- `src/ui/`: reusable controls and project-resource navigation
- `src/motion/`: governed motion tokens, semantic transitions, and reduced-motion policy
- `src/docs/`: authored User Guide and Engineering Guide pages
- `src/styles/`: shared tokens and isolated UI, application, and documentation layouts

Vite builds the dashboard and both guides as static HTML entry points. TypeDoc and coverage remain generated outputs, and `scripts/prepare-pages.mjs` assembles everything into one GitHub Pages artifact.

## Quality Gates

```bash
npm ci
npm run typecheck
npm run test
npm run test:coverage
npm run build
npm run docs
npm run test:e2e
npm run pages:build
```

Generated application, documentation, coverage, Pages, and Playwright output stays outside source control.

## Local Development

```bash
npm ci
npm run dev
```

Useful focused commands:

```bash
npm run test:e2e:ui
npm run build:stats
npm run pages:build
```

## License

Released under the MIT License. See [LICENSE](LICENSE).

Copyright (c) 2026 Daniele Masone.
