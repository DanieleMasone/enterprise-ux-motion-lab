import { useEffect, useState } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the operating-system reduced-motion preference for app-level policy.
 */
export function useReducedMotionPreference(): boolean {
  const getInitial = () =>
    typeof window !== "undefined" &&
    "matchMedia" in window &&
    window.matchMedia(reducedMotionQuery).matches;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitial);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) {
      return undefined;
    }

    const media = window.matchMedia(reducedMotionQuery);
    const handleChange = () => setPrefersReducedMotion(media.matches);

    handleChange();
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}
