import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Progress } from "./progress";

describe("Progress", () => {
  it("exposes the progressbar role", () => {
    render(<Progress value={0} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("exposes the value bounds to assistive tech", () => {
    render(<Progress value={40} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
  });

  it("translates the indicator by the remaining percentage", () => {
    const { container } = render(<Progress value={25} />);

    const indicator = container.querySelector<HTMLElement>(
      "[data-state] > div"
    );
    expect(indicator).toHaveStyle({ transform: "translateX(-75%)" });
  });

  it("treats a missing value as 0%", () => {
    const { container } = render(<Progress />);

    const indicator = container.querySelector<HTMLElement>(
      "[data-state] > div"
    );
    expect(indicator).toHaveStyle({ transform: "translateX(-100%)" });
  });

  it("merges a custom className", () => {
    render(<Progress value={10} className="h-4" />);

    expect(screen.getByRole("progressbar")).toHaveClass("h-4");
  });
});
