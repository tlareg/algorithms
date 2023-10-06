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

export function breadthFirstSearch<T>(
  graph: Graph<T>,
  startNodeId: Node<T>["id"],
  isGoalNode: (node: Node<T>) => boolean
): Node<T> | undefined {
  const startNode = graph.nodes[startNodeId];

  const exploredNodes = new Set<Node<T>["id"]>();
  exploredNodes.add(startNode.id);
  const visitQueue: Node<T>[] = [startNode];

  while (visitQueue.length) {
    const currentNode = visitQueue.shift()!;
    if (isGoalNode(currentNode)) {
      return currentNode;
    }

    graph.edges[currentNode.id].forEach((nodeId) => {
      if (!exploredNodes.has(nodeId)) {
        exploredNodes.add(nodeId);
        // BFS visits all the nodes at the same level before moving to the next level
        visitQueue.push(graph.nodes[nodeId]);
      }
    });
  }
}
