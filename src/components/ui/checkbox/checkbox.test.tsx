import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    render(<Checkbox aria-label="Aceitar termos" />);

    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("toggles on click and reports the new state", async () => {
    const onCheckedChange = vi.fn();
    render(
      <Checkbox aria-label="Aceitar termos" onCheckedChange={onCheckedChange} />
    );

    await userEvent.click(screen.getByRole("checkbox"));

    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("respects the controlled checked prop", () => {
    render(<Checkbox aria-label="Aceitar termos" checked onCheckedChange={() => {}} />);

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("does not toggle while disabled", async () => {
    const onCheckedChange = vi.fn();
    render(
      <Checkbox
        aria-label="Aceitar termos"
        disabled
        onCheckedChange={onCheckedChange}
      />
    );

    await userEvent.click(screen.getByRole("checkbox"));

    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("exposes the indeterminate state to assistive tech", () => {
    render(<Checkbox aria-label="Aceitar termos" checked="indeterminate" />);

    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-checked",
      "mixed"
    );
  });
});
