import type { Meta, StoryObj } from "@storybook/react-vite";
import { Settings2 } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta = {
  title: "Overlays/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Abrir popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-2">
          <h4 className="text-sm font-semibold">Sobre este campo</h4>
          <p className="text-sm text-muted-foreground">
            O código de matrícula é gerado automaticamente quando o aluno é
            cadastrado e não pode ser alterado.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Settings2 className="mr-2 h-4 w-4" />
          Dimensões
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-1">
            <h4 className="text-sm font-semibold">Dimensões</h4>
            <p className="text-sm text-muted-foreground">
              Defina o tamanho da área de impressão.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Largura</Label>
              <Input id="width" defaultValue="210mm" className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Altura</Label>
              <Input id="height" defaultValue="297mm" className="col-span-2" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const AlignedStart: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Ações rápidas</Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56">
        <div className="grid gap-1 text-sm">
          <button className="rounded-sm px-2 py-1.5 text-left hover:bg-accent">
            Duplicar registro
          </button>
          <button className="rounded-sm px-2 py-1.5 text-left hover:bg-accent">
            Exportar em PDF
          </button>
          <button className="rounded-sm px-2 py-1.5 text-left hover:bg-accent">
            Compartilhar link
          </button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
