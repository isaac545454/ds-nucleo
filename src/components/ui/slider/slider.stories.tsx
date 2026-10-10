import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@/components/ui/label";
import { Slider } from "./slider";

const meta = {
  title: "Forms/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: "horizontal",
    defaultValue: [40],
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="grid w-64 gap-3">
      <Label htmlFor="slider-volume">Volume</Label>
      <Slider id="slider-volume" aria-label="Volume" {...args} />
    </div>
  ),
};

export const Range: Story = {
  name: "Intervalo",
  args: { defaultValue: [20, 80] },
  render: (args) => (
    <div className="grid w-64 gap-3">
      <Label>Faixa de preço</Label>
      <Slider aria-label="Faixa de preço" {...args} />
    </div>
  ),
};

export const Step: Story = {
  name: "Com passo",
  args: { defaultValue: [50], step: 10, max: 100 },
  render: (args) => (
    <div className="grid w-64 gap-3">
      <Label>Brilho</Label>
      <Slider aria-label="Brilho" {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical", defaultValue: [60] },
  render: (args) => <Slider aria-label="Volume vertical" {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: [30] },
  render: (args) => (
    <div className="grid w-64 gap-3">
      <Label>Volume (bloqueado)</Label>
      <Slider aria-label="Volume bloqueado" {...args} />
    </div>
  ),
};
