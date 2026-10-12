# Changelog

Todas as mudanças notáveis deste projeto são documentadas aqui.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e o versionamento segue [SemVer](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added

- Componente `Breadcrumb` para a trilha de navegação.

## [0.6.2] - 2026-10-12

### Added

- Testes de acessibilidade com axe-core para cada componente. O CI roda essa suíte no check Acessibilidade, em paralelo com os testes unitários. Contraste de cor continua no painel do Storybook (`addon-a11y`), porque o jsdom não carrega o CSS do tema.

### Fixed

- Stories de Popover e Progress passam a expor um nome acessível. O conteúdo do popover é um diálogo, e a barra de progresso precisa de rótulo.

## [0.6.1] - 2026-10-12

### Added

- Página de cores no Storybook, com nome da cor, hexadecimal e uso na interface nos temas claro e escuro.

## [0.6.0] - 2026-10-12

### Added

- Convenção para agentes em `AGENTS.md` (import, tokens, overlays). O catálogo não é copiado para a rule.
- MCP do Storybook (`@storybook/addon-mcp`) com manifesto de componentes. O toolset de teste fica desligado. No CI, o Chromatic publica esse catálogo em `/mcp`. Ver `docs/ai-rules-vs-mcp.md`.

## [0.5.3] - 2026-10-12

### Changed

- Lint, typecheck, testes, build, Storybook e Chromatic passam a ser checks separados e rodam em sequência. O Chromatic continua por último.

## [0.5.2] - 2026-10-12

### Added

- Relatório de tree-shaking nos pull requests. O CI mede o bundle de cada export e falha se um export que já existia crescer mais de 20% e mais de 256 B, ou se o conjunto dos exports antigos crescer mais de 5%. A label `tree-shaking: accepted` aceita um aumento intencional.

### Changed

- O JavaScript publicado deixa de ser um arquivo único. Cada módulo sai separado, com `sideEffects` só no CSS, para o bundler de quem consome descartar o componente que não foi importado.

## [0.5.1] - 2026-10-12

### Changed

- O Chromatic roda como último step do CI, depois do lint, dos testes e do build do Storybook.

## [0.5.0] - 2026-10-12

### Added

- Componente `Kbd` para mostrar teclas e atalhos.

## [0.4.1] - 2026-10-12

### Changed

- O CI passa a rodar lint, testes unitários e build em cada pull request e antes de publicar.

## [0.4.0] - 2026-10-12

### Added

- Testes visuais no Chromatic. Cada story é fotografada nos temas light e dark, e overlays abrem no estado inicial para o snapshot incluir o conteúdo.

### Fixed

- Tokens do tema dark deixavam de ir para o CSS. O Tailwind removia o bloco `.dark` no build, então a classe no `html` não trocava as cores.

## [0.3.0] - 2026-10-10

### Added

- Componente `ScrollArea` para conteúdo com overflow e barra de rolagem vertical ou horizontal.

### Changed

- Merge em `master` corta a versão a partir de `Unreleased`, publica o pacote e abre a GitHub Release. A release deixava de sair quando `package.json` continuava na versão já publicada.

## [0.2.0] - 2026-10-10

### Added

- Componente `Slider` para valor único ou intervalo (`min`, `max`, `step`, orientação horizontal ou vertical).
- 26 componentes gerados via shadcn CLI (`style: new-york`, `baseColor: zinc`):
  - **Overlays**: Dialog, AlertDialog, Sheet, Popover, Tooltip, DropdownMenu
  - **Forms**: Button, Input, Textarea, Label, Checkbox, RadioGroup, Switch, Select, Toggle, Slider
  - **Layout**: Card, Tabs, Accordion, Separator, Table
  - **Feedback**: Alert, Badge, Avatar, Progress, Skeleton
- Storybook 10 (`@storybook/react-vite`) com stories para todos os componentes,
  addon de acessibilidade (`addon-a11y`), autodocs e toggle de tema light/dark.
- `components.json` para permitir `npx shadcn add <componente>` dentro da lib.
- Plugin `tailwindcss-animate` e keyframes de accordion no preset.

### Changed

- Pacote publicado como `@isaac545454/nucleus`. O escopo precisa ser o owner do GitHub Packages.
- Componentes movidos de `src/components/` para `src/components/ui/` (padrão shadcn).
- Tokens de tema completos (`card`, `popover`, `ring`, `radius`) adicionados ao preset e ao `styles.css`.

## [0.1.0] - 2026-10-08

### Added

- Componente `Button` (variants: default, destructive, outline, secondary, ghost, link).
- Componente `Input`.
- Utilitário `cn` (clsx + tailwind-merge).
- Design tokens via CSS variables (light/dark) em `styles.css`.
- Tailwind preset exportado em `@isaac545454/nucleus/tailwind-preset`.
