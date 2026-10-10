import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge, badgeVariants } from "./badge";

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge>Novo</Badge>);

    expect(screen.getByText("Novo")).toBeInTheDocument();
  });

  it("uses the default variant when none is given", () => {
    render(<Badge>Novo</Badge>);

    expect(screen.getByText("Novo")).toHaveClass("bg-primary");
  });

  it.each([
    ["secondary", "bg-secondary"],
    ["destructive", "bg-destructive"],
    ["outline", "text-foreground"],
  ] as const)("applies the %s variant", (variant, expected) => {
    render(<Badge variant={variant}>Novo</Badge>);

    expect(screen.getByText("Novo")).toHaveClass(expected);
  });

  it("merges a custom className", () => {
    render(<Badge className="uppercase">Novo</Badge>);

    expect(screen.getByText("Novo")).toHaveClass("uppercase");
  });

  it("exposes badgeVariants for composition", () => {
    expect(badgeVariants({ variant: "secondary" })).toContain("bg-secondary");
  });
});
