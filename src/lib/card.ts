import { Column } from "./column";
import { ColumnType } from "./columnType";
import { Square } from "./square";
import { CardInfo } from "./cardInfo";

export class Card {
  private readonly _columns: Array<Column> = [
    new Column(ColumnType.b),
    new Column(ColumnType.i),
    new Column(ColumnType.n),
    new Column(ColumnType.g),
    new Column(ColumnType.o)
  ];

  constructor(cardInfo: CardInfo) {
    if (
      cardInfo.b.length != 5 ||
      cardInfo.i.length != 5 ||
      cardInfo.n.length != 5 ||
      cardInfo.g.length != 5 ||
      cardInfo.o.length != 5
    ) {
      throw new RangeError();
    }

    // b
    for (let i = 0; i < 5; i++) {
      const number = cardInfo.b[i];
      const square = this.b.squares[i];

      square.number = number;
    }

    // i
    for (let i = 0; i < 5; i++) {
      const number = cardInfo.i[i];
      const square = this.i.squares[i];

      square.number = number;
    }

    // n
    for (let i = 0; i < 5; i++) {
      const number = cardInfo.n[i];
      const square = this.n.squares[i];

      square.number = number;
    }

    // g
    for (let i = 0; i < 5; i++) {
      const number = cardInfo.g[i];
      const square = this.g.squares[i];

      square.number = number;
    }

    // o
    for (let i = 0; i < 5; i++) {
      const number = cardInfo.o[i];
      const square = this.o.squares[i];

      square.number = number;
    }
  }

  public get squares(): ReadonlyArray<Square> {
    return this.columns.map(c => c.squares).reduce((p, n) => p.concat(n));
  }

  public get columns(): ReadonlyArray<Column> {
    return this._columns;
  }

  public get b(): Column {
    return this.columns[0];
  }

  public get i(): Column {
    return this.columns[1];
  }

  public get n(): Column {
    return this.columns[2];
  }

  public get g(): Column {
    return this.columns[3];
  }

  public get o(): Column {
    return this.columns[4];
  }

  public get isBingo(): boolean {
    return false;
  }
}
