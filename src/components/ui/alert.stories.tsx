import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleAlert, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
      description: "Estilo visual do alerta.",
      table: { defaultValue: { summary: "default" } },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <AlertTitle>Sincronização concluída</AlertTitle>
      <AlertDescription>
        Seus dados foram atualizados há poucos instantes. Nenhuma ação é
        necessária.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <AlertTitle>Falha ao salvar</AlertTitle>
      <AlertDescription>
        Não foi possível salvar as alterações. Verifique sua conexão e tente
        novamente.
      </AlertDescription>
    </Alert>
  ),
};

export const WithIcon: Story = {
  args: { variant: "default" },
  render: (args) => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Alert {...args}>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Modo desenvolvedor ativo</AlertTitle>
        <AlertDescription>
          Execute <code>pnpm storybook</code> para visualizar os componentes
          localmente.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlert className="h-4 w-4" />
        <AlertTitle>Assinatura vencida</AlertTitle>
        <AlertDescription>
          Regularize o pagamento para continuar usando os recursos premium.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
