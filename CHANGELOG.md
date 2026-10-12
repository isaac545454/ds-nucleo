# Changelog

Todas as mudanças notáveis deste projeto são documentadas aqui.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e o versionamento segue [SemVer](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Changed

- O CI passa a rodar lint, testes unitários e build em cada pull request e antes de publicar.

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
