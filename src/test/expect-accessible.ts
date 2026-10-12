import axe from "axe-core";
import { expect } from "vitest";

// axe-core probes canvas while resolving colors. jsdom does not implement it,
// and contrast is disabled below because the theme stylesheet is not loaded.
HTMLCanvasElement.prototype.getContext = () => null;

/**
 * Page-level rules and color contrast do not apply to a component rendered in
 * jsdom: there is no document shell, and the theme stylesheet is not loaded.
 * Contrast stays with the Storybook a11y addon, which runs in a real browser.
 */
const rules = {
  "color-contrast": { enabled: false },
  region: { enabled: false },
  "page-has-heading-one": { enabled: false },
  "landmark-one-main": { enabled: false },
  bypass: { enabled: false },
  "document-title": { enabled: false },
  "html-has-lang": { enabled: false },
};

function summarize(violation: axe.Result) {
  const nodes = violation.nodes
    .map((node) => {
      const summary = node.failureSummary ? `\n    ${node.failureSummary}` : "";
      return `  ${node.html}${summary}`;
    })
    .join("\n");

  return `${violation.id} (${violation.impact}): ${violation.help}\n${nodes}`;
}

/** Asserts the current document has no axe-core violations. Portals included. */
export async function expectAccessible() {
  const { violations } = await axe.run(document.body, {
    rules,
    resultTypes: ["violations"],
  });

  expect(violations.map(summarize)).toEqual([]);
}
