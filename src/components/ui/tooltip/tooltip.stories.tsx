import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleHelp, Plus, Trash2 } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant="outline">Passe o mouse aqui</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Adicionar à biblioteca</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const OnIconButtons: Story = {
  render: () => (
    <TooltipProvider delayDuration={200}>
      <div className="flex items-center gap-2">
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Adicionar aluno">
              <Plus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Adicionar aluno</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Ajuda">
              <CircleHelp className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ver documentação</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              aria-label="Excluir registro"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Excluir registro</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="grid h-[360px] w-[520px] grid-cols-3 grid-rows-3 place-items-center">
      <div />
      <SideTooltip side="top" />
      <div />
      <SideTooltip side="left" />
      <div />
      <SideTooltip side="right" />
      <div />
      <SideTooltip side="bottom" />
      <div />
    </div>
  ),
};

function SideTooltip({ side }: { side: "top" | "right" | "bottom" | "left" }) {
  return (
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant="outline">{side}</Button>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p>Dica exibida à {side}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
