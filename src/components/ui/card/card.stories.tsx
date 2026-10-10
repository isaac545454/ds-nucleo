import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const meta = {
  title: "Layout/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Plano Profissional</CardTitle>
        <CardDescription>
          Renovação automática todo dia 5 de cada mês.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Titular</span>
          <span>Ana Beatriz Souza</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Valor mensal</span>
          <span>R$ 89,90</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Próxima cobrança</span>
          <span>05/11/2026</span>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancelar plano</Button>
        <Button>Gerenciar</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Entrar na conta</CardTitle>
        <CardDescription>
          Informe suas credenciais para acessar o painel.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="login-email">E-mail</Label>
          <Input
            id="login-email"
            type="email"
            placeholder="ana.souza@exemplo.com.br"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="login-password">Senha</Label>
          <Input id="login-password" type="password" placeholder="••••••••" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Entrar</Button>
        <Button variant="link" className="w-full">
          Esqueci minha senha
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Stats: Story = {
  render: () => (
    <Card className="w-[260px]">
      <CardHeader className="pb-2">
        <CardDescription>Receita do mês</CardDescription>
        <CardTitle className="text-3xl">R$ 42.350,00</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          +12,4% em relação a setembro
        </p>
      </CardContent>
    </Card>
  ),
};
