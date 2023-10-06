import { describe, it, expect } from "vitest";
import { Graph, dijkstra } from "./dijkstra";

function setup() {
  const graph: Graph = {
    nodes: {
      book: { id: "book" },
      disc: { id: "disc" },
      poster: { id: "poster" },
      bass: { id: "bass" },
      drums: { id: "drums" },
      piano: { id: "piano" },
    },
    edges: {
      book: { disc: 5, poster: 0 },
      disc: { bass: 15, drums: 20 },
      poster: { bass: 30, drums: 35 },
      bass: { piano: 20 },
      drums: { piano: 10 },
    },
  };

  return { graph };
}

describe("dijkstra", () => {
  it("should find lowest cost way in graph", () => {
    const { graph } = setup();

    let shortestPath = dijkstra({
      graph,
      startNodeId: "book",
      finishNodeId: "piano",
    });

    expect(shortestPath).toStrictEqual(["book", "disc", "drums", "piano"]);

    shortestPath = dijkstra({
      graph,
      startNodeId: "book",
      finishNodeId: "bass",
    });

    expect(shortestPath).toStrictEqual(["book", "disc", "bass"]);

    shortestPath = dijkstra({
      graph,
      startNodeId: "book",
      finishNodeId: "drums",
    });

    expect(shortestPath).toStrictEqual(["book", "disc", "drums"]);

    shortestPath = dijkstra({
      graph,
      startNodeId: "poster",
      finishNodeId: "piano",
    });

    expect(shortestPath).toStrictEqual(["poster", "drums", "piano"]);
  });
});
