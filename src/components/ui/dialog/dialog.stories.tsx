import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta = {
  title: "Overlays/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir detalhes</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da assinatura</DialogTitle>
          <DialogDescription>
            Sua assinatura é renovada automaticamente todo dia 5. Você pode
            cancelar a qualquer momento.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Plano</span>
            <span>Profissional</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Valor mensal</span>
            <span>R$ 89,90</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Próxima cobrança</span>
            <span>05/11/2026</span>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
          <Button>Gerenciar plano</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button>Editar perfil</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Altere suas informações e clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" defaultValue="Ana Beatriz Souza" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" defaultValue="ana.souza@exemplo.com" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit">Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const DestructiveConfirmation: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="destructive">Remover integração</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Remover integração</DialogTitle>
          <DialogDescription>
            A integração com o ERP será desconectada e os dados deixarão de ser
            sincronizados.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Você poderá reconectar a integração depois, mas o histórico de
          sincronização não será recuperado.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Manter integração</Button>
          </DialogClose>
          <Button variant="destructive">Remover</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
