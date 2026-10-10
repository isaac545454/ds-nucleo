import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScrollArea, ScrollBar } from "./scroll-area";

describe("ScrollArea", () => {
  it("renders its children inside the viewport", () => {
    render(
      <ScrollArea>
        <p>Lista longa</p>
      </ScrollArea>
    );

    expect(screen.getByText("Lista longa")).toBeInTheDocument();
  });

  it("merges a custom className on the root", () => {
    render(
      <ScrollArea className="h-48 w-64" data-testid="scroll-area">
        <p>Conteúdo</p>
      </ScrollArea>
    );

    expect(screen.getByTestId("scroll-area")).toHaveClass("h-48", "w-64");
  });

  it("keeps a vertical scrollbar mounted when type is always", () => {
    const { container } = render(
      <ScrollArea type="always">
        <p>Conteúdo</p>
      </ScrollArea>
    );

    expect(
      container.querySelector("[data-orientation='vertical']")
    ).toBeTruthy();
  });
});

describe("ScrollBar", () => {
  it("marks a horizontal orientation inside a scroll area", () => {
    const { container } = render(
      <ScrollArea type="always">
        <p>Conteúdo</p>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );

    expect(
      container.querySelector("[data-orientation='horizontal']")
    ).toBeTruthy();
  });

  it("merges a custom className", () => {
    const { container } = render(
      <ScrollArea type="always">
        <p>Conteúdo</p>
        <ScrollBar orientation="vertical" className="w-3" />
      </ScrollArea>
    );

    expect(container.querySelector(".w-3")).toHaveAttribute(
      "data-orientation",
      "vertical"
    );
  });
});
