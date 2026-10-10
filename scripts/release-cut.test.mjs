import { describe, expect, it } from "vitest";

import {
  bumpLevel,
  bumpVersion,
  cutChangelog,
  hasNewBullet,
  hasReleaseNotes,
} from "./release-cut.mjs";

const changelog = `# Changelog

## [Unreleased]

### Added

- Componente ScrollArea.

## [0.2.0] - 2026-10-10

### Added

- Componente Slider.
`;

describe("release cut", () => {
  it("detects unreleased bullets", () => {
    expect(hasReleaseNotes(changelog)).toBe(true);
    expect(hasReleaseNotes("## [Unreleased]\n\n## [0.2.0] - 2026-10-10\n")).toBe(false);
  });

  it("requires a bullet that the base does not have", () => {
    const head = changelog.replace(
      "- Componente ScrollArea.",
      "- Componente ScrollArea.\n- Merge passa a cortar a release."
    );
    expect(hasNewBullet(changelog, head)).toBe(true);
    expect(hasNewBullet(changelog, changelog)).toBe(false);
  });

  it("bumps feat to minor, fix to patch, and breaking to major", () => {
    expect(bumpLevel(["fix: ajustar texto"])).toBe("patch");
    expect(bumpLevel(["Merge pull request #3", "feat: adicionar componente"])).toBe(
      "minor"
    );
    expect(bumpLevel(["feat!: remover prop", "fix: typo"])).toBe("major");
    expect(bumpVersion("0.2.0", "minor")).toBe("0.3.0");
    expect(bumpVersion("0.2.0", "patch")).toBe("0.2.1");
    expect(bumpVersion("0.2.0", "major")).toBe("1.0.0");
  });

  it("moves unreleased notes into the next version", () => {
    expect(cutChangelog(changelog, "0.3.0", "2026-10-10")).toBe(`# Changelog

## [Unreleased]

## [0.3.0] - 2026-10-10

### Added

- Componente ScrollArea.

## [0.2.0] - 2026-10-10

### Added

- Componente Slider.
`);
  });
});
