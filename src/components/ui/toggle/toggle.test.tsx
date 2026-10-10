import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Toggle, toggleVariants } from "./toggle";

describe("Toggle", () => {
  it("renders off by default", () => {
    render(<Toggle aria-label="Negrito">B</Toggle>);

    expect(screen.getByRole("button")).toHaveAttribute("data-state", "off");
  });

  it("turns on when clicked and reports the state", async () => {
    const onPressedChange = vi.fn();
    render(
      <Toggle aria-label="Negrito" onPressedChange={onPressedChange}>
        B
      </Toggle>
    );

    await userEvent.click(screen.getByRole("button"));

    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("button")).toHaveAttribute("data-state", "on");
  });

  it("respects the controlled pressed prop", () => {
    render(
      <Toggle aria-label="Negrito" pressed>
        B
      </Toggle>
    );

    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("applies variant and size classes", () => {
    render(
      <Toggle aria-label="Negrito" variant="outline" size="sm">
        B
      </Toggle>
    );

    expect(screen.getByRole("button")).toHaveClass("border", "h-8");
  });

  it("exposes toggleVariants for composition", () => {
    expect(toggleVariants({ size: "lg" })).toContain("h-10");
  });
});
