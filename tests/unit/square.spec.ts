import { Square } from "@/lib/square.ts";
import { ColumnType } from "@/lib/columnType";

describe("square.ts", () => {
  it("constructor", () => {
    // -1 ~ 100
    const allRange = [...Array(102).keys()].map(i => i - 1);

    const columns = [
      {
        columnType: ColumnType.b,
        range: [...Array(15).keys()].map(i => i + 1)
      },
      {
        columnType: ColumnType.i,
        range: [...Array(15).keys()].map(i => i + 16)
      },
      {
        columnType: ColumnType.n,
        range: [...Array(15).keys()].map(i => i + 31)
      },
      {
        columnType: ColumnType.g,
        range: [...Array(15).keys()].map(i => i + 46)
      },
      {
        columnType: ColumnType.o,
        range: [...Array(15).keys()].map(i => i + 61)
      }
    ];

    for (const i of allRange) {
      for (const column of columns) {
        const square = new Square(column.columnType, column.range[0]);
        if (column.range.some(n => n === i)) {
          new Square(column.columnType, i);
          square.number = i;
          expect(square.number).toBe(i);
          expect(square.hasPunchedOut).toBe(false);
        } else {
          expect(() => new Square(column.columnType, i)).toThrowError(
            RangeError
          );
          expect(() => (square.number = i)).toThrowError(RangeError);
        }
      }
    }
  });

  it("punchOut", () => {
    const square = new Square(ColumnType.b, 1);
    expect(square.hasPunchedOut).toBe(false);
    square.punchOut();
    expect(square.hasPunchedOut).toBe(true);
    square.number = 1;
    expect(square.hasPunchedOut).toBe(false);
  });
});
