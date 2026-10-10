import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

function renderSelect(props: Partial<React.ComponentProps<typeof Select>> = {}) {
  return render(
    <Select {...props}>
      <SelectTrigger aria-label="Fruta">
        <SelectValue placeholder="Escolha uma fruta" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="maca">Maçã</SelectItem>
        <SelectItem value="uva" disabled>
          Uva
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("shows the placeholder while nothing is selected", () => {
    renderSelect();

    expect(screen.getByText("Escolha uma fruta")).toBeInTheDocument();
  });

  it("keeps the listbox closed until the trigger is activated", () => {
    renderSelect();

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens the listbox on trigger click", async () => {
    renderSelect();

    await userEvent.click(screen.getByRole("combobox", { name: "Fruta" }));

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
  });

  it("selects an option and reports its value", async () => {
    const onValueChange = vi.fn();
    renderSelect({ onValueChange });

    await userEvent.click(screen.getByRole("combobox", { name: "Fruta" }));
    await userEvent.click(screen.getByRole("option", { name: "Maçã" }));

    expect(onValueChange).toHaveBeenCalledWith("maca");
    expect(screen.getByRole("combobox", { name: "Fruta" })).toHaveTextContent(
      "Maçã"
    );
  });

  it("renders the defaultValue label on the trigger", () => {
    renderSelect({ defaultValue: "banana" });

    expect(screen.getByRole("combobox", { name: "Fruta" })).toHaveTextContent(
      "Banana"
    );
  });

  it("marks disabled options as disabled", async () => {
    renderSelect();

    await userEvent.click(screen.getByRole("combobox", { name: "Fruta" }));

    expect(screen.getByRole("option", { name: "Uva" })).toHaveAttribute(
      "data-disabled"
    );
  });

  it("does not open while the select is disabled", async () => {
    renderSelect({ disabled: true });

    await userEvent.click(screen.getByRole("combobox", { name: "Fruta" }));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
