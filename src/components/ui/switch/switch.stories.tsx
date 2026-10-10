import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@/components/ui/label";
import { Switch } from "./switch";

const meta = {
  title: "Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    checked: { control: "boolean", description: "Estado controlado." },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="switch-default" {...args} />
      <Label htmlFor="switch-default">Modo avião</Label>
    </div>
  ),
};

export const Checked: Story = {
  args: { defaultChecked: true },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="switch-checked" {...args} />
      <Label htmlFor="switch-checked">Notificações por e-mail</Label>
    </div>
  ),
};

export const WithDescription: Story = {
  name: "Com descrição",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 items-start justify-between gap-4 rounded-md border p-4">
      <div className="grid gap-1">
        <Label htmlFor="switch-marketing">Comunicações de marketing</Label>
        <p className="text-sm text-muted-foreground">
          Receba ofertas e novidades sobre os nossos produtos.
        </p>
      </div>
      <Switch id="switch-marketing" defaultChecked />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Switch id="switch-disabled" {...args} />
        <Label htmlFor="switch-disabled">Sincronização automática</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="switch-disabled-checked" disabled defaultChecked />
        <Label htmlFor="switch-disabled-checked">
          Autenticação em duas etapas (obrigatória)
        </Label>
      </div>
    </div>
  ),
};
