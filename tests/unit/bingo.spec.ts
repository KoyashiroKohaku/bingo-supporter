import { Bingo } from "@/lib/bingo";

describe("bingo.ts", () => {
  it("constructor", () => {
    const bingo = new Bingo();
    expect(bingo.cards.length).toBe(0);
    expect(bingo.history.size).toBe(0);
  });

  it("add and remove cards", () => {
    const bingo = new Bingo();
    expect(bingo.cards.length).toBe(0);

    const cardInfo = {
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
      expect(card.b.squares[i].number).toBe(cardInfo.b[i]);
      expect(card.i.squares[i].number).toBe(cardInfo.i[i]);
      expect(card.n.squares[i].number).toBe(cardInfo.n[i]);
      expect(card.g.squares[i].number).toBe(cardInfo.g[i]);
      expect(card.o.squares[i].number).toBe(cardInfo.o[i]);
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
  });

  it("add and clear history", () => {
    const bingo = new Bingo();
    const cardInfo = {
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
    expect(bingo.cards[0].b.squares[0].hasPunchedOut).toBe(true);

    bingo.clearHistory();
    expect(bingo.history.size).toBe(0);
    expect(bingo.history.has(1)).toBe(false);
  });
});
