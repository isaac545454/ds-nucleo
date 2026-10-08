# Changelog

Todas as mudanças notáveis deste projeto são documentadas aqui.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e o versionamento segue [SemVer](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added

- 25 componentes gerados via shadcn CLI (`style: new-york`, `baseColor: zinc`):
  - **Overlays**: Dialog, AlertDialog, Sheet, Popover, Tooltip, DropdownMenu
  - **Forms**: Button, Input, Textarea, Label, Checkbox, RadioGroup, Switch, Select, Toggle
  - **Layout**: Card, Tabs, Accordion, Separator, Table
  - **Feedback**: Alert, Badge, Avatar, Progress, Skeleton
- Storybook 10 (`@storybook/react-vite`) com stories para todos os componentes,
  addon de acessibilidade (`addon-a11y`), autodocs e toggle de tema light/dark.
- `components.json` para permitir `npx shadcn add <componente>` dentro da lib.
- Plugin `tailwindcss-animate` e keyframes de accordion no preset.

### Changed

- Componentes movidos de `src/components/` para `src/components/ui/` (padrão shadcn).
- Tokens de tema completos (`card`, `popover`, `ring`, `radius`) adicionados ao preset e ao `styles.css`.

## [0.1.0] - 2026-10-08

### Added

- Componente `Button` (variants: default, destructive, outline, secondary, ghost, link).
- Componente `Input`.
- Utilitário `cn` (clsx + tailwind-merge).
- Design tokens via CSS variables (light/dark) em `styles.css`.
- Tailwind preset exportado em `@isaac/nucleus/tailwind-preset`.
