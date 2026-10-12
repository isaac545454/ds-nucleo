import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { describeColor, parseTokenDoc } from "../../.storybook/parse-tokens";

const fixture = `
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --border: 240 3.7% 15.9%;
  }
}
`;

describe("describeColor", () => {
  it("traduz o HSL para um nome e um hexadecimal", () => {
    expect(describeColor("0 0% 100%")).toEqual({ name: "Branco", hex: "#FFFFFF" });
    expect(describeColor("0 0% 98%")).toEqual({
      name: "Quase branco",
      hex: "#FAFAFA",
    });
    expect(describeColor("240 10% 3.9%")).toEqual({
      name: "Preto",
      hex: "#09090B",
    });
    expect(describeColor("240 5.9% 10%")).toEqual({
      name: "Quase preto",
      hex: "#18181B",
    });
    expect(describeColor("0 84.2% 60.2%")).toEqual({
      name: "Vermelho",
      hex: "#EF4444",
    });
    expect(describeColor("0 62.8% 30.6%")).toEqual({
      name: "Vermelho escuro",
      hex: "#7F1D1D",
    });
  });
});

describe("parseTokenDoc", () => {
  it("agrupa pares de cor, tokens avulsos e primitivos", () => {
    const doc = parseTokenDoc(fixture);

    expect(
      doc.colors.map((entry) =>
        entry.kind === "pair" ? entry.base.name : entry.token.name,
      ),
    ).toEqual(["background", "primary", "border"]);
    expect(doc.colors[0]).toMatchObject({
      kind: "pair",
      utility: "bg-background text-foreground",
      foreground: { name: "foreground", dark: "0 0% 98%" },
    });
    expect(doc.colors[2]).toMatchObject({
      kind: "single",
      utility: "border-border",
    });
    expect(doc.primitives).toEqual([
      {
        name: "radius",
        variable: "--radius",
        light: "0.5rem",
        dark: null,
      },
    ]);
  });

  it("lê os tokens reais de styles.css", () => {
    const css = readFileSync(resolve(import.meta.dirname, "../styles.css"), "utf8");
    const doc = parseTokenDoc(css);
    const names = doc.colors.map((entry) =>
      entry.kind === "pair" ? entry.base.name : entry.token.name,
    );

    expect(names).toEqual([
      "background",
      "card",
      "popover",
      "primary",
      "secondary",
      "muted",
      "accent",
      "destructive",
      "border",
      "input",
      "ring",
    ]);
    expect(doc.primitives.map((token) => token.name)).toEqual(["radius"]);

    const background = doc.colors.find(
      (entry) => entry.kind === "pair" && entry.base.name === "background",
    );
    const destructive = doc.colors.find(
      (entry) => entry.kind === "pair" && entry.base.name === "destructive",
    );
    expect(background?.kind === "pair" && describeColor(background.base.light)).toEqual({
      name: "Branco",
      hex: "#FFFFFF",
    });
    expect(
      destructive?.kind === "pair" && describeColor(destructive.base.light),
    ).toEqual({
      name: "Vermelho",
      hex: "#EF4444",
    });
  });
});
