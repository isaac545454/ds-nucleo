# Nucleus

Design system `@isaac545454/nucleus`. A convenção mora aqui. O catálogo (componente, props, variants, exemplo) mora na story, não neste arquivo.

## Como importar

Um pacote só. Não copie o fonte de `src/components` nem rode o CLI do shadcn na app.

```tsx
import "@isaac545454/nucleus/styles.css";
import { Button, Dialog, DialogContent, DialogTrigger } from "@isaac545454/nucleus";
```

O CSS entra uma vez, no entry. Se a app usa Tailwind, o preset é `@isaac545454/nucleus/tailwind-preset`, e o `content` inclui `./node_modules/@isaac545454/nucleus/dist/**/*.js`.

## Tokens

Use as classes semânticas do preset (`bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`, `ring-ring`). O tema escuro é a classe `dark` em `document.documentElement`. Não invente paleta nem hex.

Para juntar classes, use `cn` exportado pelo pacote.

## Composição

Os componentes são peças, no estilo Radix. Um dialog é `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription` e `DialogFooter`. O trigger que é um `Button` usa `asChild`.

Escolha o overlay pela função, e confira a story antes de montar:

- `Dialog` — detalhe ou tarefa no centro, pode dispensar.
- `AlertDialog` — confirmação destrutiva ou irreversível.
- `Sheet` — painel lateral (filtro, fluxo secundário).
- `Popover` — conteúdo curto ancorado, sem modal.
- `Tooltip` — rótulo curto. Não coloque nele informação essencial.
- `DropdownMenu` — lista de ações.

Formulário: `Label` com `htmlFor` no `id` do controle. Não recrie botão, input, select ou checkbox.

## Catálogo

Antes de passar uma prop ou variant, leia a story em `src/components/ui/<componente>/`. Use só o que a story mostra. Se a prop não está lá, pergunte. Não assuma API de outro design system.

Não copie a lista de componentes, variants ou args para este arquivo. Quando o MCP do Storybook estiver publicado, prefira `docs-list`, `docs-show` e `docs-show-story` à leitura do arquivo. O papel de cada um está em `docs/ai-rules-vs-mcp.md`.
