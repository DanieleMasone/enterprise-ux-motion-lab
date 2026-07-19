import { DocumentationLayout, type GuideSection } from "./DocumentationLayout";

const sections: GuideSection[] = [
  { id: "architecture", title: "Architecture" },
  { id: "design-system", title: "Design system" },
  { id: "motion", title: "Motion system" },
  { id: "accessibility", title: "Accessibility strategy" },
  { id: "testing", title: "Testing and coverage" },
  { id: "documentation", title: "Documentation strategy" },
  { id: "delivery", title: "CI and Pages" },
  { id: "dependencies-and-trade-offs", title: "Dependencies and trade-offs" }
];

const basePath = import.meta.env.BASE_URL;

export function EngineeringGuide() {
  return (
    <DocumentationLayout
      current="engineering"
      description="Architecture and delivery decisions behind a dense enterprise interface with governed functional motion."
      eyebrow="Technical reference"
      sections={sections}
      title="Engineering Guide"
    >
      <section className="documentation-section" id="architecture">
        <h2>Architecture</h2>
        <p>
          The application is a static React surface with feature-based ownership. App-wide orchestration stays in
          <code> src/app/</code>; domain records in <code>src/data/</code>; reusable primitives in <code>src/ui/</code>;
          and feature behavior under <code>src/features/</code>.
        </p>
        <pre aria-label="Source directory structure"><code>{`src/
  app/                 global shell and preference state
  data/                domain records and models
  docs/                authored HTML guide pages
  features/            dashboard, command palette, resilience copy
  motion/              tokens, transitions, reduced-motion policy
  styles/              design tokens, shared UI, app and guide layouts
  test/                shared Vitest setup
  ui/                  reusable controls and resource navigation`}</code></pre>
        <p>
          Routing and global state libraries are intentionally absent: three static Vite entry points and local React state
          cover the current product and documentation workflows without adding runtime infrastructure.
        </p>
      </section>

      <section className="documentation-section" id="design-system">
        <h2>Design system</h2>
        <p>
          <code>base.css</code> owns color, typography, spacing, radius, elevation, layout, and control tokens.
          <code>ui.css</code> owns reusable button, segmented-control, and resource-navigation styles. App and guide layouts
          remain separate because they solve different information structures.
        </p>
        <ul>
          <li>Shared React primitives stay small and semantic.</li>
          <li>Feature-specific table, filter, and palette rules remain with the application stylesheet.</li>
          <li>The authored guides reuse theme tokens and controls without importing dashboard-only layout CSS.</li>
        </ul>
      </section>

      <section className="documentation-section" id="motion">
        <h2>Motion system</h2>
        <p>
          Durations, easing curves, distances, stagger, and press scale are governed by <code>motion.tokens.ts</code>.
          Components request semantic transitions such as feedback, panel, overlay, or list from
          <code> transitions.ts</code>.
        </p>
        <div className="documentation-note">
          Motion is accepted only when it clarifies state change, feedback, orientation, progressive disclosure, or perceived
          loading. Reduced motion collapses movement without suppressing the underlying state transition.
        </div>
      </section>

      <section className="documentation-section" id="accessibility">
        <h2>Accessibility strategy</h2>
        <p>
          The product favors native controls, visible focus, named control groups, semantic table structure, dialog focus
          containment and restoration, live status regions, and explicit expanded/selected state. The source-controlled
          accessibility checklist is updated when interaction behavior changes.
        </p>
      </section>

      <section className="documentation-section" id="testing">
        <h2>Testing and coverage</h2>
        <dl className="documentation-definition-grid">
          <div>
            <dt>Unit tests</dt>
            <dd>Pure filters, state transitions, command matching, and reduced-motion policy.</dd>
          </div>
          <div>
            <dt>Component tests</dt>
            <dd>Visible interactions, persistence, semantics, resilient states, details, and documentation theme behavior.</dd>
          </div>
          <div>
            <dt>Playwright</dt>
            <dd>Chromium-only critical flows, direct guide URLs, navigation, theme persistence, and responsive overflow.</dd>
          </div>
          <div>
            <dt>Coverage</dt>
            <dd>Vitest V8 emits text, HTML, and LCOV reports without targeting arbitrary 100% coverage.</dd>
          </div>
        </dl>
        <p>
          The published <a href={`${basePath}coverage/`}>coverage report</a> is generated during CI and copied into the same
          Pages artifact.
        </p>
      </section>

      <section className="documentation-section" id="documentation">
        <h2>Documentation strategy</h2>
        <p>
          The README is the repository entry point. This guide owns architecture and delivery rationale; the User Guide owns
          product workflows. TypeDoc remains the generated API reference for public TypeScript contracts and avoids narrative
          duplication.
        </p>
        <p>
          Browse the generated <a href={`${basePath}docs/`}>TypeDoc API documentation</a> for component props, domain models,
          motion helpers, and exported utilities.
        </p>
      </section>

      <section className="documentation-section" id="delivery">
        <h2>CI and Pages</h2>
        <ol>
          <li>Install dependencies deterministically with <code>npm ci</code>.</li>
          <li>Run typecheck, unit tests, coverage, the multi-page production build, and TypeDoc.</li>
          <li>Install Chromium only for focused Playwright E2E tests.</li>
          <li>Assemble dashboard, guides, coverage, TypeDoc, and <code>.nojekyll</code> into <code>pages-dist/</code>.</li>
          <li>Upload and deploy only outside pull requests.</li>
        </ol>
        <p>
          The authored guides are Vite build entries at <code>/user-guide/</code> and <code>/engineering/</code>. TypeDoc stays
          at <code>/docs/</code>, and coverage stays at <code>/coverage/</code>.
        </p>
      </section>

      <section className="documentation-section" id="dependencies-and-trade-offs">
        <h2>Dependencies, trade-offs, and performance</h2>
        <ul>
          <li>React, Vite, TypeScript, and Motion are the runtime/build foundation; no UI or state framework is required.</li>
          <li>Static domain data keeps the portfolio scope on frontend architecture rather than backend integration.</li>
          <li>Plain CSS keeps token ownership and responsive behavior directly auditable.</li>
          <li>Chromium-only E2E coverage preserves CI speed while exercising the critical integrated workflows.</li>
        </ul>
        <p>
          Production output is measured with Vite and <code>npm run build:stats</code>. The multi-page build shares React and
          authored-guide infrastructure across entries; bundle measurements should be refreshed whenever source or guide
          architecture changes.
        </p>
        <p>
          The current Vite build reports approximately <strong>338.23 kB</strong> of dashboard JavaScript
          (<strong>108.33 kB</strong> gzip) and <strong>15.89 kB</strong> of dashboard CSS
          (<strong>3.96 kB</strong> gzip), including shared UI assets.
        </p>
      </section>
    </DocumentationLayout>
  );
}
