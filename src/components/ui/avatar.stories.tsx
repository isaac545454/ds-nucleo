import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta = {
  title: "Feedback/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="Foto de Ana Souza" />
      <AvatarFallback>AS</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args}>
        <AvatarImage src="" alt="Imagem indisponível" />
        <AvatarFallback>AS</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarFallback>MP</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarFallback className="bg-primary text-primary-foreground">
          JC
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="Ana Souza" />
        <AvatarFallback>AS</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>MP</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>JC</AvatarFallback>
      </Avatar>
    </div>
  ),
};
