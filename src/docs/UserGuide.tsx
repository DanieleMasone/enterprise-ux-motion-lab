import { DocumentationLayout, type GuideSection } from "./DocumentationLayout";

const sections: GuideSection[] = [
  { id: "dashboard-overview", title: "Dashboard overview" },
  { id: "filters-and-queue", title: "Filters and risk queue" },
  { id: "investigation", title: "Investigation details" },
  { id: "commands-and-preferences", title: "Commands and preferences" },
  { id: "data-states", title: "Data states" },
  { id: "responsive-behavior", title: "Responsive behavior" },
  { id: "accessibility", title: "Accessibility" }
];

export function UserGuide() {
  return (
    <DocumentationLayout
      current="user-guide"
      description="A concise operating guide for scanning, filtering, and investigating risk signals without leaving the primary dashboard."
      eyebrow="Product workflow"
      sections={sections}
      title="User Guide"
    >
      <section className="documentation-section" id="dashboard-overview">
        <h2>Dashboard overview</h2>
        <p>
          The dashboard opens directly on the operational surface. The header contains display and data-state controls,
          followed by four KPI cards and the governed risk queue.
        </p>
        <dl className="documentation-definition-grid">
          <div>
            <dt>Open risk signals</dt>
            <dd>Current queue volume and the subset requiring owner action.</dd>
          </div>
          <div>
            <dt>Critical exposure</dt>
            <dd>Estimated financial exposure after active containment.</dd>
          </div>
          <div>
            <dt>Median SLA remaining</dt>
            <dd>Time available before the median signal breaches its response target.</dd>
          </div>
          <div>
            <dt>Automated decisions</dt>
            <dd>Share of signals resolved by governed automation rather than manual review.</dd>
          </div>
        </dl>
      </section>

      <section className="documentation-section" id="filters-and-queue">
        <h2>Filters and risk queue</h2>
        <p>
          Search matches signal IDs, services, owners, signal text, impact, and regions. Region and status selects narrow
          the queue further; severity buttons can be combined without allowing an accidental no-severity dead end.
        </p>
        <ul>
          <li>Use <strong>Clear filters</strong> to restore the governed default set.</li>
          <li>Read priority context from signal, severity, status, owner, confidence, SLA, and impact columns.</li>
          <li>On narrow screens, scroll the table horizontally; the signal column keeps compact region and recency context.</li>
        </ul>
      </section>

      <section className="documentation-section" id="investigation">
        <h2>Investigation details</h2>
        <p>
          Select <strong>View</strong> on a risk row to disclose root cause, recommended action, and audit context. Only one
          row is expanded at a time, keeping the analyst oriented inside the queue.
        </p>
        <div className="documentation-note">
          Expanded narrative content wraps inside the visible table shell on tablet and mobile, while dense columns remain
          horizontally scrollable.
        </div>
      </section>

      <section className="documentation-section" id="commands-and-preferences">
        <h2>Commands and preferences</h2>
        <p>
          The command palette provides keyboard-first access to theme, density, filters, data-state previews, and top-risk
          disclosure. Search the command list, then use Enter to execute the first match.
        </p>
        <div className="documentation-table-shell">
          <table>
            <caption>Dashboard keyboard shortcuts</caption>
            <thead>
              <tr>
                <th scope="col">Shortcut</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"><kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd></th>
                <td>Open the command palette.</td>
              </tr>
              <tr>
                <th scope="row"><kbd>Enter</kbd></th>
                <td>Run the first matching command from the search field.</td>
              </tr>
              <tr>
                <th scope="row"><kbd>Escape</kbd></th>
                <td>Close the palette and restore previous focus.</td>
              </tr>
              <tr>
                <th scope="row"><kbd>Tab</kbd></th>
                <td>Move through controls; focus remains contained while the palette is open.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Compact</strong> density prioritizes repeated scanning; <strong>Comfortable</strong> adds row space for
          slower review. Light and dark themes persist locally across reloads.
        </p>
      </section>

      <section className="documentation-section" id="data-states">
        <h2>Data states</h2>
        <dl className="documentation-definition-grid">
          <div>
            <dt>Loading</dt>
            <dd>Skeleton rows preserve queue geometry while verified signals refresh.</dd>
          </div>
          <div>
            <dt>Empty</dt>
            <dd>The queue explains whether no signals exist or filters removed every match.</dd>
          </div>
          <div>
            <dt>Degraded</dt>
            <dd>A status banner discloses ingestion delay while keeping verified records available.</dd>
          </div>
          <div>
            <dt>Live</dt>
            <dd>The complete deterministic sample is available for normal triage.</dd>
          </div>
        </dl>
      </section>

      <section className="documentation-section" id="responsive-behavior">
        <h2>Responsive behavior</h2>
        <p>
          Desktop layouts keep KPI cards and queue metadata available for fast side-by-side scanning. Tablet layouts move
          filters into two columns. Mobile layouts stack controls and KPI cards while retaining the table as a dense data
          grid with intentional horizontal scrolling.
        </p>
      </section>

      <section className="documentation-section" id="accessibility">
        <h2>Accessibility</h2>
        <ul>
          <li>Native buttons, inputs, and selects provide predictable keyboard behavior.</li>
          <li>Selected, expanded, status, meter, and dialog states expose semantic ARIA attributes.</li>
          <li>Focus remains visible in both themes, and the command palette restores focus when it closes.</li>
          <li>System reduced-motion preference collapses movement while preserving state feedback.</li>
        </ul>
      </section>
    </DocumentationLayout>
  );
}
