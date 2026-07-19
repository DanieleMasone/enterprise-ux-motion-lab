import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DocumentationLayout } from "./DocumentationLayout";

describe("DocumentationLayout", () => {
  it("exposes guide navigation and persists the shared theme preference", async () => {
    const user = userEvent.setup();

    render(
      <DocumentationLayout
        current="user-guide"
        description="Use the risk operations surface."
        eyebrow="Product workflow"
        sections={[{ id: "overview", title: "Overview" }]}
        title="User Guide"
      >
        <section id="overview">
          <h2>Overview</h2>
        </section>
      </DocumentationLayout>
    );

    expect(screen.getByRole("link", { name: "User guide" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("navigation", { name: "User Guide sections" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skip to guide content" })).toHaveAttribute("href", "#guide-content");

    await user.click(screen.getByRole("button", { name: "Dark" }));

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(window.localStorage.getItem("enterprise-ux-motion-lab:theme")).toBe("dark");
  });
});
