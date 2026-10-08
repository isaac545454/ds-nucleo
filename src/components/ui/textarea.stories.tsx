import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "./label";
import { Textarea } from "./textarea";

const meta = {
  title: "Forms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    placeholder: { control: "text" },
    rows: { control: "number" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
  args: {
    placeholder: "Escreva sua mensagem aqui...",
    disabled: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Textarea {...args} className="w-80" />,
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="textarea-message">Mensagem</Label>
      <Textarea id="textarea-message" {...args} />
      <p className="text-sm text-muted-foreground">
        Sua mensagem será enviada para a equipe de suporte.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Edição bloqueada" },
  render: (args) => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="textarea-disabled">Observações</Label>
      <Textarea id="textarea-disabled" {...args} />
    </div>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="textarea-error" className="text-destructive">
        Justificativa
      </Label>
      <Textarea
        id="textarea-error"
        aria-invalid
        aria-describedby="textarea-error-message"
        className="border-destructive focus-visible:ring-destructive"
        {...args}
      />
      <p id="textarea-error-message" className="text-sm text-destructive">
        A justificativa é obrigatória e deve ter ao menos 20 caracteres.
      </p>
    </div>
  ),
};
