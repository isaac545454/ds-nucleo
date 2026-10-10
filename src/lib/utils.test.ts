import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("joins plain class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("drops falsy values", () => {
    expect(cn("px-2", false, undefined, null, "py-1")).toBe("px-2 py-1");
  });

  it("resolves conditional objects and arrays", () => {
    expect(cn(["px-2", { "py-1": true, "py-4": false }])).toBe("px-2 py-1");
  });

  it("lets the last conflicting tailwind class win", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("keeps non-conflicting tailwind classes", () => {
    expect(cn("bg-primary text-sm", "bg-destructive")).toBe(
      "text-sm bg-destructive"
    );
  });
});
