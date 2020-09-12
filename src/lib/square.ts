import { ColumnType } from "./columnType";

export class Square {
  private readonly _columnType: ColumnType;
  private readonly _number: number;
  private _hasPunchedOut = false;

  constructor(columnType: ColumnType, number: number) {
    switch (columnType) {
      case ColumnType.b:
        if (!(1 <= number && number <= 15)) {
          throw new RangeError();
        }
        break;
      case ColumnType.i:
        if (!(16 <= number && number <= 30)) {
          throw new RangeError();
        }
        break;
      case ColumnType.n:
        if (!(31 <= number && number <= 45)) {
          throw new RangeError();
        }
        break;
      case ColumnType.g:
        if (!(46 <= number && number <= 60)) {
          throw new RangeError();
        }
        break;
      case ColumnType.o:
        if (!(61 <= number && number <= 75)) {
          throw new RangeError();
        }
        break;
      default:
        throw new RangeError();
    }

    this._columnType = columnType;
    this._number = number;
  }

  public get columnType(): ColumnType {
    return this._columnType;
  }

  public get number(): number {
    return this._number;
  }

  public get hasPunchedOut(): boolean {
    return this._hasPunchedOut;
  }

  public punchOut(): void {
    this._hasPunchedOut = true;
  }
}
