import { Column } from "@/lib/column";
import { ColumnType } from "@/lib/columnType";

describe("column.ts", () => {
  it("constructor", () => {
    // b
    const columnB = new Column(ColumnType.b, [1, 2, 3, 4, 5]);
    expect(columnB.columnType).toBe(ColumnType.b);
    expect(columnB.squares.length).toBe(5);

    // i
    const columnI = new Column(ColumnType.i, [16, 17, 18, 19, 20]);
    expect(columnI.columnType).toBe(ColumnType.i);
    expect(columnI.squares.length).toBe(5);

    // n
    const columnN = new Column(ColumnType.n, [31, 32, 33, 34, 35]);
    expect(columnN.columnType).toBe(ColumnType.n);
    expect(columnN.squares.length).toBe(5);

    // g
    const columnG = new Column(ColumnType.g, [46, 47, 48, 49, 50]);
    expect(columnG.columnType).toBe(ColumnType.g);
    expect(columnG.squares.length).toBe(5);

    // o
    const columnO = new Column(ColumnType.o, [61, 62, 63, 64, 65]);
    expect(columnO.columnType).toBe(ColumnType.o);
    expect(columnO.squares.length).toBe(5);
  });
});
