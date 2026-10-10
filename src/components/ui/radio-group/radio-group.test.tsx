import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RadioGroup, RadioGroupItem } from "./radio-group";

function renderGroup(props: Partial<React.ComponentProps<typeof RadioGroup>> = {}) {
  return render(
    <RadioGroup aria-label="Plano" {...props}>
      <RadioGroupItem value="mensal" aria-label="Mensal" />
      <RadioGroupItem value="anual" aria-label="Anual" />
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("renders one radio per item", () => {
    renderGroup();

    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("marks the defaultValue item as checked", () => {
    renderGroup({ defaultValue: "anual" });

    expect(screen.getByRole("radio", { name: "Anual" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Mensal" })).not.toBeChecked();
  });

  it("selects an item on click and reports the value", async () => {
    const onValueChange = vi.fn();
    renderGroup({ onValueChange });

    await userEvent.click(screen.getByRole("radio", { name: "Mensal" }));

    expect(onValueChange).toHaveBeenCalledWith("mensal");
    expect(screen.getByRole("radio", { name: "Mensal" })).toBeChecked();
  });

  it("selects the focused item with the space key", async () => {
    renderGroup();

    await userEvent.tab();
    await userEvent.keyboard(" ");

    expect(screen.getByRole("radio", { name: "Mensal" })).toBeChecked();
  });

  it("does not select items while the group is disabled", async () => {
    const onValueChange = vi.fn();
    renderGroup({ disabled: true, onValueChange });

    await userEvent.click(screen.getByRole("radio", { name: "Mensal" }));

    expect(onValueChange).not.toHaveBeenCalled();
  });
});
