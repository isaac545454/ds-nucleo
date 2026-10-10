import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input";
import { Label } from "@/components/ui/label";

const meta = {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "file"],
      description: "Tipo nativo do campo.",
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
  args: {
    type: "text",
    placeholder: "Digite seu nome",
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Input {...args} className="w-72" />,
};

export const WithLabel: Story = {
  args: { type: "email", placeholder: "voce@empresa.com.br" },
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="input-email">E-mail corporativo</Label>
      <Input id="input-email" {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Campo indisponível" },
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="input-disabled">CPF</Label>
      <Input id="input-disabled" {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: { type: "email", placeholder: "voce@empresa.com.br" },
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="input-error" className="text-destructive">
        E-mail corporativo
      </Label>
      <Input
        id="input-error"
        aria-invalid
        aria-describedby="input-error-message"
        defaultValue="email-invalido"
        className="border-destructive focus-visible:ring-destructive"
        {...args}
      />
      <p id="input-error-message" className="text-sm text-destructive">
        Informe um e-mail válido, como voce@empresa.com.br.
      </p>
    </div>
  ),
};
