import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

function renderTable() {
  return render(
    <Table>
      <TableCaption>Faturas recentes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Fatura</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV-001</TableCell>
          <TableCell>R$ 250,00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-002</TableCell>
          <TableCell>R$ 150,00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>R$ 400,00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

describe("Table", () => {
  it("renders a semantic table with its caption", () => {
    renderTable();

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    expect(within(table).getByText("Faturas recentes")).toBeInTheDocument();
  });

  it("renders the column headers", () => {
    renderTable();

    expect(screen.getAllByRole("columnheader").map((h) => h.textContent)).toEqual(
      ["Fatura", "Valor"]
    );
  });

  it("renders one row per record plus header and footer rows", () => {
    renderTable();

    expect(screen.getAllByRole("row")).toHaveLength(4);
  });

  it("renders the footer totals", () => {
    renderTable();

    expect(screen.getByText("R$ 400,00")).toBeInTheDocument();
  });

  it("keeps the table horizontally scrollable via its wrapper", () => {
    renderTable();

    expect(screen.getByRole("table").parentElement).toHaveClass(
      "overflow-auto"
    );
  });
});
