# Nucleus

Design system interno baseado em [shadcn/ui](https://ui.shadcn.com), distribuído como **um único pacote versionado**.

26 componentes, tokens de tema light/dark e Storybook com documentação viva.

## Instalação

```bash
npm install @isaac/nucleus
```

## Setup no projeto consumidor

1. Importe os estilos (uma vez, no entry da app):

```ts
import "@isaac/nucleus/styles.css";
```

2. Se a app também usa Tailwind, adicione o preset para compartilhar os mesmos tokens:

```js
// tailwind.config.js
import nucleusPreset from "@isaac/nucleus/tailwind-preset";

export default {
  presets: [nucleusPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@isaac/nucleus/dist/**/*.js",
  ],
};
```

## Uso

```tsx
import { Button, Input, Label, Dialog, DialogContent, DialogTrigger } from "@isaac/nucleus";

export function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Entrar</Button>
      </DialogTrigger>
      <DialogContent>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" placeholder="voce@empresa.com" />
        <Button type="submit">Confirmar</Button>
      </DialogContent>
    </Dialog>
  );
}
```

## Componentes

| Categoria | Componentes |
|---|---|
| Overlays | Dialog, AlertDialog, Sheet, Popover, Tooltip, DropdownMenu |
| Forms | Button, Input, Textarea, Label, Checkbox, RadioGroup, Switch, Select, Toggle, Slider |
| Layout | Card, Tabs, Accordion, Separator, Table |
| Feedback | Alert, Badge, Avatar, Progress, Skeleton |

## Storybook

```bash
npm run storybook          # dev server em http://localhost:6006
npm run build-storybook    # build estático em storybook-static/
```

## Adicionando um novo componente

A lib mantém o `components.json`, então o CLI do shadcn funciona dentro dela:

```bash
npx shadcn@latest add calendar
```

Depois exporte no barrel:

```ts
// src/index.ts
export * from "./components/ui/calendar";
```

E crie `src/components/ui/calendar.stories.tsx`.

## Versionamento e release

Fluxo: git tag → CI builda e publica no GitHub Packages.

```bash
# 1. Atualize o CHANGELOG.md (mova o conteúdo de Unreleased para a nova versão)
# 2. Suba a versão (cria commit + tag vX.Y.Z)
npm version minor   # ou patch / major

# 3. Push com tags — CI publica automaticamente
git push origin main --follow-tags
```

| Mudança | Versão |
|---|---|
| Fix em componente existente | patch (0.1.1) |
| Novo componente / variant | minor (0.2.0) |
| Breaking change (prop removida, rename) | major (1.0.0) |

## Desenvolvimento

```bash
pnpm install
pnpm run typecheck
pnpm run build      # gera dist/ (ESM + types + CSS)
pnpm run storybook
```

> **Rede corporativa**: se `npx shadcn` falhar com `unable to get local issuer certificate`,
> exporte a CA da empresa e aponte o Node para ela:
> ```bash
> security find-certificate -a -p /Library/Keychains/System.keychain > ~/.certs/corp-ca.pem
> export NODE_EXTRA_CA_CERTS=~/.certs/corp-ca.pem
> ```
