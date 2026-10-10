import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

describe("Card", () => {
  it("renders every slot of a composed card", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Assinatura</CardTitle>
          <CardDescription>Plano atual da conta</CardDescription>
        </CardHeader>
        <CardContent>Pro</CardContent>
        <CardFooter>Renova em 12/01</CardFooter>
      </Card>
    );

    expect(screen.getByText("Assinatura")).toBeInTheDocument();
    expect(screen.getByText("Plano atual da conta")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Renova em 12/01")).toBeInTheDocument();
  });

  it("styles the root as a bordered surface", () => {
    render(<Card data-testid="card">conteúdo</Card>);

    expect(screen.getByTestId("card")).toHaveClass(
      "rounded-xl",
      "border",
      "bg-card"
    );
  });

  it("merges a custom className on the root", () => {
    render(
      <Card className="w-96" data-testid="card">
        conteúdo
      </Card>
    );

    expect(screen.getByTestId("card")).toHaveClass("w-96");
  });
});
