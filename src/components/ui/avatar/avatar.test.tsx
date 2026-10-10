import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

describe("Avatar", () => {
  it("renders the fallback while the image has not loaded", () => {
    render(
      <Avatar>
        <AvatarImage src="/isaac.png" alt="Isaac" />
        <AvatarFallback>IM</AvatarFallback>
      </Avatar>
    );

    // jsdom never fires the image load event, so Radix keeps the fallback.
    expect(screen.getByText("IM")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders the fallback when no image is provided", () => {
    render(
      <Avatar>
        <AvatarFallback>IM</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText("IM")).toBeInTheDocument();
  });

  it("keeps the root circular and clipped", () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>IM</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByTestId("avatar")).toHaveClass(
      "rounded-full",
      "overflow-hidden"
    );
  });

  it("merges a custom className for sizing", () => {
    render(
      <Avatar className="h-16 w-16" data-testid="avatar">
        <AvatarFallback>IM</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByTestId("avatar")).toHaveClass("h-16", "w-16");
  });
});
