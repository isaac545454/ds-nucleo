import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

function renderTabs(props: Partial<React.ComponentProps<typeof Tabs>> = {}) {
  return render(
    <Tabs defaultValue="conta" {...props}>
      <TabsList>
        <TabsTrigger value="conta">Conta</TabsTrigger>
        <TabsTrigger value="senha">Senha</TabsTrigger>
      </TabsList>
      <TabsContent value="conta">Dados da conta</TabsContent>
      <TabsContent value="senha">Alterar senha</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("shows only the default tab panel", () => {
    renderTabs();

    expect(screen.getByText("Dados da conta")).toBeInTheDocument();
    expect(screen.queryByText("Alterar senha")).not.toBeInTheDocument();
  });

  it("marks the active trigger as selected", () => {
    renderTabs();

    expect(screen.getByRole("tab", { name: "Conta" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("switches panels on click and reports the new value", async () => {
    const onValueChange = vi.fn();
    renderTabs({ onValueChange });

    await userEvent.click(screen.getByRole("tab", { name: "Senha" }));

    expect(onValueChange).toHaveBeenCalledWith("senha");
    expect(screen.getByText("Alterar senha")).toBeInTheDocument();
    expect(screen.queryByText("Dados da conta")).not.toBeInTheDocument();
  });

  it("moves between tabs with the arrow keys", async () => {
    renderTabs();

    screen.getByRole("tab", { name: "Conta" }).focus();
    await userEvent.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: "Senha" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
});
