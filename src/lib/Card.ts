import { CardInfo } from "./CardInfo";

type Square = { value: number; hasPunchedOut: boolean };
type Squares = [
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square
];
type Column = [Square, Square, Square, Square, Square];
type Columns = [Column, Column, Column, Column, Column];

export enum BingoLine {
  Horizontal0 = "Horizontal0",
  Horizontal1 = "Horizontal1",
  Horizontal2 = "Horizontal2",
  Horizontal3 = "Horizontal3",
  Horizontal4 = "Horizontal4",
  Vertical0 = "Vertical0",
  Vertical1 = "Vertical1",
  Vertical2 = "Vertical2",
  Vertical3 = "Vertical3",
  Vertical4 = "Vertical4",
  Diagonal0 = "Diagonal0",
  Diagonal1 = "Diagonal1"
}

const bingoLineMap = new Map([
  [BingoLine.Horizontal0, [0, 1, 2, 3, 4]],
  [BingoLine.Horizontal1, [5, 6, 7, 8, 9]],
  [BingoLine.Horizontal2, [10, 11, 12, 13, 14]],
  [BingoLine.Horizontal3, [15, 16, 17, 18, 19]],
  [BingoLine.Horizontal4, [20, 21, 22, 23, 24]],
  [BingoLine.Vertical0, [0, 5, 10, 15, 20]],
  [BingoLine.Vertical1, [1, 6, 11, 16, 21]],
  [BingoLine.Vertical2, [2, 7, 12, 17, 22]],
  [BingoLine.Vertical3, [3, 8, 13, 18, 23]],
  [BingoLine.Vertical4, [4, 9, 14, 19, 24]],
  [BingoLine.Diagonal0, [0, 6, 12, 18, 24]],
  [BingoLine.Diagonal1, [4, 8, 12, 16, 20]]
]);

export class Card {
  private readonly _columns: Columns;

  constructor(card: CardInfo) {
    const isValid = (value: number, min: number, max: number) =>
      Number.isInteger(value) && min <= value && value <= max;

    const isDuplicate = (values: [number, number, number, number, number]) => {
      const set = new Set(values);
      return values.length !== set.size;
    };

    if (!card.b.every(n => isValid(n, 1, 15)) && !isDuplicate(card.b)) {
      throw new RangeError();
    }

    if (!card.i.every(n => isValid(n, 16, 30)) && !isDuplicate(card.i)) {
      throw new RangeError();
    }

    if (!card.n.every(n => isValid(n, 31, 45)) && !isDuplicate(card.n)) {
      throw new RangeError();
    }

    if (!card.g.every(n => isValid(n, 46, 60)) && !isDuplicate(card.g)) {
      throw new RangeError();
    }

    if (!card.o.every(n => isValid(n, 61, 75)) && !isDuplicate(card.o)) {
      throw new RangeError();
    }

    this._columns = [
      card.b.map(n => ({ value: n, hasPunchedOut: false })) as Column,
      card.i.map(n => ({ value: n, hasPunchedOut: false })) as Column,
      card.n.map(n => ({ value: n, hasPunchedOut: false })) as Column,
      card.g.map(n => ({ value: n, hasPunchedOut: false })) as Column,
      card.o.map(n => ({ value: n, hasPunchedOut: false })) as Column
    ];
  }

  public get b(): Readonly<Column> {
    return this._columns[0];
  }

  public get i(): Readonly<Column> {
    return this._columns[1];
  }

  public get n(): Readonly<Column> {
    return this._columns[2];
  }

  public get g(): Readonly<Column> {
    return this._columns[3];
  }

  public get o(): Readonly<Column> {
    return this._columns[4];
  }

  public get columns(): Readonly<Columns> {
    return this._columns;
  }

  public get squares(): Readonly<Squares> {
    return this._columns
      .map(c => c as Array<Square>)
      .reduce((p, n) => p.concat(n)) as Squares;
  }

  public get bingoLines(): ReadonlyArray<BingoLine> {
    return [...bingoLineMap]
      .filter(([, value]) => value.every(i => this.squares[i].hasPunchedOut))
      .map(([key]) => key);
  }

  public get bingoCount(): number {
    return this.bingoLines.length;
  }

  public get isBingo(): boolean {
    return this.bingoCount !== 0;
  }

  public tryPunchOut(value: number): boolean {
    const square = this.squares.find(s => s.value == value);
    if (square) {
      square.hasPunchedOut = true;
      return true;
    } else {
      return false;
    }
  }

  public export(): CardInfo {
    return {
      b: [
        this.b[0].value,
        this.b[1].value,
        this.b[2].value,
        this.b[3].value,
        this.b[4].value
      ],
      i: [
        this.i[0].value,
        this.i[1].value,
        this.i[2].value,
        this.i[3].value,
        this.i[4].value
      ],
      n: [
        this.n[0].value,
        this.n[1].value,
        this.n[2].value,
        this.n[3].value,
        this.n[4].value
      ],
      g: [
        this.g[0].value,
        this.g[1].value,
        this.g[2].value,
        this.g[3].value,
        this.g[4].value
      ],
      o: [
        this.o[0].value,
        this.o[1].value,
        this.o[2].value,
        this.o[3].value,
        this.o[4].value
      ]
    };
  }
}
