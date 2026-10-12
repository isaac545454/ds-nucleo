import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Kbd } from "./kbd";

describe("Kbd", () => {
  it("renders the shortcut", () => {
    render(<Kbd>Ctrl</Kbd>);

    expect(screen.getByText("Ctrl").tagName).toBe("KBD");
  });

  it("uses the muted keyboard style", () => {
    render(<Kbd>K</Kbd>);

    expect(screen.getByText("K")).toHaveClass("bg-muted", "font-mono");
  });

  it("merges a custom className", () => {
    render(<Kbd className="ml-1">Esc</Kbd>);

    expect(screen.getByText("Esc")).toHaveClass("ml-1");
  });
});
