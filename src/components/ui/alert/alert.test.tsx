import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert, AlertDescription, AlertTitle } from "./alert";

describe("Alert", () => {
  it("exposes the alert role", () => {
    render(<Alert>Algo aconteceu</Alert>);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(
      <Alert>
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>Não foi possível salvar.</AlertDescription>
      </Alert>
    );

    expect(
      screen.getByRole("heading", { name: "Erro" })
    ).toBeInTheDocument();
    expect(screen.getByText("Não foi possível salvar.")).toBeInTheDocument();
  });

  it("applies the destructive variant", () => {
    render(<Alert variant="destructive">Erro</Alert>);

    expect(screen.getByRole("alert")).toHaveClass("text-destructive");
  });

  it("merges a custom className", () => {
    render(<Alert className="mt-4">Aviso</Alert>);

    expect(screen.getByRole("alert")).toHaveClass("mt-4", "rounded-lg");
  });
});
