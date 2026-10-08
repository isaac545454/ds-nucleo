import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, Underline } from "lucide-react";

import { Toggle } from "./toggle";

const meta = {
  title: "Forms/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "Estilo visual do toggle.",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "Tamanho do toggle.",
    },
    pressed: { control: "boolean", description: "Estado controlado." },
    defaultPressed: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "default",
    disabled: false,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Toggle aria-label="Alternar negrito" {...args}>
      <Bold />
    </Toggle>
  ),
};

export const WithText: Story = {
  name: "Com texto",
  args: { variant: "outline" },
  render: (args) => (
    <Toggle aria-label="Alternar negrito" {...args}>
      <Bold />
      Negrito
    </Toggle>
  ),
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle variant="default" aria-label="Alternar negrito">
        <Bold />
      </Toggle>
      <Toggle variant="outline" aria-label="Alternar itálico">
        <Italic />
      </Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle size="sm" variant="outline" aria-label="Alternar negrito">
        <Bold />
      </Toggle>
      <Toggle size="default" variant="outline" aria-label="Alternar itálico">
        <Italic />
      </Toggle>
      <Toggle size="lg" variant="outline" aria-label="Alternar sublinhado">
        <Underline />
      </Toggle>
    </div>
  ),
};

export const Pressed: Story = {
  name: "Ativado",
  args: { defaultPressed: true, variant: "outline" },
  render: (args) => (
    <Toggle aria-label="Alternar negrito" {...args}>
      <Bold />
      Negrito
    </Toggle>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, variant: "outline" },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Toggle aria-label="Alternar negrito" {...args}>
        <Bold />
      </Toggle>
      <Toggle aria-label="Alternar itálico" disabled defaultPressed>
        <Italic />
      </Toggle>
    </div>
  ),
};
