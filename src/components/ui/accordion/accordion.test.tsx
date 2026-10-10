import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

function AccordionFixture({ type }: { type: "single" | "multiple" }) {
  const items = (
    <>
      <AccordionItem value="um">
        <AccordionTrigger>Pergunta um</AccordionTrigger>
        <AccordionContent>Resposta um</AccordionContent>
      </AccordionItem>
      <AccordionItem value="dois">
        <AccordionTrigger>Pergunta dois</AccordionTrigger>
        <AccordionContent>Resposta dois</AccordionContent>
      </AccordionItem>
    </>
  );

  return type === "single" ? (
    <Accordion type="single" collapsible>
      {items}
    </Accordion>
  ) : (
    <Accordion type="multiple">{items}</Accordion>
  );
}

function renderAccordion(type: "single" | "multiple" = "single") {
  return render(<AccordionFixture type={type} />);
}

describe("Accordion", () => {
  it("starts with every panel collapsed", () => {
    renderAccordion();

    expect(screen.queryByText("Resposta um")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Pergunta um" })
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("expands a panel when its trigger is clicked", async () => {
    renderAccordion();

    await userEvent.click(screen.getByRole("button", { name: "Pergunta um" }));

    expect(screen.getByText("Resposta um")).toBeInTheDocument();
  });

  it("collapses an open panel again when collapsible", async () => {
    renderAccordion();

    const trigger = screen.getByRole("button", { name: "Pergunta um" });
    await userEvent.click(trigger);
    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps a single panel open at a time in single mode", async () => {
    renderAccordion();

    await userEvent.click(screen.getByRole("button", { name: "Pergunta um" }));
    await userEvent.click(screen.getByRole("button", { name: "Pergunta dois" }));

    expect(screen.getByText("Resposta dois")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Pergunta um" })
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps several panels open in multiple mode", async () => {
    renderAccordion("multiple");

    await userEvent.click(screen.getByRole("button", { name: "Pergunta um" }));
    await userEvent.click(screen.getByRole("button", { name: "Pergunta dois" }));

    expect(screen.getByText("Resposta um")).toBeInTheDocument();
    expect(screen.getByText("Resposta dois")).toBeInTheDocument();
  });
});
