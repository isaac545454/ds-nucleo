import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
      description: "Estado controlado do checkbox.",
    },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-default" {...args} />
      <Label htmlFor="checkbox-default">Aceito os termos de uso</Label>
    </div>
  ),
};

export const Checked: Story = {
  args: { defaultChecked: true },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-checked" {...args} />
      <Label htmlFor="checkbox-checked">Receber novidades por e-mail</Label>
    </div>
  ),
};

export const WithDescription: Story = {
  name: "Com descrição",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-start gap-2">
      <Checkbox id="checkbox-description" className="mt-1" />
      <div className="grid gap-1">
        <Label htmlFor="checkbox-description">Lembrar deste dispositivo</Label>
        <p className="text-sm text-muted-foreground">
          Não pediremos o código de verificação nos próximos 30 dias.
        </p>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-disabled" {...args} />
        <Label htmlFor="checkbox-disabled">Opção indisponível</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-disabled-checked" disabled defaultChecked />
        <Label htmlFor="checkbox-disabled-checked">
          Opção obrigatória (bloqueada)
        </Label>
      </div>
    </div>
  ),
};
