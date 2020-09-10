export class Square {
  private _number = 1;

  constructor(number: number) {
    this.number = number;
  }

  public get number(): number {
    return this._number;
  }
  public set number(number: number) {
    if (number < 1 && 75 < number) {
      throw new Error("out of range");
    }
    this._number = number;
  }
}
