import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";

function renderPopover(
  props: Partial<React.ComponentProps<typeof Popover>> = {}
) {
  return render(
    <Popover {...props}>
      <PopoverTrigger asChild>
        <Button>Dimensões</Button>
      </PopoverTrigger>
      <PopoverContent>Largura e altura do bloco</PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("stays closed until the trigger is activated", () => {
    renderPopover();

    expect(
      screen.queryByText("Largura e altura do bloco")
    ).not.toBeInTheDocument();
  });

  it("opens on trigger click", async () => {
    renderPopover();

    await userEvent.click(screen.getByRole("button", { name: "Dimensões" }));

    expect(screen.getByText("Largura e altura do bloco")).toBeInTheDocument();
  });

  it("marks the trigger as expanded while open", async () => {
    renderPopover();

    const trigger = screen.getByRole("button", { name: "Dimensões" });
    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("closes on Escape", async () => {
    renderPopover();

    await userEvent.click(screen.getByRole("button", { name: "Dimensões" }));
    await userEvent.keyboard("{Escape}");

    expect(
      screen.queryByText("Largura e altura do bloco")
    ).not.toBeInTheDocument();
  });

  it("reports open state changes", async () => {
    const onOpenChange = vi.fn();
    renderPopover({ onOpenChange });

    await userEvent.click(screen.getByRole("button", { name: "Dimensões" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
