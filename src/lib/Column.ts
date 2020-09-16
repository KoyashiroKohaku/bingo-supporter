import { Square } from "./square";
import { ColumnType } from "./columnType";

export class Column {
  private readonly _columnType: ColumnType;
  private readonly _squares: Array<Square>;

  constructor(columnType: ColumnType, numbers: Array<number>) {
    if (numbers.length !== 5) {
      throw new RangeError();
    }

    this._columnType = columnType;
    this._squares = [
      new Square(columnType, numbers[0]),
      new Square(columnType, numbers[1]),
      new Square(columnType, numbers[2]),
      new Square(columnType, numbers[3]),
      new Square(columnType, numbers[4])
    ];
  }

  public get columnType(): ColumnType {
    return this._columnType;
  }

  public get squares(): ReadonlyArray<Square> {
    return this._squares;
  }
}
