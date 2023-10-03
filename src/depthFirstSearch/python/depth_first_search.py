from typing import Dict, Set, Callable, Any


class Node:
    def __init__(self, id: int, value: Any):
        self.id = id
        self.value = value


class Graph:
    def __init__(self, nodes: Dict[int, Node], edges: Dict[int, Set[int]]):
        self.nodes = nodes
        self.edges = edges


def depth_first_search(
    graph: Graph, start_node_id: int, is_goal_node: Callable[[Node], bool]
) -> Node:
    start_node = graph.nodes[start_node_id]

    explored_nodes = set()
    explored_nodes.add(start_node_id)
    visit_stack = [start_node]

    while visit_stack:
        current_node = visit_stack.pop()
        if is_goal_node(current_node):
            return current_node

        for neighbor_id in graph.edges[current_node.id]:
            if neighbor_id not in explored_nodes:
                explored_nodes.add(neighbor_id)
                visit_stack.append(graph.nodes[neighbor_id])

    return None
