import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Separator } from "./separator";

describe("Separator", () => {
  it("is decorative (and therefore hidden from a11y tree) by default", () => {
    render(<Separator data-testid="separator" />);

    expect(screen.getByTestId("separator")).toHaveAttribute("role", "none");
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });

  it("exposes the separator role when not decorative", () => {
    render(<Separator decorative={false} />);

    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders horizontal sizing by default", () => {
    render(<Separator data-testid="separator" />);

    expect(screen.getByTestId("separator")).toHaveClass("h-[1px]", "w-full");
  });

  it("renders vertical sizing when the orientation is vertical", () => {
    render(<Separator orientation="vertical" data-testid="separator" />);

    const separator = screen.getByTestId("separator");
    expect(separator).toHaveClass("h-full", "w-[1px]");
    expect(separator).toHaveAttribute("data-orientation", "vertical");
  });
});
