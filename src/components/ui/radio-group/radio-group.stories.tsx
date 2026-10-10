import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta = {
  title: "Forms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientação da navegação por teclado.",
    },
    disabled: { control: "boolean" },
    defaultValue: { control: "text" },
  },
  args: {
    defaultValue: "pix",
    disabled: false,
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="pix" id="payment-pix" />
        <Label htmlFor="payment-pix">Pix</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="boleto" id="payment-boleto" />
        <Label htmlFor="payment-boleto">Boleto bancário</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="credit-card" id="payment-credit-card" />
        <Label htmlFor="payment-credit-card">Cartão de crédito</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  args: { defaultValue: "mensal", orientation: "horizontal" },
  render: (args) => (
    <RadioGroup {...args} className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="mensal" id="plan-mensal" />
        <Label htmlFor="plan-mensal">Mensal</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="anual" id="plan-anual" />
        <Label htmlFor="plan-anual">Anual</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  name: "Com descrição",
  parameters: { controls: { disable: true } },
  render: () => (
    <RadioGroup defaultValue="padrao" className="gap-4">
      <div className="flex items-start gap-2">
        <RadioGroupItem value="padrao" id="shipping-padrao" className="mt-1" />
        <div className="grid gap-1">
          <Label htmlFor="shipping-padrao">Entrega padrão</Label>
          <p className="text-sm text-muted-foreground">
            Chega em até 7 dias úteis, sem custo adicional.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <RadioGroupItem
          value="expressa"
          id="shipping-expressa"
          className="mt-1"
        />
        <div className="grid gap-1">
          <Label htmlFor="shipping-expressa">Entrega expressa</Label>
          <p className="text-sm text-muted-foreground">
            Chega em até 2 dias úteis por R$ 19,90.
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: { defaultValue: "pix", disabled: true },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="pix" id="disabled-pix" />
        <Label htmlFor="disabled-pix">Pix</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="boleto" id="disabled-boleto" />
        <Label htmlFor="disabled-boleto">Boleto bancário</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDisabledItem: Story = {
  name: "Com item desabilitado",
  parameters: { controls: { disable: true } },
  render: () => (
    <RadioGroup defaultValue="pix">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="pix" id="item-pix" />
        <Label htmlFor="item-pix">Pix</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="boleto" id="item-boleto" disabled />
        <Label htmlFor="item-boleto">Boleto bancário (indisponível)</Label>
      </div>
    </RadioGroup>
  ),
};
