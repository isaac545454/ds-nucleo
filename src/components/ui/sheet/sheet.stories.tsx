import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta = {
  title: "Overlays/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger asChild>
        <Button variant="outline">Editar perfil</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Editar perfil</SheetTitle>
          <SheetDescription>
            Atualize suas informações pessoais. As mudanças são aplicadas
            imediatamente.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="sheet-name">Nome</Label>
            <Input id="sheet-name" defaultValue="Ana Beatriz Souza" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sheet-role">Cargo</Label>
            <Input id="sheet-role" defaultValue="Coordenadora pedagógica" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Salvar alterações</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const LeftSide: Story = {
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger asChild>
        <Button variant="outline">Abrir menu</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navegação</SheetTitle>
          <SheetDescription>
            Acesse as áreas principais do sistema.
          </SheetDescription>
        </SheetHeader>
        <nav className="grid gap-1 py-4 text-sm">
          <a className="rounded-sm px-2 py-1.5 hover:bg-accent" href="#inicio">
            Início
          </a>
          <a className="rounded-sm px-2 py-1.5 hover:bg-accent" href="#alunos">
            Alunos
          </a>
          <a
            className="rounded-sm px-2 py-1.5 hover:bg-accent"
            href="#contratos"
          >
            Contratos
          </a>
          <a
            className="rounded-sm px-2 py-1.5 hover:bg-accent"
            href="#relatorios"
          >
            Relatórios
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

export const BottomSide: Story = {
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger asChild>
        <Button variant="secondary">Filtrar resultados</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>
            Refine a listagem de contratos por período e situação.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="sheet-start">Data inicial</Label>
            <Input id="sheet-start" type="date" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sheet-end">Data final</Label>
            <Input id="sheet-end" type="date" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Limpar</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Aplicar filtros</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
