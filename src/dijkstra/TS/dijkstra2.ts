import { Heap } from "heap-js";

type Node = {
  id: string;
};
type Nodes = Record<Node["id"], Node>;

type EdgeCost = number;
type NodeEdges = Record<Node["id"], EdgeCost>;
type Edges = Record<Node["id"], NodeEdges>;

export type Graph = {
  nodes: Nodes;
  edges: Edges;
};

export type GraphPath = Array<Node["id"]>;

type DijkstraArgs = {
  graph: Graph;
  startNodeId: Node["id"];
  finishNodeId: Node["id"];
};

/**
 * Dijkstra's algorithm solves the shortest-path problem for any weighted, directed graph with non-negative weights
 */
export function dijkstra2({
  graph,
  startNodeId,
  finishNodeId,
}: DijkstraArgs): GraphPath {
  const { queue, costs, parents, processed } = initState(
    graph.nodes,
    startNodeId
  );
  let queueItem: { id: string; cost: number } | undefined;

  while ((queueItem = queue.pop())) {
    if (processed.has(queueItem.id)) {
      continue;
    }
    processed.add(queueItem.id);
    updateNeighborsCostsAndParents(queueItem.id);
  }

  return getPathFromParents(parents, finishNodeId);

  function updateNeighborsCostsAndParents(nodeId) {
    const processedNodeCost = costs.get(nodeId)!;
    const neighbors = graph.edges[nodeId] ?? {};

    Object.entries(neighbors).forEach(([neighborId, neighborEdgeCost]) => {
      const neighborNewCost = processedNodeCost + neighborEdgeCost;
      if (neighborNewCost < costs.get(neighborId)!) {
        queue.push({ id: neighborId, cost: neighborNewCost });
        costs.set(neighborId, neighborNewCost);
        parents.set(neighborId, nodeId);
      }
    });
  }
}

function initState(nodes: Nodes, startNodeId: Node["id"]) {
  const queue = new Heap<{ id: string; cost: number }>(
    (a, b) => a.cost - b.cost
  );
  const costs = new Map<Node["id"], number>();
  const parents = new Map<Node["id"], Node["id"] | undefined>();
  const processed = new Set<Node["id"]>();

  // queue don't need to know all nodes at the beginning
  // see: Uniform Cost Search
  // (https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Practical_optimizations_and_infinite_graph)
  Object.values(nodes).forEach((node) => {
    const cost = node.id === startNodeId ? 0 : Infinity;
    queue.push({ id: node.id, cost });
    costs.set(node.id, cost);
    parents.set(node.id, undefined);
  });

  return { queue, costs, parents, processed };
}

function getPathFromParents(
  parents: Map<Node["id"], Node["id"] | undefined>,
  finishNodeId: Node["id"]
) {
  const path: Array<Node["id"]> = [];
  let currentParentId: Node["id"] | undefined = finishNodeId;
  while (currentParentId) {
    path.unshift(currentParentId);
    currentParentId = parents.get(currentParentId);
  }
  return path;
}
