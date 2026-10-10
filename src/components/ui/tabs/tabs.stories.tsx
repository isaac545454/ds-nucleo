import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta = {
  title: "Layout/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[420px]">
      <TabsList>
        <TabsTrigger value="overview">Visão geral</TabsTrigger>
        <TabsTrigger value="invoices">Faturas</TabsTrigger>
        <TabsTrigger value="settings">Configurações</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-sm text-muted-foreground">
        Sua conta está ativa desde março de 2024 e não possui pendências
        financeiras.
      </TabsContent>
      <TabsContent value="invoices" className="grid gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Outubro/2026</span>
          <span>R$ 89,90 · Pago</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Setembro/2026</span>
          <span>R$ 89,90 · Pago</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Agosto/2026</span>
          <span>R$ 79,90 · Pago</span>
        </div>
      </TabsContent>
      <TabsContent value="settings" className="text-sm text-muted-foreground">
        Gerencie notificações, chaves de acesso e integrações da sua
        organização.
      </TabsContent>
    </Tabs>
  ),
};

export const WithForms: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[420px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Conta</TabsTrigger>
        <TabsTrigger value="password">Senha</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Conta</CardTitle>
            <CardDescription>
              Atualize seus dados cadastrais e salve ao terminar.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tabs-name">Nome completo</Label>
              <Input id="tabs-name" defaultValue="Ana Beatriz Souza" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tabs-cpf">CPF</Label>
              <Input id="tabs-cpf" defaultValue="123.456.789-09" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Salvar alterações</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Senha</CardTitle>
            <CardDescription>
              Após salvar, você precisará entrar novamente.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tabs-current-password">Senha atual</Label>
              <Input id="tabs-current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tabs-new-password">Nova senha</Label>
              <Input id="tabs-new-password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Atualizar senha</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};
