import { describe, it, expect } from "vitest";
import { binarySearch } from "./binarySearch";

describe("binarySearch", () => {
  it("should return index of searched element in array of numbers", () => {
    expect(binarySearch([1, 2, 4, 15, 33, 123, 567], 123)).toEqual(5);
  });

  it("should return index of searched element in array of objects", () => {
    expect(
      binarySearch(
        [
          { id: 1 },
          { id: 2 },
          { id: 4 },
          { id: 15 },
          { id: 33 },
          { id: 123 },
          { id: 567 },
        ],
        { id: 123 },
        (a, b) => (a.id === b.id ? 0 : a.id > b.id ? 1 : -1)
      )
    ).toEqual(5);
  });
});
