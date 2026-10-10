import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./input";

describe("Input", () => {
  it("renders a textbox with its placeholder", () => {
    render(<Input placeholder="E-mail" />);

    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
  });

  it("accepts typed text and reports every change", async () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);

    await userEvent.type(screen.getByRole("textbox"), "nucleus");

    expect(screen.getByRole("textbox")).toHaveValue("nucleus");
    expect(onChange).toHaveBeenCalledTimes(7);
  });

  it("forwards the type attribute", () => {
    render(<Input type="password" data-testid="senha" />);

    expect(screen.getByTestId("senha")).toHaveAttribute("type", "password");
  });

  it("ignores typing while disabled", async () => {
    render(<Input disabled />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "nucleus");

    expect(input).toBeDisabled();
    expect(input).toHaveValue("");
  });

  it("merges a custom className", () => {
    render(<Input className="w-64" />);

    expect(screen.getByRole("textbox")).toHaveClass("w-64", "rounded-md");
  });

  it("forwards the ref to the underlying input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
