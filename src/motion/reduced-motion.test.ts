import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useReducedMotionPreference } from "./reduced-motion";
import { getTransition } from "./transitions";

describe("reduced motion policy", () => {
  it("tracks system preference changes and removes its listener", () => {
    let matches = false;
    let listener: (() => void) | undefined;
    const removeEventListener = vi.fn();

    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      get matches() {
        return matches;
      },
      media: query,
      onchange: null,
      addEventListener: vi.fn((_event, callback) => {
        listener = callback as () => void;
      }),
      removeEventListener,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));

    const { result, unmount } = renderHook(() => useReducedMotionPreference());

    expect(result.current).toBe(false);

    act(() => {
      matches = true;
      listener?.();
    });

    expect(result.current).toBe(true);

    unmount();
    expect(removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("collapses transition duration when reduced motion is active", () => {
    expect(getTransition("panel", true)).toEqual({ duration: 0.01 });
    expect(getTransition("panel", false).duration).toBeGreaterThan(0.01);
  });
});
