import type { Meta, StoryObj } from "@storybook/react-vite";

import { Kbd } from "./kbd";

const meta = {
  title: "Feedback/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    children: { control: "text", description: "Tecla ou atalho." },
  },
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "K" },
};

export const Shortcut: Story = {
  render: () => (
    <p className="text-sm text-muted-foreground">
      Abra a busca com <Kbd>Ctrl</Kbd> <Kbd>K</Kbd>
    </p>
  ),
};
