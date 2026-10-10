import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders a pulsing placeholder", () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton")).toHaveClass(
      "animate-pulse",
      "rounded-md"
    );
  });

  it("merges a custom className for sizing", () => {
    render(<Skeleton className="h-4 w-32" data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton")).toHaveClass("h-4", "w-32");
  });

  it("forwards arbitrary props to the root element", () => {
    render(<Skeleton aria-hidden data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });
});
