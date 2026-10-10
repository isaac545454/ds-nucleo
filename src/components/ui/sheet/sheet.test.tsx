import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

function renderSheet(
  side?: React.ComponentProps<typeof SheetContent>["side"]
) {
  return render(
    <Sheet>
      <SheetTrigger asChild>
        <Button>Abrir painel</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Configurações</SheetTitle>
          <SheetDescription>Ajuste suas preferências.</SheetDescription>
        </SheetHeader>
        <SheetClose asChild>
          <Button variant="outline">Fechar painel</Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

describe("Sheet", () => {
  it("stays closed until the trigger is activated", () => {
    renderSheet();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on trigger click", async () => {
    renderSheet();

    await userEvent.click(screen.getByRole("button", { name: "Abrir painel" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Ajuste suas preferências.")).toBeInTheDocument();
  });

  it("closes through SheetClose", async () => {
    renderSheet();

    await userEvent.click(screen.getByRole("button", { name: "Abrir painel" }));
    await userEvent.click(
      screen.getByRole("button", { name: "Fechar painel" })
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    renderSheet();

    await userEvent.click(screen.getByRole("button", { name: "Abrir painel" }));
    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("anchors to the right side by default", async () => {
    renderSheet();

    await userEvent.click(screen.getByRole("button", { name: "Abrir painel" }));

    expect(screen.getByRole("dialog")).toHaveClass("inset-y-0", "right-0");
  });

  it("anchors to the requested side", async () => {
    renderSheet("left");

    await userEvent.click(screen.getByRole("button", { name: "Abrir painel" }));

    expect(screen.getByRole("dialog")).toHaveClass("inset-y-0", "left-0");
  });
});
