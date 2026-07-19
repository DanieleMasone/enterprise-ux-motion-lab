import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/base.css";
import "../styles/ui.css";
import "../styles/docs.css";

export function renderDocumentationPage(page: ReactNode) {
  const root = document.getElementById("root");

  if (!root) {
    throw new Error("Documentation root element is missing.");
  }

  createRoot(root).render(<StrictMode>{page}</StrictMode>);
}
