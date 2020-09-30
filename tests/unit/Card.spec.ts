import { Card } from '@/lib/Card';
import { CardInfo } from '@/lib/CardInfo';

describe('Card.ts', () => {
  describe('constructor', () => {
    const cardInfo: CardInfo = {
      b: [1, 2, 3, 4, 5],
      i: [16, 17, 18, 19, 20],
      n: [31, 32, 33, 34, 45],
      g: [46, 47, 48, 49, 50],
      o: [61, 62, 63, 64, 65]
    };

    const card = new Card(cardInfo);

    it('cardInfoと一致しているか', () => {
      expect(card.b.map(s => s.value)).toEqual(cardInfo.b);
      expect(card.i.map(s => s.value)).toEqual(cardInfo.i);
      expect(card.n.map(s => s.value)).toEqual(cardInfo.n);
      expect(card.g.map(s => s.value)).toEqual(cardInfo.g);
      expect(card.o.map(s => s.value)).toEqual(cardInfo.o);
    });

    it('columnsとb, i, n, g, oが一致しているか', () => {
      expect(card.columns[0]).toBe(card.b);
      expect(card.columns[1]).toBe(card.i);
      expect(card.columns[2]).toBe(card.n);
      expect(card.columns[3]).toBe(card.g);
      expect(card.columns[4]).toBe(card.o);
    });

    it('b, i, n, g, oとsquaresが一致しているか', () => {
      expect(card.b).toEqual(card.squares.slice(0, 5));
      expect(card.i).toEqual(card.squares.slice(5, 10));
      expect(card.n).toEqual(card.squares.slice(10, 15));
      expect(card.g).toEqual(card.squares.slice(15, 20));
      expect(card.o).toEqual(card.squares.slice(20, 25));
    });

    it('square.hasPunchedOutの初期値がfalseとなっているか', () => {
      for (const square of card.squares) {
        expect(square.hasPunchedOut).toBe(false);
      }
    });

    it('card.bingoLines.lengthの初期値が0となっているか', () => {
      expect(card.bingoLines.length).toBe(0);
    });

    it('card.bingoCountの初期値が0となっているか', () => {
      expect(card.bingoCount).toBe(0);
    });

    it('card.isBingoの初期値がfalseとなっているか', () => {
      expect(card.bingoLines.length).toBe(0);
    });
  });

  describe('isBingo', () => {
    const bingoPatterns = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20]
    ];

    const cardInfo: CardInfo = {
      b: [1, 2, 3, 4, 5],
      i: [16, 17, 18, 19, 20],
      n: [31, 32, 33, 34, 45],
      g: [46, 47, 48, 49, 50],
      o: [61, 62, 63, 64, 65]
    };

    for (const pattern of bingoPatterns) {
      const card = new Card(cardInfo);
      expect(card.isBingo).toBe(false);
      for (const patternIndex of pattern) {
        const value = card.squares[patternIndex].value;
        card.tryPunchOut(value);
      }
      expect(card.isBingo).toBe(true);
    }
  });

  describe('isBingo', () => {
    const bingoPatterns = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20]
    ];

    const cardInfo: CardInfo = {
      b: [1, 2, 3, 4, 5],
      i: [16, 17, 18, 19, 20],
      n: [31, 32, 33, 34, 45],
      g: [46, 47, 48, 49, 50],
      o: [61, 62, 63, 64, 65]
    };

    for (let i = 1; i < 6; i++) {
      const patterns = bingoPatterns.slice(0, i);
      const card = new Card(cardInfo);
      expect(card.bingoCount).toBe(0);
      for (const pattern of patterns) {
        for (const patternIndex of pattern) {
          const value = card.squares[patternIndex].value;
          card.tryPunchOut(value);
        }
      }
      if (i === 5) {
        expect(card.bingoCount).toBe(12);
      } else {
        expect(card.bingoCount).toBe(i);
      }
    }
  });
  describe('export', () => {
    const cardInfo: CardInfo = {
      b: [1, 2, 3, 4, 5],
      i: [16, 17, 18, 19, 20],
      n: [31, 32, 33, 34, 45],
      g: [46, 47, 48, 49, 50],
      o: [61, 62, 63, 64, 65]
    };

    const card = new Card(cardInfo);

    it('exportできているか', () => {
      expect(card.export()).toEqual(cardInfo);
    });
  });
});
