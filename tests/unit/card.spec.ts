import { Card } from "@/lib/card";

describe("bingo.ts", () => {
  it("constructor", () => {
    const cardInfo = {
      b: [1, 2, 3, 4, 5],
      i: [16, 17, 18, 19, 20],
      n: [31, 32, 33, 34, 45],
      g: [46, 47, 48, 49, 50],
      o: [61, 62, 63, 64, 65],
    };

    const card = new Card(cardInfo);

    expect(card.columns.length).toBe(5);
    expect(card.columns[0]).toBe(card.b);
    expect(card.columns[1]).toBe(card.i);
    expect(card.columns[2]).toBe(card.n);
    expect(card.columns[3]).toBe(card.g);
    expect(card.columns[4]).toBe(card.o);

    expect(card.squares.length).toBe(25);
    expect(card.b.squares).toEqual(card.squares.slice(0, 5));
    expect(card.i.squares).toEqual(card.squares.slice(5, 10));
    expect(card.n.squares).toEqual(card.squares.slice(10, 15));
    expect(card.g.squares).toEqual(card.squares.slice(15, 20));
    expect(card.o.squares).toEqual(card.squares.slice(20, 25));

    expect(card.isBingo).toBe(false);
  });
});
