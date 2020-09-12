import { Card } from "./card";
import { CardInfo } from './cardInfo';

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
    this._cards.push(new Card(cardInfo));
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

  public addHistory(number: number): void {
    if (!(1 <= number && number <= 75)) {
      throw new RangeError();
    }

    for (const card of this._cards) {
      for (const square of card.squares) {
        if (square.number === number) {
          square.punchOut();
          break;
        }
      }
    }

    this._history.add(number);
  }

  public removeHistory(number: number): void {
    this._history.delete(number);
  }

  public clearHistory(): void {
    this._history.clear();
  }
}
