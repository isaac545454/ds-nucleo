import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Slider } from "./slider";

describe("Slider", () => {
  it("exposes a single thumb with the default bounds", () => {
    render(<Slider defaultValue={[40]} aria-label="Volume" />);

    const thumb = screen.getByRole("slider", { name: "Volume" });
    expect(thumb).toHaveAttribute("aria-valuenow", "40");
    expect(thumb).toHaveAttribute("aria-valuemin", "0");
    expect(thumb).toHaveAttribute("aria-valuemax", "100");
  });

  it("renders one thumb per value in a range", () => {
    render(<Slider defaultValue={[20, 80]} aria-label="Faixa" />);

    const thumbs = screen.getAllByRole("slider");
    expect(thumbs).toHaveLength(2);
    expect(thumbs[0]).toHaveAttribute("aria-valuenow", "20");
    expect(thumbs[1]).toHaveAttribute("aria-valuenow", "80");
  });

  it("steps the value with the keyboard", async () => {
    const onValueChange = vi.fn();
    render(
      <Slider
        defaultValue={[40]}
        step={10}
        aria-label="Volume"
        onValueChange={onValueChange}
      />
    );

    screen.getByRole("slider").focus();
    await userEvent.keyboard("{ArrowRight}");

    expect(onValueChange).toHaveBeenCalledWith([50]);
  });

  it("does not change while disabled", async () => {
    const onValueChange = vi.fn();
    render(
      <Slider
        defaultValue={[40]}
        disabled
        aria-label="Volume"
        onValueChange={onValueChange}
      />
    );

    const thumb = screen.getByRole("slider");
    expect(thumb).toHaveAttribute("data-disabled");

    thumb.focus();
    await userEvent.keyboard("{ArrowRight}");

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("merges a custom className on the root", () => {
    const { container } = render(
      <Slider defaultValue={[10]} className="w-64" aria-label="Volume" />
    );

    expect(container.firstChild).toHaveClass("w-64");
  });

  it("marks a vertical orientation", () => {
    const { container } = render(
      <Slider
        defaultValue={[30]}
        orientation="vertical"
        aria-label="Volume"
      />
    );

    expect(container.firstChild).toHaveAttribute(
      "data-orientation",
      "vertical"
    );
  });
});
