import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "./separator";

const meta = {
  title: "Layout/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[360px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Núcleo Design</h4>
        <p className="text-sm text-muted-foreground">
          Biblioteca de componentes da plataforma.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Responsável</span>
          <span>Ana Beatriz Souza</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-muted-foreground">Orçamento</span>
          <span>R$ 24.500,00</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status</span>
          <span>Pago</span>
        </div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center space-x-4 text-sm">
      <span>Documentação</span>
      <Separator orientation="vertical" />
      <span>Componentes</span>
      <Separator orientation="vertical" />
      <span>Tokens</span>
    </div>
  ),
};
