import { Bingo } from '@/lib/Bingo';
import { CardInfo } from '@/lib/CardInfo';

describe('Bingo.ts', () => {
  it('constructor', () => {
    const bingo = new Bingo();
    expect(bingo.cards.length).toBe(0);
    expect(bingo.history.size).toBe(0);
    expect(bingo.canUndo).toBe(false);
    expect(bingo.canRedo).toBe(false);
  });

  it('add and remove cards', () => {
    const bingo = new Bingo();
    expect(bingo.cards.length).toBe(0);

    const cardInfo: CardInfo = {
      b: [1, 2, 3, 4, 5],
      i: [16, 17, 18, 19, 20],
      n: [31, 32, 33, 34, 45],
      g: [46, 47, 48, 49, 50],
      o: [61, 62, 63, 64, 65]
    };
    bingo.addCard(cardInfo);
    expect(bingo.cards.length).toBe(1);
    for (let i = 0; i < 5; i++) {
      const card = bingo.cards[0];
      expect(card.b[i].value).toBe(cardInfo.b[i]);
      expect(card.i[i].value).toBe(cardInfo.i[i]);
      expect(card.n[i].value).toBe(cardInfo.n[i]);
      expect(card.g[i].value).toBe(cardInfo.g[i]);
      expect(card.o[i].value).toBe(cardInfo.o[i]);
    }

    bingo.addCard(cardInfo);
    expect(bingo.cards.length).toBe(2);
    bingo.addCard(cardInfo);
    expect(bingo.cards.length).toBe(3);
    bingo.removeCard();
    expect(bingo.cards.length).toBe(2);
    bingo.removeCardAt(1);
    expect(bingo.cards.length).toBe(1);
    bingo.clearCards();
    expect(bingo.cards.length).toBe(0);

    bingo.addHistory(1);

    bingo.addCard(cardInfo);

    for (const card of bingo.cards) {
      expect(card.b[0].hasPunchedOut).toBe(true);
    }
  });

  it('add and clear history', () => {
    const bingo = new Bingo();
    const cardInfo: CardInfo = {
      b: [1, 2, 3, 4, 5],
      i: [16, 17, 18, 19, 20],
      n: [31, 32, 33, 34, 45],
      g: [46, 47, 48, 49, 50],
      o: [61, 62, 63, 64, 65]
    };
    bingo.addCard(cardInfo);
    expect(bingo.history.size).toBe(0);
    bingo.addHistory(1);
    expect(bingo.history.size).toBe(1);
    expect(bingo.history.has(1)).toBe(true);
    expect(bingo.cards[0].b[0].hasPunchedOut).toBe(true);

    bingo.clearHistory();
    expect(bingo.history.size).toBe(0);
    expect(bingo.history.has(1)).toBe(false);
  });

  it('undo and redo', () => {
    const bingo = new Bingo();
    const cardInfo: CardInfo = {
      b: [1, 2, 3, 4, 5],
      i: [16, 17, 18, 19, 20],
      n: [31, 32, 33, 34, 45],
      g: [46, 47, 48, 49, 50],
      o: [61, 62, 63, 64, 65]
    };
    bingo.addCard(cardInfo);
    expect(bingo.history.size).toBe(0);
    expect(bingo.canUndo).toBe(false);
    expect(bingo.canRedo).toBe(false);

    bingo.addHistory(1);
    expect(bingo.history.size).toBe(1);
    expect(bingo.history.has(1)).toBe(true);
    expect(bingo.cards[0].b[0].hasPunchedOut).toBe(true);
    expect(bingo.canUndo).toBe(true);
    expect(bingo.canRedo).toBe(false);

    bingo.addHistory(2);
    expect(bingo.history.size).toBe(2);
    expect(bingo.history.has(2)).toBe(true);
    expect(bingo.cards[0].b[1].hasPunchedOut).toBe(true);
    expect(bingo.canUndo).toBe(true);
    expect(bingo.canRedo).toBe(false);

    bingo.undo();
    expect(bingo.history.size).toBe(1);
    expect(bingo.history.has(2)).toBe(false);
    expect(bingo.cards[0].b[2].hasPunchedOut).toBe(false);
    expect(bingo.canUndo).toBe(true);
    expect(bingo.canRedo).toBe(true);

    bingo.undo();
    expect(bingo.history.size).toBe(0);
    expect(bingo.history.has(1)).toBe(false);
    expect(bingo.cards[0].b[1].hasPunchedOut).toBe(false);
    expect(bingo.canUndo).toBe(false);
    expect(bingo.canRedo).toBe(true);

    bingo.redo();
    expect(bingo.history.size).toBe(1);
    expect(bingo.history.has(1)).toBe(true);
    expect(bingo.cards[0].b[0].hasPunchedOut).toBe(true);
    expect(bingo.canUndo).toBe(true);
    expect(bingo.canRedo).toBe(true);

    bingo.redo();
    expect(bingo.history.size).toBe(2);
    expect(bingo.history.has(2)).toBe(true);
    expect(bingo.cards[0].b[1].hasPunchedOut).toBe(true);
    expect(bingo.canUndo).toBe(true);
    expect(bingo.canRedo).toBe(false);
  });

  describe('export', () => {
    const bingo = new Bingo();
    expect(bingo.export()).toEqual({ cards: [], history: [] });

    const cardInfo: CardInfo = {
      b: [1, 2, 3, 4, 5],
      i: [16, 17, 18, 19, 20],
      n: [31, 32, 33, 34, 45],
      g: [46, 47, 48, 49, 50],
      o: [61, 62, 63, 64, 65]
    };
    bingo.addCard(cardInfo);
    bingo.addCard(cardInfo);
    expect(bingo.export()).toEqual({
      cards: [cardInfo, cardInfo],
      history: []
    });

    bingo.addHistory(1);
    bingo.addHistory(2);
    bingo.addHistory(3);
    bingo.addHistory(4);
    bingo.addHistory(5);
    expect(bingo.export()).toEqual({
      cards: [cardInfo, cardInfo],
      history: [1, 2, 3, 4, 5]
    });
  });
});
