import { Square } from "./square";
import { ColumnType } from "./columnType";

function createColumns(columnType: ColumnType) {
  switch (columnType) {
    case ColumnType.b:
      return [
        new Square(ColumnType.b, 1),
        new Square(ColumnType.b, 2),
        new Square(ColumnType.b, 3),
        new Square(ColumnType.b, 4),
        new Square(ColumnType.b, 5)
      ];
    case ColumnType.i:
      return [
        new Square(ColumnType.i, 16),
        new Square(ColumnType.i, 17),
        new Square(ColumnType.i, 18),
        new Square(ColumnType.i, 19),
        new Square(ColumnType.i, 20)
      ];
    case ColumnType.n:
      return [
        new Square(ColumnType.n, 31),
        new Square(ColumnType.n, 32),
        new Square(ColumnType.n, 33),
        new Square(ColumnType.n, 34),
        new Square(ColumnType.n, 35)
      ];
    case ColumnType.g:
      return [
        new Square(ColumnType.g, 46),
        new Square(ColumnType.g, 47),
        new Square(ColumnType.g, 48),
        new Square(ColumnType.g, 49),
        new Square(ColumnType.g, 50)
      ];
    case ColumnType.o:
      return [
        new Square(ColumnType.o, 61),
        new Square(ColumnType.o, 62),
        new Square(ColumnType.o, 63),
        new Square(ColumnType.o, 64),
        new Square(ColumnType.o, 65)
      ];
  }
}

export class Column {
  private readonly _columnType: ColumnType;
  private readonly _squares: Array<Square>;

  constructor(columnType: ColumnType) {
    this._columnType = columnType;
    this._squares = createColumns(columnType);
  }

  public get columnType(): ColumnType {
    return this._columnType;
  }

  public get squares(): ReadonlyArray<Square> {
    return this._squares;
  }
}
