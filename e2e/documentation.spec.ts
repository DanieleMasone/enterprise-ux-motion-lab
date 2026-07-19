import { expect, test } from "@playwright/test";

const guidePaths = ["user-guide", "engineering"];
const guideViewports = [1920, 1440, 1280, 1024, 768, 430, 390, 375, 360];

test.describe("published documentation", () => {
  test("links dashboard, guides, TypeDoc, and coverage with persisted theme", async ({ page }) => {
    await page.goto("./user-guide/");

    await expect(page.getByRole("heading", { name: "User Guide", level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "User guide" })).toHaveAttribute("aria-current", "page");
    await expect(page.getByRole("link", { name: "Dashboard", exact: true })).toHaveAttribute(
      "href",
      "/enterprise-ux-motion-lab/"
    );
    await expect(page.getByRole("link", { name: "API" })).toHaveAttribute(
      "href",
      "/enterprise-ux-motion-lab/docs/"
    );
    await expect(page.getByRole("link", { name: "Coverage" })).toHaveAttribute(
      "href",
      "/enterprise-ux-motion-lab/coverage/"
    );

    await page.getByRole("button", { name: "Dark" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.getByRole("link", { name: "Engineering" }).click();

    await expect(page).toHaveURL(/\/engineering\/$/);
    await expect(page.getByRole("heading", { name: "Engineering Guide", level: 1 })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.getByRole("link", { name: "Engineering" })).toHaveAttribute("aria-current", "page");
  });

  test("keeps both guides readable on desktop and mobile", async ({ page }) => {
    for (const path of guidePaths) {
      for (const width of guideViewports) {
        await page.setViewportSize({ width, height: width >= 768 ? 900 : 780 });
        await page.goto(`./${path}/`);

        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("navigation", { name: /sections/i })).toBeVisible();
        await expect(page.getByRole("navigation", { name: "Project resources" })).toBeVisible();

        const overflow = await page.evaluate(() => {
          const documentWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
          const main = document.querySelector<HTMLElement>(".documentation-main");

          return {
            documentOverflowX: documentWidth - window.innerWidth,
            mainRight: main?.getBoundingClientRect().right ?? 0
          };
        });

        expect(overflow.documentOverflowX, `${path} should not overflow at ${width}px`).toBeLessThanOrEqual(1);
        expect(overflow.mainRight, `${path} content should fit at ${width}px`).toBeLessThanOrEqual(width + 1);
      }
    }
  });
});
