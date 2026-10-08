import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "Forms/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    children: { control: "text" },
    htmlFor: { control: "text" },
  },
  args: {
    children: "Nome completo",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  args: { children: "Nome completo", htmlFor: "label-name" },
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label {...args} />
      <Input id="label-name" placeholder="Maria da Silva" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="label-terms" />
      <Label htmlFor="label-terms">Aceito os termos de uso</Label>
    </div>
  ),
};

export const PeerDisabled: Story = {
  name: "Com campo desabilitado",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="label-disabled" disabled />
      <Label htmlFor="label-disabled">Receber notificações por SMS</Label>
    </div>
  ),
};
