import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders a textbox with its placeholder", () => {
    render(<Textarea placeholder="Descrição" />);

    expect(screen.getByPlaceholderText("Descrição")).toBeInTheDocument();
  });

  it("accepts multiline text", async () => {
    render(<Textarea />);

    const textarea = screen.getByRole("textbox");
    await userEvent.type(textarea, "linha 1{enter}linha 2");

    expect(textarea).toHaveValue("linha 1\nlinha 2");
  });

  it("ignores typing while disabled", async () => {
    render(<Textarea disabled />);

    const textarea = screen.getByRole("textbox");
    await userEvent.type(textarea, "nucleus");

    expect(textarea).toBeDisabled();
    expect(textarea).toHaveValue("");
  });

  it("merges a custom className", () => {
    render(<Textarea className="h-40" />);

    expect(screen.getByRole("textbox")).toHaveClass("h-40");
  });

  it("forwards the ref to the underlying textarea", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
