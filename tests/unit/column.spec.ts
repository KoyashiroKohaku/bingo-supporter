import { Column } from "@/lib/column";
import { ColumnType } from "@/lib/columnType";

describe("column.ts", () => {
  it("constructor", () => {
    // b
    const columnB = new Column(ColumnType.b);
    expect(columnB.columnType).toBe(ColumnType.b);
    expect(columnB.squares.length).toBe(5);

    // i
    const columnI = new Column(ColumnType.i);
    expect(columnI.columnType).toBe(ColumnType.i);
    expect(columnI.squares.length).toBe(5);

    // n
    const columnN = new Column(ColumnType.n);
    expect(columnN.columnType).toBe(ColumnType.n);
    expect(columnN.squares.length).toBe(5);

    // g
    const columnG = new Column(ColumnType.g);
    expect(columnG.columnType).toBe(ColumnType.g);
    expect(columnG.squares.length).toBe(5);

    // o
    const columnO = new Column(ColumnType.o);
    expect(columnO.columnType).toBe(ColumnType.o);
    expect(columnO.squares.length).toBe(5);
  });
});
