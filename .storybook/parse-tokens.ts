export type CssToken = {
  name: string;
  variable: string;
  light: string;
  dark: string | null;
};

export type ColorPair = {
  kind: "pair";
  base: CssToken;
  foreground: CssToken;
  utility: string;
};

export type ColorSingle = {
  kind: "single";
  token: CssToken;
  utility: string;
};

export type ColorEntry = ColorPair | ColorSingle;

export type TokenDoc = {
  colors: ColorEntry[];
  primitives: CssToken[];
};

const COLOR_VALUE = /^\d+(?:\.\d+)?\s+\d+(?:\.\d+)?%\s+\d+(?:\.\d+)?%$/;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readBlock(css: string, selector: string): Record<string, string> {
  const match = css.match(
    new RegExp(`(?:^|[\\s{}])${escapeRegExp(selector)}\\s*\\{([^}]*)\\}`, "m"),
  );
  if (!match) return {};

  const values: Record<string, string> = {};
  for (const found of match[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    values[found[1].slice(2)] = found[2].trim();
  }
  return values;
}

export function isColorValue(value: string) {
  return COLOR_VALUE.test(value);
}

export type NamedColor = {
  name: string;
  hex: string;
};

function hueName(hue: number) {
  if (hue < 15 || hue >= 345) return "Vermelho";
  if (hue < 40) return "Laranja";
  if (hue < 70) return "Amarelo";
  if (hue < 165) return "Verde";
  if (hue < 200) return "Ciano";
  if (hue < 255) return "Azul";
  if (hue < 290) return "Roxo";
  return "Rosa";
}

function neutralName(lightness: number) {
  if (lightness >= 99) return "Branco";
  if (lightness >= 96) return "Quase branco";
  if (lightness >= 93) return "Cinza bem claro";
  if (lightness >= 78) return "Cinza claro";
  if (lightness >= 55) return "Cinza médio";
  if (lightness >= 30) return "Cinza";
  if (lightness >= 12) return "Cinza escuro";
  if (lightness >= 6) return "Quase preto";
  return "Preto";
}

export function describeColor(value: string): NamedColor {
  const match = value.match(
    /^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/,
  );
  if (!match) return { name: value, hex: value };

  const hue = Number(match[1]);
  const saturation = Number(match[2]);
  const lightness = Number(match[3]);
  const s = saturation / 100;
  const l = lightness / 100;
  const a = s * Math.min(l, 1 - l);
  const channel = (n: number) => {
    const k = (n + hue / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  const hex = `#${channel(0)}${channel(8)}${channel(4)}`.toUpperCase();

  if (saturation < 18) return { name: neutralName(lightness), hex };

  const base = hueName(hue);
  if (lightness < 40) return { name: `${base} escuro`, hex };
  if (lightness > 72) return { name: `${base} claro`, hex };
  return { name: base, hex };
}

function singleUtility(name: string) {
  if (name === "border") return "border-border";
  if (name === "input") return "border-input";
  if (name === "ring") return "ring-ring";
  if (name === "foreground" || name.endsWith("-foreground")) return `text-${name}`;
  return `bg-${name}`;
}

function foregroundName(base: string) {
  return base === "background" ? "foreground" : `${base}-foreground`;
}

export function parseTokenDoc(css: string): TokenDoc {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const light = readBlock(source, ":root");
  const dark = readBlock(source, ".dark");

  const tokens: CssToken[] = Object.keys(light).map((name) => ({
    name,
    variable: `--${name}`,
    light: light[name],
    dark: dark[name] ?? null,
  }));

  const byName = new Map(tokens.map((token) => [token.name, token]));
  const consumed = new Set<string>();
  const colors: ColorEntry[] = [];
  const primitives: CssToken[] = [];

  for (const token of tokens) {
    if (!isColorValue(token.light)) {
      primitives.push(token);
      continue;
    }
    if (token.name === "foreground" || token.name.endsWith("-foreground")) {
      continue;
    }

    const foreground = byName.get(foregroundName(token.name));
    if (foreground && isColorValue(foreground.light)) {
      consumed.add(foreground.name);
      colors.push({
        kind: "pair",
        base: token,
        foreground,
        utility: `bg-${token.name} text-${foreground.name}`,
      });
      continue;
    }

    colors.push({
      kind: "single",
      token,
      utility: singleUtility(token.name),
    });
  }

  for (const token of tokens) {
    if (!isColorValue(token.light) || consumed.has(token.name)) continue;
    if (token.name !== "foreground" && !token.name.endsWith("-foreground")) continue;
    colors.push({
      kind: "single",
      token,
      utility: singleUtility(token.name),
    });
  }

  return { colors, primitives };
}
