import { Card } from './Card';
import { BingoInfo } from './BingoInfo';
import { CardInfo } from './CardInfo';

export class Bingo {
  private readonly _cards: Array<Card> = new Array<Card>();
  private readonly _history: Set<number> = new Set<number>();
  private readonly _redoHistory: Set<number> = new Set<number>();

  public get cards(): ReadonlyArray<Card> {
    return this._cards;
  }

  public get history(): ReadonlySet<number> {
    return this._history;
  }

  public get canUndo(): boolean {
    return [...this._history].pop() !== undefined;
  }

  public get canRedo(): boolean {
    return [...this._redoHistory].pop() !== undefined;
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

    for (const card of this._cards) {
      for (const column of card.columns) {
        for (const square of column) {
          square.hasPunchedOut = false;
        }
      }
    }
  }

  public undo(): boolean {
    const value = [...this._history].pop();

    if (!value) {
      return false;
    }

    this._history.delete(value);
    this._redoHistory.add(value);

    for (const card of this._cards) {
      for (const square of card.squares.filter(s => s.value === value)) {
        square.hasPunchedOut = false;
      }
    }

    return true;
  }

  public redo(): boolean {
    const value = [...this._redoHistory].pop();

    if (!value) {
      return false;
    }

    this._redoHistory.delete(value);
    this.addHistory(value);

    return true;
  }

  public export(): BingoInfo {
    return {
      cards: this.cards.map(c => c.export()),
      history: [...this.history]
    };
  }

  public import(bingoInfo: BingoInfo): void {
    this.clearHistory();
    for (const value of bingoInfo.history) {
      this.addHistory(value);
    }

    this.clearCards();
    for (const cardInfo of bingoInfo.cards) {
      this.addCard(cardInfo);
    }
  }
}
