import { describe, it, expect } from "vitest";
import { Graph, breadthFirstSearch } from "./breadthFirstSearch";

function setup() {
  const graph: Graph<number> = {
    nodes: {
      1: {
        id: 1,
        value: 5,
      },
      2: {
        id: 2,
        value: 5,
      },
      3: {
        id: 3,
        value: 5,
      },
      4: {
        id: 4,
        value: 5,
      },
      5: {
        id: 5,
        value: 5,
      },
      6: {
        id: 6,
        value: 15,
      },
      7: {
        id: 7,
        value: 5,
      },
    },
    edges: {
      1: new Set([2, 3]),
      2: new Set([1, 4, 5]),
      3: new Set([1, 6, 7]),
      4: new Set([2]),
      5: new Set([2]),
      6: new Set([3]),
      7: new Set([3]),
    },
  };

  return { graph };
}

describe("breadthFirstSearch", () => {
  it("should return found node in graph", () => {
    const { graph } = setup();
    expect(
      breadthFirstSearch(graph, 1, (node) => node.value > 10)
    ).toStrictEqual({
      id: 6,
      value: 15,
    });
  });

  it("should return undefined when node not found", () => {
    const { graph } = setup();
    expect(
      breadthFirstSearch(graph, 1, (node) => node.value > 20)
    ).toBeUndefined();
  });
});
