import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Button, buttonVariants } from "./button";

describe("Button", () => {
  it("renders children inside a button element", () => {
    render(<Button>Salvar</Button>);

    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Salvar</Button>);

    await userEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Salvar
      </Button>
    );

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("button")).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies variant and size classes", () => {
    render(
      <Button variant="destructive" size="lg">
        Excluir
      </Button>
    );

    expect(screen.getByRole("button")).toHaveClass(
      "bg-destructive",
      "h-10",
      "px-8"
    );
  });

  it("merges a custom className over the variant classes", () => {
    render(<Button className="w-full">Salvar</Button>);

    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("renders as the child element when asChild is set", () => {
    render(
      <Button asChild>
        <a href="/docs">Docs</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("forwards the ref to the underlying button", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Salvar</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("exposes buttonVariants for composition", () => {
    expect(buttonVariants({ variant: "ghost" })).toContain("hover:bg-accent");
  });
});
