import type { Preview } from "@storybook/react-vite";

import "../src/styles.css";
import { allModes } from "./modes";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    chromatic: {
      modes: {
        light: allModes.light,
        dark: allModes.dark,
      },
      pauseAnimationAtEnd: true,
    },
    options: {
      storySort: {
        order: ["Foundations", "Forms", "Layout", "Overlays", "Feedback"],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Tema do Nucleus",
      defaultValue: "light",
      toolbar: {
        title: "Tema",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as string;
      document.documentElement.classList.toggle("dark", theme === "dark");
      return Story();
    },
  ],
};

export default preview;
