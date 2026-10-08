import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./badge";

const meta = {
  title: "Feedback/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "Estilo visual do selo.",
      table: { defaultValue: { summary: "default" } },
    },
    children: { control: "text", description: "Conteúdo do selo." },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "default", children: "Ativo" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Em análise" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Vencido" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Rascunho" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Ativo</Badge>
      <Badge variant="secondary">Em análise</Badge>
      <Badge variant="destructive">Vencido</Badge>
      <Badge variant="outline">Rascunho</Badge>
    </div>
  ),
};
