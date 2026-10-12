import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Progress } from "./progress";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Percentual concluído (0 a 100).",
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 60 },
  render: (args) => (
    <div className="w-80 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span id="progress-upload" className="text-muted-foreground">
          Enviando arquivos
        </span>
        <span>{args.value ?? 0}%</span>
      </div>
      <Progress {...args} aria-labelledby="progress-upload" />
    </div>
  ),
};

function AnimatedProgress() {
  const [value, setValue] = React.useState(10);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setValue((current) => (current >= 100 ? 0 : current + 5));
    }, 400);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="w-80 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span id="progress-import" className="text-muted-foreground">
          Processando importação
        </span>
        <span>{value}%</span>
      </div>
      <Progress value={value} aria-labelledby="progress-import" />
    </div>
  );
}

export const Animated: Story = {
  render: () => <AnimatedProgress />,
};

export const Steps: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div className="space-y-2">
        <p id="progress-idle" className="text-sm text-muted-foreground">
          Não iniciado
        </p>
        <Progress value={0} aria-labelledby="progress-idle" />
      </div>
      <div className="space-y-2">
        <p id="progress-running" className="text-sm text-muted-foreground">
          Em andamento
        </p>
        <Progress value={50} aria-labelledby="progress-running" />
      </div>
      <div className="space-y-2">
        <p id="progress-done" className="text-sm text-muted-foreground">
          Concluído
        </p>
        <Progress value={100} aria-labelledby="progress-done" />
      </div>
    </div>
  ),
};
