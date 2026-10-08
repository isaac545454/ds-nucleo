import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const meta = {
  title: "Layout/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

type Invoice = {
  id: string;
  customer: string;
  method: string;
  status: "Pago" | "Pendente" | "Atrasado";
  amount: string;
};

const invoices: Invoice[] = [
  {
    id: "NF-00124",
    customer: "Ana Beatriz Souza",
    method: "Pix",
    status: "Pago",
    amount: "R$ 1.280,00",
  },
  {
    id: "NF-00125",
    customer: "Carlos Eduardo Lima",
    method: "Cartão de crédito",
    status: "Pendente",
    amount: "R$ 890,50",
  },
  {
    id: "NF-00126",
    customer: "Mariana Gonçalves",
    method: "Boleto bancário",
    status: "Atrasado",
    amount: "R$ 2.340,00",
  },
  {
    id: "NF-00127",
    customer: "Rafael Antunes",
    method: "Pix",
    status: "Pago",
    amount: "R$ 455,90",
  },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Nota</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Forma de pagamento</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.customer}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Nota</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.customer}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total do período</TableCell>
          <TableCell className="text-right">R$ 4.966,40</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>
        Faturas emitidas em outubro de 2026 para a carteira Sudeste.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Nota</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Vencimento</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">NF-00124</TableCell>
          <TableCell>Ana Beatriz Souza</TableCell>
          <TableCell>10/10/2026</TableCell>
          <TableCell>Pago</TableCell>
          <TableCell className="text-right">R$ 1.280,00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">NF-00125</TableCell>
          <TableCell>Carlos Eduardo Lima</TableCell>
          <TableCell>15/10/2026</TableCell>
          <TableCell>Pendente</TableCell>
          <TableCell className="text-right">R$ 890,50</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">NF-00126</TableCell>
          <TableCell>Mariana Gonçalves</TableCell>
          <TableCell>20/10/2026</TableCell>
          <TableCell>Atrasado</TableCell>
          <TableCell className="text-right">R$ 2.340,00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
