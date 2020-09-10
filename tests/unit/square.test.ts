import { Square } from "@/lib/square.ts";

describe("square.ts", () => {
  it("test", () => {
    const number = 1;
    const square = new Square(1);
    expect(square.number).toBe(number);
  });
});
