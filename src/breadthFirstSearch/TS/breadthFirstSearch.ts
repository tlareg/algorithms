type Node<T> = {
  id: number;
  value: T;
};

type Nodes<T> = Record<Node<T>["id"], Node<T>>;

type Edges<T> = Record<Node<T>["id"], Set<Node<T>["id"]>>;

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
        visitQueue.push(graph.nodes[nodeId]);
      }
    });
  }
}
