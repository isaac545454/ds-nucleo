import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function renderMenu(onSelect = vi.fn()) {
  render(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Abrir menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onSelect}>
          Perfil
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem checked>
          Barra de status
        </DropdownMenuCheckboxItem>
        <DropdownMenuItem disabled>Equipe</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  return { onSelect };
}

describe("DropdownMenu", () => {
  it("stays closed until the trigger is activated", () => {
    renderMenu();

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens on trigger click and renders its items", async () => {
    renderMenu();

    await userEvent.click(screen.getByRole("button", { name: "Abrir menu" }));

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Perfil/ })).toBeInTheDocument();
    expect(screen.getByText("Minha conta")).toBeInTheDocument();
  });

  it("runs onSelect and closes when an item is chosen", async () => {
    const { onSelect } = renderMenu();

    await userEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    await userEvent.click(screen.getByRole("menuitem", { name: /Perfil/ }));

    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("renders checkbox items with their checked state", async () => {
    renderMenu();

    await userEvent.click(screen.getByRole("button", { name: "Abrir menu" }));

    expect(
      screen.getByRole("menuitemcheckbox", { name: "Barra de status" })
    ).toBeChecked();
  });

  it("marks disabled items as disabled", async () => {
    renderMenu();

    await userEvent.click(screen.getByRole("button", { name: "Abrir menu" }));

    expect(screen.getByRole("menuitem", { name: "Equipe" })).toHaveAttribute(
      "data-disabled"
    );
  });

  it("closes on Escape", async () => {
    renderMenu();

    await userEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
