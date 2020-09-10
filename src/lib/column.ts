import { Square } from "./square";

export enum ColumnType {
  b,
  i,
  n,
  g,
  o
}

function createColumns(columnType: ColumnType) {
  switch (columnType) {
    case ColumnType.b:
      return [
        new Square(1),
        new Square(2),
        new Square(3),
        new Square(4),
        new Square(5)
      ];
      break;
    case ColumnType.i:
      return [
        new Square(16),
        new Square(17),
        new Square(18),
        new Square(19),
        new Square(20)
      ];
      break;
    case ColumnType.n:
      return [
        new Square(31),
        new Square(32),
        new Square(33),
        new Square(34),
        new Square(35)
      ];
      break;
    case ColumnType.g:
      return [
        new Square(46),
        new Square(47),
        new Square(48),
        new Square(49),
        new Square(50)
      ];
      break;
    case ColumnType.o:
      return [
        new Square(61),
        new Square(62),
        new Square(63),
        new Square(64),
        new Square(65)
      ];
      break;
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

  public get squares(): Array<Square> {
    return this._squares;
  }
}
