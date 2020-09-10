import { Card } from "./card";

export class Bingo {
  private readonly _cards: Array<Card> = [];
  private readonly _history: Set<number> = new Set<number>();

  public get cards(): ReadonlyArray<Card> {
    return this._cards;
  }

  public get history(): ReadonlySet<number> {
    return this._history;
  }

  public addCard(): void {
    this._cards.push(new Card(this._history));
  }

  public removeCard(): void {
    this._cards.pop();
  }

  public removeCardAt(index: number): void {
    this._cards.slice(index, 1);
  }

  public clearCards(): void {
    this._cards.length = 0;
  }

  public addHistory(number: number): void {
    this._history.add(number);
  }

  public removeHistory(number: number): void {
    this._history.delete(number);
  }

  public clearHistory(): void {
    this._history.clear();
  }
}
