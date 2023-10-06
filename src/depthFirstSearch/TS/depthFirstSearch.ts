type Node<T> = {
  id: number;
  value: T;
};

type Nodes<T> = Record<Node<T>["id"], Node<T>>;

type NodeEdges<T> = Set<Node<T>["id"]>;
type Edges<T> = Record<Node<T>["id"], NodeEdges<T>>;

export type Graph<T> = {
  nodes: Nodes<T>;
  edges: Edges<T>;
};

export function depthFirstSearch<T>(
  graph: Graph<T>,
  startNodeId: Node<T>["id"],
  isGoalNode: (node: Node<T>) => boolean
): Node<T> | undefined {
  const startNode = graph.nodes[startNodeId];

  const exploredNodes = new Set<Node<T>["id"]>();
  exploredNodes.add(startNode.id);
  const visitStack: Node<T>[] = [startNode];

  while (visitStack.length) {
    const currentNode = visitStack.pop()!;
    if (isGoalNode(currentNode)) {
      return currentNode;
    }

    graph.edges[currentNode.id].forEach((nodeId) => {
      if (!exploredNodes.has(nodeId)) {
        exploredNodes.add(nodeId);
        // DFS visits all the nodes in a branch before moving to the next branch
        visitStack.push(graph.nodes[nodeId]);
      }
    });
  }
}
