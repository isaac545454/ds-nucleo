import type { Meta, StoryObj } from "@storybook/react-vite";
import { Download, LoaderCircle, Mail } from "lucide-react";

import { Button } from "./button";

const meta = {
  title: "Forms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
      description: "Estilo visual do botão.",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "Tamanho do botão.",
    },
    disabled: { control: "boolean" },
    asChild: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Salvar alterações",
    variant: "default",
    size: "default",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Cancelar" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Excluir conta" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Ver detalhes" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Voltar" },
};

export const Link: Story = {
  args: { variant: "link", children: "Saiba mais" },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Pequeno</Button>
      <Button size="default">Padrão</Button>
      <Button size="lg">Grande</Button>
      <Button size="icon" aria-label="Baixar arquivo">
        <Download />
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Button>
        <Mail />
        Enviar e-mail
      </Button>
      <Button variant="outline">
        <Download />
        Baixar relatório
      </Button>
    </div>
  ),
};

export const LoadingAndDisabled: Story = {
  name: "Loading / Disabled",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled>
        <LoaderCircle className="animate-spin" />
        Processando...
      </Button>
      <Button disabled>Indisponível</Button>
      <Button variant="outline" disabled>
        Indisponível
      </Button>
    </div>
  ),
};
