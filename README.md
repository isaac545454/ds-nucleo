# Nucleus

Design system interno baseado em [shadcn/ui](https://ui.shadcn.com), distribuído como um único pacote versionado.

## Instalação

```bash
npm install @isaac/nucleus
```

## Setup no projeto consumidor

1. Importe os estilos (uma vez, no entry da app):

```ts
import "@isaac/nucleus/styles.css";
```

2. Adicione o preset no `tailwind.config.js` do consumidor (necessário apenas se a app também usa Tailwind e quer os mesmos tokens):

```js
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
import { Button, Input } from "@isaac/nucleus";

export function LoginForm() {
  return (
    <form>
      <Input placeholder="E-mail" type="email" />
      <Button type="submit">Entrar</Button>
    </form>
  );
}
```

## Versionamento e release

Fluxo: git tag → CI builda e publica no GitHub Packages.

```bash
# 1. Atualize o CHANGELOG.md
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
npm install
npm run build      # gera dist/ (JS + types + CSS)
npm run typecheck
```
