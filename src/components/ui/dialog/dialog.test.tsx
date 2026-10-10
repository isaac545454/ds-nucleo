import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

function renderDialog(props: Partial<React.ComponentProps<typeof Dialog>> = {}) {
  return render(
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button>Abrir</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>Altere seus dados.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("stays closed until the trigger is activated", () => {
    renderDialog();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on trigger click with title and description", async () => {
    renderDialog();

    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Editar perfil")).toBeInTheDocument();
    expect(screen.getByText("Altere seus dados.")).toBeInTheDocument();
  });

  it("closes through the DialogClose action", async () => {
    renderDialog();

    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    renderDialog();

    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders the built-in close button", async () => {
    renderDialog();

    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));

    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("reports open state changes", async () => {
    const onOpenChange = vi.fn();
    renderDialog({ onOpenChange });

    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
