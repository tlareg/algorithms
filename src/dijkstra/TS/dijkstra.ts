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

type Costs = Record<Node["id"], EdgeCost>;
type Parents = Record<Node["id"], Node["id"] | undefined>;
type Processed = Record<Node["id"], boolean>;

type DijkstraArgs = {
  graph: Graph;
  startNodeId: Node["id"];
  finishNodeId: Node["id"];
};

/**
 * Dijkstra's algorithm solves the shortest-path problem for any weighted, directed graph with non-negative weights
 */
export function dijkstra({
  graph,
  startNodeId,
  finishNodeId,
}: DijkstraArgs): GraphPath {
  const { costs, parents, processed } = initState(graph.nodes, startNodeId);
  let currentNodeId: Node["id"] | undefined;

  while ((currentNodeId = findLowestCostNode(costs, processed))) {
    updateNeighborsCostsAndParents(currentNodeId)
    processed[currentNodeId] = true;
  }

  return getPathFromParents(parents, finishNodeId);

  function updateNeighborsCostsAndParents(nodeId) {
    const processedNodeCost = costs[nodeId];
    const neighbors = graph.edges[nodeId] ?? {};

    Object.entries(neighbors).forEach(([neighborId, neighborEdgeCost]) => {
      const neighborNewCost = processedNodeCost + neighborEdgeCost;
      if (neighborNewCost < costs[neighborId]) {
        costs[neighborId] = neighborNewCost;
        parents[neighborId] = nodeId;
      }
    });
  }
}

function initState(nodes: Nodes, startNodeId: Node["id"]) {
  const costs: Costs = {};
  const parents: Parents = {};
  const processed: Processed = {};

  Object.values(nodes).forEach((node) => {
    costs[node.id] = node.id === startNodeId ? 0 : Infinity;
    parents[node.id] = undefined;
  });

  return { costs, parents, processed };
}

// would be better to implement heap-based priority queue instead of this
function findLowestCostNode(costs: Costs, processed: Processed) {
  return Object.entries(costs).reduce<{
    lowestCost: number;
    lowestCostNode: Node["id"] | undefined;
  }>(
    (acc, [nodeId, nodeCost]) =>
      nodeCost < acc.lowestCost && !processed[nodeId]
        ? {
            lowestCost: nodeCost,
            lowestCostNode: nodeId,
          }
        : acc,
    { lowestCostNode: undefined, lowestCost: Infinity }
  ).lowestCostNode;
}

function getPathFromParents(parents: Parents, finishNodeId: Node["id"]) {
  const path: Array<Node["id"]> = [];
  let currentParentId: Node["id"] | undefined = finishNodeId;
  while (currentParentId) {
    path.unshift(currentParentId);
    currentParentId = parents[currentParentId];
  }
  return path;
}
