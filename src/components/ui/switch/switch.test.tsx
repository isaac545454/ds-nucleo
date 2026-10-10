import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Switch } from "./switch";

describe("Switch", () => {
  it("renders unchecked by default", () => {
    render(<Switch aria-label="Notificações" />);

    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("toggles on click and reports the new state", async () => {
    const onCheckedChange = vi.fn();
    render(
      <Switch aria-label="Notificações" onCheckedChange={onCheckedChange} />
    );

    await userEvent.click(screen.getByRole("switch"));

    expect(screen.getByRole("switch")).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("toggles with the keyboard", async () => {
    render(<Switch aria-label="Notificações" />);

    await userEvent.tab();
    await userEvent.keyboard(" ");

    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("does not toggle while disabled", async () => {
    const onCheckedChange = vi.fn();
    render(
      <Switch
        aria-label="Notificações"
        disabled
        onCheckedChange={onCheckedChange}
      />
    );

    await userEvent.click(screen.getByRole("switch"));

    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
