import { Card } from "./Card";
import { CardInfo } from "./CardInfo";

export class Bingo {
  private readonly _cards: Array<Card> = new Array<Card>();
  private readonly _history: Set<number> = new Set<number>();

  public get cards(): ReadonlyArray<Card> {
    return this._cards;
  }

  public get history(): ReadonlySet<number> {
    return this._history;
  }

  public addCard(cardInfo: CardInfo): void {
    const card = new Card(cardInfo);

    for (const value of this._history) {
      card.tryPunchOut(value);
    }

    this._cards.push(card);
  }

  public removeCard(): void {
    this._cards.pop();
  }

  public removeCardAt(index: number): void {
    this._cards.splice(index, 1);
  }

  public clearCards(): void {
    this._cards.length = 0;
  }

  public addHistory(value: number): void {
    if (!(1 <= value && value <= 75) && Number.isInteger(value)) {
      throw new RangeError();
    }

    for (const card of this._cards) {
      card.tryPunchOut(value);
    }

    this._history.add(value);
  }

  public removeHistory(value: number): boolean {
    return this._history.delete(value);
  }

  public clearHistory(): void {
    this._history.clear();
  }
}
