import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

describe("Breadcrumb", () => {
  it("exposes a navigation landmark", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Início</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    expect(screen.getByRole("navigation", { name: "Trilha" })).toBeInTheDocument();
  });

  it("marks the current page", () => {
    render(<BreadcrumbPage>Equipe</BreadcrumbPage>);

    expect(screen.getByText("Equipe")).toHaveAttribute("aria-current", "page");
  });

  it("renders a link", () => {
    render(<BreadcrumbLink href="/configuracoes">Configurações</BreadcrumbLink>);

    expect(screen.getByRole("link", { name: "Configurações" })).toHaveAttribute(
      "href",
      "/configuracoes"
    );
  });

  it("renders a custom element when asChild is set", () => {
    render(
      <BreadcrumbLink asChild>
        <button type="button">Início</button>
      </BreadcrumbLink>
    );

    expect(screen.getByRole("button", { name: "Início" })).toHaveClass(
      "hover:text-foreground"
    );
  });

  it("hides the default separator from the accessibility tree", () => {
    render(<BreadcrumbSeparator data-testid="separator" />);

    const separator = screen.getByTestId("separator");
    expect(separator).toHaveAttribute("aria-hidden", "true");
    expect(separator.querySelector("svg")).toBeInTheDocument();
  });

  it("renders a custom separator", () => {
    render(<BreadcrumbSeparator>/</BreadcrumbSeparator>);

    expect(screen.getByText("/")).toBeInTheDocument();
  });

  it("names the collapsed trail for screen readers", () => {
    render(<BreadcrumbEllipsis />);

    expect(screen.getByText("Mais")).toHaveClass("sr-only");
  });

  it("merges a custom className", () => {
    render(<BreadcrumbList className="gap-4" />);

    expect(screen.getByRole("list")).toHaveClass("gap-4", "text-sm");
  });
});
