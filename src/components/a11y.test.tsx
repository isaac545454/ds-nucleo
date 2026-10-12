import { act, render } from "@testing-library/react";
import { Download } from "lucide-react";
import type { ReactElement } from "react";
import { describe, it } from "vitest";

import { expectAccessible } from "@/test/expect-accessible";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const examples: { name: string; element: ReactElement }[] = [
  {
    name: "Button",
    element: (
      <div className="flex gap-2">
        <Button>Salvar</Button>
        <Button size="icon" aria-label="Baixar arquivo">
          <Download />
        </Button>
      </div>
    ),
  },
  {
    name: "Input",
    element: (
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" placeholder="voce@empresa.com" />
      </div>
    ),
  },
  {
    name: "Textarea",
    element: (
      <div>
        <Label htmlFor="bio">Biografia</Label>
        <Textarea id="bio" placeholder="Conte um pouco sobre você" />
      </div>
    ),
  },
  {
    name: "Checkbox",
    element: (
      <div>
        <Checkbox id="terms" />
        <Label htmlFor="terms">Aceito os termos de uso</Label>
      </div>
    ),
  },
  {
    name: "RadioGroup",
    element: (
      <RadioGroup defaultValue="pix" aria-label="Forma de pagamento">
        <div>
          <RadioGroupItem value="pix" id="payment-pix" />
          <Label htmlFor="payment-pix">Pix</Label>
        </div>
        <div>
          <RadioGroupItem value="boleto" id="payment-boleto" />
          <Label htmlFor="payment-boleto">Boleto</Label>
        </div>
      </RadioGroup>
    ),
  },
  {
    name: "Switch",
    element: (
      <div>
        <Switch id="airplane" />
        <Label htmlFor="airplane">Modo avião</Label>
      </div>
    ),
  },
  {
    name: "Select",
    element: (
      <div>
        <Label htmlFor="fruit">Fruta</Label>
        <Select>
          <SelectTrigger id="fruit">
            <SelectValue placeholder="Escolha uma fruta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="maca">Maçã</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ),
  },
  {
    name: "Toggle",
    element: <Toggle aria-label="Negrito">N</Toggle>,
  },
  {
    name: "Slider",
    element: <Slider defaultValue={[40]} aria-label="Volume" />,
  },
  {
    name: "Dialog",
    element: (
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button>Abrir</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da assinatura</DialogTitle>
            <DialogDescription>
              Sua assinatura é renovada automaticamente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button>Gerenciar plano</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    name: "AlertDialog",
    element: (
      <AlertDialog defaultOpen>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Excluir conta</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
  {
    name: "Sheet",
    element: (
      <Sheet defaultOpen>
        <SheetTrigger asChild>
          <Button variant="outline">Editar perfil</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar perfil</SheetTitle>
            <SheetDescription>
              Atualize suas informações pessoais.
            </SheetDescription>
          </SheetHeader>
          <Label htmlFor="sheet-name">Nome</Label>
          <Input id="sheet-name" defaultValue="Ana Souza" />
        </SheetContent>
      </Sheet>
    ),
  },
  {
    name: "Popover",
    element: (
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline">Abrir popover</Button>
        </PopoverTrigger>
        <PopoverContent aria-labelledby="popover-title">
          <h2 id="popover-title">Sobre este campo</h2>
          <p>O código de matrícula não pode ser alterado.</p>
        </PopoverContent>
      </Popover>
    ),
  },
  {
    name: "Tooltip",
    element: (
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger asChild>
            <Button>Salvar</Button>
          </TooltipTrigger>
          <TooltipContent>Salva o rascunho atual</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    name: "DropdownMenu",
    element: (
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Minha conta</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    name: "Card",
    element: (
      <Card>
        <CardHeader>
          <CardTitle>Plano Profissional</CardTitle>
          <CardDescription>Renovação automática todo dia 5.</CardDescription>
        </CardHeader>
        <CardContent>R$ 89,90 por mês</CardContent>
        <CardFooter>
          <Button variant="outline">Cancelar plano</Button>
        </CardFooter>
      </Card>
    ),
  },
  {
    name: "Tabs",
    element: (
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão geral</TabsTrigger>
          <TabsTrigger value="invoices">Faturas</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Sua conta está ativa.</TabsContent>
        <TabsContent value="invoices">Nenhuma fatura em aberto.</TabsContent>
      </Tabs>
    ),
  },
  {
    name: "Accordion",
    element: (
      <Accordion type="single" collapsible defaultValue="payment">
        <AccordionItem value="payment">
          <AccordionTrigger>Quais formas de pagamento aceitam?</AccordionTrigger>
          <AccordionContent>Pix, boleto e cartão de crédito.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    name: "Breadcrumb",
    element: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Início</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Equipe</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
  },
  {
    name: "Separator",
    element: (
      <div>
        <p>Seção A</p>
        <Separator />
        <p>Seção B</p>
      </div>
    ),
  },
  {
    name: "ScrollArea",
    element: (
      <ScrollArea className="h-40">
        <p>Lista de etiquetas</p>
      </ScrollArea>
    ),
  },
  {
    name: "Table",
    element: (
      <Table>
        <TableCaption>Faturas recentes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fatura</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV-001</TableCell>
            <TableCell>R$ 250,00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
  },
  {
    name: "Alert",
    element: (
      <Alert>
        <AlertTitle>Sincronização concluída</AlertTitle>
        <AlertDescription>Nenhuma ação é necessária.</AlertDescription>
      </Alert>
    ),
  },
  {
    name: "Badge",
    element: <Badge>Ativo</Badge>,
  },
  {
    name: "Avatar",
    element: (
      <Avatar>
        <AvatarImage src="/isaac.png" alt="Isaac" />
        <AvatarFallback>IM</AvatarFallback>
      </Avatar>
    ),
  },
  {
    name: "Progress",
    element: <Progress value={60} aria-label="Envio de arquivos" />,
  },
  {
    name: "Skeleton",
    element: <Skeleton aria-hidden className="h-4 w-32" />,
  },
  {
    name: "Kbd",
    element: (
      <p>
        Abra a busca com <Kbd>Ctrl</Kbd> <Kbd>K</Kbd>
      </p>
    ),
  },
];

describe("accessibility", () => {
  it.each(examples)("$name has no axe violations", async ({ element }) => {
    render(element);
    // Portals (dialog, popover, menu) update after the first paint.
    await act(async () => {});
    await expectAccessible();
  });
});
