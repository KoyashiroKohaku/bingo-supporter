import { Column } from "./column";
import { ColumnType } from "./columnType";
import { Square } from "./square";
import { CardInfo } from "./cardInfo";

export class Card {
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

  public get squares(): ReadonlyArray<Square> {
    return this.columns.map((c) => c.squares).reduce((p, n) => p.concat(n));
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

  public get isBingo(): boolean {
    return false;
  }
}
