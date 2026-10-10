import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

function renderTooltip(open?: boolean) {
  return render(
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <Button>Salvar</Button>
        </TooltipTrigger>
        <TooltipContent>Salva o rascunho atual</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("Tooltip", () => {
  it("stays hidden until the trigger is hovered", () => {
    renderTooltip();

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows the content on hover", async () => {
    renderTooltip();

    await userEvent.hover(screen.getByRole("button", { name: "Salvar" }));

    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Salva o rascunho atual"
    );
  });

  it("shows the content on keyboard focus", async () => {
    renderTooltip();

    await userEvent.tab();

    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });

  it("respects the controlled open prop", () => {
    renderTooltip(true);

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });
});
