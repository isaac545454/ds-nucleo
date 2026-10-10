import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

function renderAlertDialog(onAction = vi.fn()) {
  render(
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Excluir</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return { onAction };
}

describe("AlertDialog", () => {
  it("stays closed until the trigger is activated", () => {
    renderAlertDialog();

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("opens with the alertdialog role", async () => {
    renderAlertDialog();

    await userEvent.click(screen.getByRole("button", { name: "Excluir" }));

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText("Esta ação não pode ser desfeita.")).toBeInTheDocument();
  });

  it("runs the action handler and closes on confirm", async () => {
    const { onAction } = renderAlertDialog();

    await userEvent.click(screen.getByRole("button", { name: "Excluir" }));
    await userEvent.click(screen.getByRole("button", { name: "Confirmar" }));

    expect(onAction).toHaveBeenCalledOnce();
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("closes on cancel without running the action", async () => {
    const { onAction } = renderAlertDialog();

    await userEvent.click(screen.getByRole("button", { name: "Excluir" }));
    await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(onAction).not.toHaveBeenCalled();
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("moves focus into the dialog when it opens", async () => {
    renderAlertDialog();

    await userEvent.click(screen.getByRole("button", { name: "Excluir" }));

    expect(screen.getByRole("alertdialog")).toContainElement(
      document.activeElement as HTMLElement
    );
  });
});
