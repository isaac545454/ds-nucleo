import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    defaultValue: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    dir: { control: "select", options: ["ltr", "rtl"] },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args} defaultOpen>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Selecione um estado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="sp">São Paulo</SelectItem>
        <SelectItem value="rj">Rio de Janeiro</SelectItem>
        <SelectItem value="mg">Minas Gerais</SelectItem>
        <SelectItem value="ba">Bahia</SelectItem>
        <SelectItem value="rs">Rio Grande do Sul</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-64 gap-2">
      <Label htmlFor="select-state">Estado</Label>
      <Select {...args} defaultOpen>
        <SelectTrigger id="select-state">
          <SelectValue placeholder="Selecione um estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sp">São Paulo</SelectItem>
          <SelectItem value="rj">Rio de Janeiro</SelectItem>
          <SelectItem value="mg">Minas Gerais</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithDefaultValue: Story = {
  name: "Com valor inicial",
  args: { defaultValue: "rj" },
  render: (args) => (
    <Select {...args} defaultOpen>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Selecione um estado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="sp">São Paulo</SelectItem>
        <SelectItem value="rj">Rio de Janeiro</SelectItem>
        <SelectItem value="mg">Minas Gerais</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Grouped: Story = {
  name: "Opções agrupadas",
  render: (args) => (
    <Select {...args} defaultOpen>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Selecione uma cidade" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sudeste</SelectLabel>
          <SelectItem value="sao-paulo">São Paulo</SelectItem>
          <SelectItem value="rio-de-janeiro">Rio de Janeiro</SelectItem>
          <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Nordeste</SelectLabel>
          <SelectItem value="salvador">Salvador</SelectItem>
          <SelectItem value="recife">Recife</SelectItem>
          <SelectItem value="fortaleza">Fortaleza</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithDisabledItem: Story = {
  name: "Com item desabilitado",
  render: (args) => (
    <Select {...args} defaultOpen>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Selecione um plano" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="basico">Básico</SelectItem>
        <SelectItem value="pro">Profissional</SelectItem>
        <SelectItem value="enterprise" disabled>
          Corporativo (indisponível)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="grid w-64 gap-2">
      <Label htmlFor="select-disabled">Estado</Label>
      <Select {...args}>
        <SelectTrigger id="select-disabled">
          <SelectValue placeholder="Selecione um estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sp">São Paulo</SelectItem>
          <SelectItem value="rj">Rio de Janeiro</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
