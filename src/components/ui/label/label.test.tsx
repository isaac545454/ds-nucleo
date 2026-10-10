import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Input } from "@/components/ui/input";

import { Label } from "./label";

describe("Label", () => {
  it("renders its text content", () => {
    render(<Label>E-mail</Label>);

    expect(screen.getByText("E-mail")).toBeInTheDocument();
  });

  it("associates the control through htmlFor and focuses it on click", async () => {
    render(
      <>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" />
      </>
    );

    await userEvent.click(screen.getByText("E-mail"));

    expect(screen.getByLabelText("E-mail")).toHaveFocus();
  });

  it("merges a custom className", () => {
    render(<Label className="text-destructive">Obrigatório</Label>);

    expect(screen.getByText("Obrigatório")).toHaveClass(
      "text-destructive",
      "text-sm"
    );
  });
});
