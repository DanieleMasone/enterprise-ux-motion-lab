import { useEffect, useState, type ReactNode } from "react";
import { getStoredTheme, persistTheme, type ThemeMode } from "../app/app-state";
import { ResourceNavigation, SegmentedControl, type ResourcePage } from "../ui";

export interface GuideSection {
  id: string;
  title: string;
}

export interface DocumentationLayoutProps {
  current: Extract<ResourcePage, "user-guide" | "engineering">;
  description: string;
  eyebrow: string;
  sections: GuideSection[];
  title: string;
  children: ReactNode;
}

/**
 * Shared accessible shell for the authored HTML guides published with the app.
 */
export function DocumentationLayout({
  current,
  description,
  eyebrow,
  sections,
  title,
  children
}: DocumentationLayoutProps) {
  const [theme, setTheme] = useState<ThemeMode>(() => getStoredTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    persistTheme(theme);
  }, [theme]);

  return (
    <div className="documentation-shell">
      <a className="skip-link" href="#guide-content">
        Skip to guide content
      </a>

      <header className="documentation-header">
        <div className="documentation-header__top">
          <div className="documentation-brand">
            <a href={import.meta.env.BASE_URL}>Enterprise UX Motion Lab</a>
            <span>Risk operations documentation</span>
          </div>
          <SegmentedControl
            ariaLabel="Documentation theme"
            onChange={setTheme}
            options={[
              { label: "Light", value: "light" },
              { label: "Dark", value: "dark" }
            ]}
            value={theme}
          />
        </div>
        <ResourceNavigation current={current} />
      </header>

      <div className="documentation-layout">
        <aside className="documentation-toc">
          <nav aria-label={`${title} sections`}>
            <strong>On this page</strong>
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <main className="documentation-main" id="guide-content" tabIndex={-1}>
          <header className="documentation-intro">
            <p>{eyebrow}</p>
            <h1>{title}</h1>
            <span>{description}</span>
          </header>
          {children}
        </main>
      </div>

      <footer className="documentation-footer">
        <span>Authored documentation ships with the same static build as the dashboard.</span>
        <a href={import.meta.env.BASE_URL}>Return to dashboard</a>
      </footer>
    </div>
  );
}
