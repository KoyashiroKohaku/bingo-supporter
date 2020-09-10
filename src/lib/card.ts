import { Column, ColumnType } from "./column";
import { Square } from "./square";

export class Card {
  private readonly _columns: Array<Column> = [
    new Column(ColumnType.b),
    new Column(ColumnType.i),
    new Column(ColumnType.n),
    new Column(ColumnType.g),
    new Column(ColumnType.o)
  ];
  private readonly _history: Set<number>;

  constructor(history: Set<number>) {
    this._history = history;
  }

  private get squares(): ReadonlyArray<Square> {
    return this.columns.map(c => c.squares).reduce((p, n) => p.concat(n));
  }

  public get columns(): ReadonlyArray<Column> {
    return this._columns;
  }

  public get b(): Column {
    return this.columns[4];
  }

  public get i(): Column {
    return this.columns[0];
  }

  public get n(): Column {
    return this.columns[1];
  }

  public get g(): Column {
    return this.columns[2];
  }

  public get o(): Column {
    return this.columns[3];
  }

  public isBingo(): boolean {
    return false;
  }
}
