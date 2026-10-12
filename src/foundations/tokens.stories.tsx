import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  describeColor,
  parseTokenDoc,
  type ColorEntry,
  type NamedColor,
} from "../../.storybook/parse-tokens";
import styles from "../styles.css?raw";

const doc = parseTokenDoc(styles);

const profiles: Record<string, { title: string; usage: string; group: string }> = {
  background: {
    title: "Fundo",
    usage: "Cor de fundo das telas.",
    group: "Página e superfícies",
  },
  card: {
    title: "Cartão",
    usage: "Superfície dos cards, por cima do fundo.",
    group: "Página e superfícies",
  },
  popover: {
    title: "Menu",
    usage: "Menus, popovers e dicas flutuantes.",
    group: "Página e superfícies",
  },
  primary: {
    title: "Principal",
    usage: "Botão primário e a ação mais importante da tela.",
    group: "Ações",
  },
  secondary: {
    title: "Secundário",
    usage: "Ação de apoio, como cancelar.",
    group: "Ações",
  },
  muted: {
    title: "Discreto",
    usage: "Fundos suaves e texto de apoio.",
    group: "Ações",
  },
  accent: {
    title: "Seleção",
    usage: "Hover e item selecionado.",
    group: "Ações",
  },
  destructive: {
    title: "Perigo",
    usage: "Excluir, erro e confirmações irreversíveis.",
    group: "Ações",
  },
  border: {
    title: "Borda",
    usage: "Contorno de cartões e linhas divisórias.",
    group: "Contornos",
  },
  input: {
    title: "Campo",
    usage: "Borda de inputs, selects e áreas de texto.",
    group: "Contornos",
  },
  ring: {
    title: "Foco",
    usage: "Anel que marca o elemento focado pelo teclado.",
    group: "Contornos",
  },
};

const groupOrder = ["Página e superfícies", "Ações", "Contornos", "Outras"];

const radii = [
  {
    name: "Pequeno",
    size: "4px",
    usage: "Tags e botões compactos.",
    className: "rounded-sm",
  },
  {
    name: "Médio",
    size: "6px",
    usage: "Campos e botões.",
    className: "rounded-md",
  },
  {
    name: "Grande",
    size: "8px",
    usage: "Cartões e o padrão do sistema.",
    className: "rounded-lg",
  },
] as const;

const meta = {
  title: "Foundations/Cores",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Cores do produto nos temas claro e escuro, com o nome da cor e o hexadecimal. O código técnico fica no rodapé de cada cartão.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function entryName(entry: ColorEntry) {
  return entry.kind === "pair" ? entry.base.name : entry.token.name;
}

function profileFor(name: string) {
  return (
    profiles[name] ?? {
      title: name,
      usage: "Cor do sistema.",
      group: "Outras",
    }
  );
}

function Swatch({
  value,
  foreground,
}: {
  value: string;
  foreground?: string;
}) {
  return (
    <div
      className="flex h-20 items-center justify-center text-lg font-semibold"
      style={{
        backgroundColor: `hsl(${value})`,
        color: foreground ? `hsl(${foreground})` : undefined,
      }}
    >
      {foreground ? "Aa" : null}
    </div>
  );
}

function ColorFacts({
  label,
  color,
  text,
}: {
  label: string;
  color: NamedColor;
  text?: NamedColor;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{color.name}</p>
      <p className="font-mono text-xs text-muted-foreground">{color.hex}</p>
      {text ? (
        <p className="text-xs leading-5 text-muted-foreground">
          Texto {text.name.toLowerCase()}
          <br />
          <span className="font-mono">{text.hex}</span>
        </p>
      ) : null}
    </div>
  );
}

function ColorCard({ entry }: { entry: ColorEntry }) {
  const name = entryName(entry);
  const profile = profileFor(name);
  const token = entry.kind === "pair" ? entry.base : entry.token;
  const light = token.light;
  const dark = token.dark ?? token.light;
  const lightText = entry.kind === "pair" ? describeColor(entry.foreground.light) : undefined;
  const darkText =
    entry.kind === "pair"
      ? describeColor(entry.foreground.dark ?? entry.foreground.light)
      : undefined;

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="grid grid-cols-2 border-b border-border">
        <Swatch
          foreground={entry.kind === "pair" ? entry.foreground.light : undefined}
          value={light}
        />
        <Swatch
          foreground={
            entry.kind === "pair"
              ? (entry.foreground.dark ?? entry.foreground.light)
              : undefined
          }
          value={dark}
        />
      </div>
      <div className="space-y-4 p-4">
        <header className="space-y-1">
          <h3 className="text-base font-semibold">{profile.title}</h3>
          <p className="text-sm text-muted-foreground">{profile.usage}</p>
        </header>
        <div className="grid grid-cols-2 gap-3">
          <ColorFacts color={describeColor(light)} label="Claro" text={lightText} />
          <ColorFacts color={describeColor(dark)} label="Escuro" text={darkText} />
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {token.variable} · {entry.utility}
        </p>
      </div>
    </article>
  );
}

function TokensReference() {
  const grouped = new Map<string, ColorEntry[]>();
  for (const entry of doc.colors) {
    const group = profileFor(entryName(entry)).group;
    const items = grouped.get(group) ?? [];
    items.push(entry);
    grouped.set(group, items);
  }

  return (
    <div className="min-h-screen bg-background px-8 py-10 text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <header className="max-w-2xl space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Cores</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Cada cor aparece no tema claro e no escuro, com o nome da cor e o
            hexadecimal. O “Aa” mostra o texto em cima daquela superfície. O
            código no rodapé é a referência para engenharia.
          </p>
        </header>

        {groupOrder.map((group) => {
          const entries = grouped.get(group);
          if (!entries?.length) return null;
          return (
            <section key={group} className="space-y-4">
              <h2 className="text-lg font-semibold">{group}</h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {entries.map((entry) => (
                  <ColorCard key={entryName(entry)} entry={entry} />
                ))}
              </div>
            </section>
          );
        })}

        <section className="space-y-4">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-lg font-semibold">Cantos</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              O canto padrão do produto mede 8px. Os outros dois são versões
              mais fechadas do mesmo raio.
            </p>
          </div>
          <div className="grid max-w-3xl grid-cols-3 gap-4">
            {radii.map((item) => (
              <div key={item.name} className="space-y-3">
                <div className={`border border-border bg-card p-4 ${item.className}`}>
                  <div
                    className={`flex h-10 items-center justify-center bg-primary text-sm font-medium text-primary-foreground ${item.className}`}
                  >
                    Botão
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {item.name} · {item.size}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export const Reference: Story = {
  render: () => <TokensReference />,
};
