import { describe, it, expect } from "vitest";
import { quickSort } from "./quickSort";

describe("quickSort", () => {
  it("should sort array of numbers", () => {
    expect(quickSort([42, 56, 213, 6, 78, 29, 1])).toStrictEqual([
      1, 6, 29, 42, 56, 78, 213,
    ]);
  });

  it("should sort array of objects using provided comparator", () => {
    expect(
      quickSort(
        [
          { id: 42 },
          { id: 56 },
          { id: 213 },
          { id: 6 },
          { id: 78 },
          { id: 29 },
          { id: 1 },
        ],
        (a, b) => (a.id === b.id ? 0 : a.id > b.id ? 1 : -1)
      )
    ).toStrictEqual([
      { id: 1 },
      { id: 6 },
      { id: 29 },
      { id: 42 },
      { id: 56 },
      { id: 78 },
      { id: 213 },
    ]);
  });
});
