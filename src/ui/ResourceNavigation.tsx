export type ResourcePage = "dashboard" | "user-guide" | "engineering" | "api" | "coverage";

export interface ResourceNavigationProps {
  current: ResourcePage;
}

const basePath = import.meta.env.BASE_URL;
const resources: Array<{ id: ResourcePage; label: string; href: string }> = [
  { id: "dashboard", label: "Dashboard", href: basePath },
  { id: "user-guide", label: "User guide", href: `${basePath}user-guide/` },
  { id: "engineering", label: "Engineering", href: `${basePath}engineering/` },
  { id: "api", label: "API", href: `${basePath}docs/` },
  { id: "coverage", label: "Coverage", href: `${basePath}coverage/` }
];

/**
 * Shared navigation for the live application and published project resources.
 */
export function ResourceNavigation({ current }: ResourceNavigationProps) {
  return (
    <nav aria-label="Project resources" className="resource-navigation">
      {resources.map((resource) => (
        <a aria-current={resource.id === current ? "page" : undefined} href={resource.href} key={resource.id}>
          {resource.label}
        </a>
      ))}
    </nav>
  );
}
