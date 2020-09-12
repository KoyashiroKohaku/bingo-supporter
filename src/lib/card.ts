import { Column } from "./column";
import { ColumnType } from "./columnType";
import { Square } from "./square";
import { CardInfo } from "./cardInfo";

export class Card {
  private static readonly bingoPatterns = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];

  private readonly _b: Column;
  private readonly _i: Column;
  private readonly _n: Column;
  private readonly _g: Column;
  private readonly _o: Column;

  constructor(cardInfo: CardInfo) {
    const squareLength = 5;

    if (
      cardInfo.b.length != squareLength ||
      cardInfo.i.length != squareLength ||
      cardInfo.n.length != squareLength ||
      cardInfo.g.length != squareLength ||
      cardInfo.o.length != squareLength
    ) {
      throw new RangeError();
    }

    this._b = new Column(ColumnType.b, cardInfo.b);
    this._i = new Column(ColumnType.i, cardInfo.i);
    this._n = new Column(ColumnType.n, cardInfo.n);
    this._g = new Column(ColumnType.g, cardInfo.g);
    this._o = new Column(ColumnType.o, cardInfo.o);
  }

  public get b(): Column {
    return this._b;
  }

  public get i(): Column {
    return this._i;
  }

  public get n(): Column {
    return this._n;
  }

  public get g(): Column {
    return this._g;
  }

  public get o(): Column {
    return this._o;
  }

  public get columns(): ReadonlyArray<Column> {
    return [this._b, this._i, this._n, this._g, this._o];
  }

  public get squares(): ReadonlyArray<Square> {
    return this.columns.map((c) => c.squares).reduce((p, n) => p.concat(n));
  }

  public get bingoCount(): number {
    return Card.bingoPatterns.filter((b) =>
      b.every((i) => this.squares[i].hasPunchedOut)
    ).length;
  }

  public get isBingo(): boolean {
    return this.bingoCount !== 0;
  }
}
