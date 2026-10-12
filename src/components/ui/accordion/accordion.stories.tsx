import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const meta = {
  title: "Layout/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { type: "single", collapsible: true, defaultValue: "payment" },
  render: (args) => (
    <Accordion {...args} className="w-[420px]">
      <AccordionItem value="payment">
        <AccordionTrigger>Quais formas de pagamento aceitam?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Aceitamos cartão de crédito, Pix e boleto bancário. O boleto leva até
          três dias úteis para ser compensado.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="invoice">
        <AccordionTrigger>Como emito a nota fiscal?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          A nota fiscal é emitida automaticamente em até 48 horas após a
          confirmação do pagamento e enviada para o e-mail do titular.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="cancel">
        <AccordionTrigger>Posso cancelar a qualquer momento?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Sim. O cancelamento vale a partir do próximo ciclo e não há multa
          rescisória.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: { type: "multiple", defaultValue: ["data", "security"] },
  render: (args) => (
    <Accordion {...args} className="w-[420px]">
      <AccordionItem value="data">
        <AccordionTrigger>Dados cadastrais</AccordionTrigger>
        <AccordionContent className="grid gap-1 text-muted-foreground">
          <span>Razão social: Olá Comércio de Materiais LTDA</span>
          <span>CNPJ: 12.345.678/0001-90</span>
          <span>Cidade: Belo Horizonte / MG</span>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="billing">
        <AccordionTrigger>Cobrança</AccordionTrigger>
        <AccordionContent className="grid gap-1 text-muted-foreground">
          <span>Mensalidade: R$ 1.280,00</span>
          <span>Vencimento: todo dia 10</span>
          <span>Status: Pago</span>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="security">
        <AccordionTrigger>Segurança</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Autenticação em duas etapas habilitada para todos os administradores
          da conta.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
