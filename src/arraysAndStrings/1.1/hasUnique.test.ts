import { describe, it, expect } from "vitest";
import { hasUnique, hasUniqueSort } from "./hasUnique";

describe("hasUnique", () => {
  it("should return true if all characters in string are unique", () => {
    expect(hasUnique("abcd")).toEqual(true);
  });

  it("should return false if all characters in string are not unique", () => {
    expect(hasUnique("abccd")).toEqual(false);
  });
});

describe("hasUniqueSort", () => {
  it("should return true if all characters in string are unique", () => {
    expect(hasUniqueSort("abcd")).toEqual(true);
  });

  it("should return false if all characters in string are not unique", () => {
    expect(hasUniqueSort("abccd")).toEqual(false);
  });
});