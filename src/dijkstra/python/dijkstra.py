from typing import Dict, List, Optional


class Node:
    def __init__(self, id: str):
        self.id = id


class Graph:
    def __init__(self, nodes: Dict[str, Node], edges: Dict[str, Dict[str, int]]):
        self.nodes = nodes
        self.edges = edges


def dijkstra(graph: Graph, start_node_id: str, finish_node_id: str) -> List[str]:
    costs, parents, processed = init_state(graph.nodes, start_node_id)
    current_node_id = None

    while (current_node_id := find_lowest_cost_node(costs, processed)) is not None:
        update_neighbors_costs_and_parents(current_node_id, graph, costs, parents)
        processed[current_node_id] = True

    return get_path_from_parents(parents, finish_node_id)


def update_neighbors_costs_and_parents(
    node_id: str, graph: Graph, costs: Dict[str, int], parents: Dict[str, Optional[str]]
):
    processed_node_cost = costs[node_id]
    neighbors = graph.edges.get(node_id, {})

    for neighbor_id, neighbor_edge_cost in neighbors.items():
        neighbor_new_cost = processed_node_cost + neighbor_edge_cost
        if neighbor_new_cost < costs[neighbor_id]:
            costs[neighbor_id] = neighbor_new_cost
            parents[neighbor_id] = node_id


def init_state(nodes: Dict[str, Node], start_node_id: str):
    costs = {}
    parents = {}
    processed = {}

    for node in nodes.values():
        costs[node.id] = 0 if node.id == start_node_id else float("inf")
        parents[node.id] = None
        processed[node.id] = False

    return costs, parents, processed


def find_lowest_cost_node(
    costs: Dict[str, int], processed: Dict[str, bool]
) -> Optional[str]:
    lowest_cost_node = None
    lowest_cost = float("inf")

    for node_id, node_cost in costs.items():
        if node_cost < lowest_cost and not processed[node_id]:
            lowest_cost = node_cost
            lowest_cost_node = node_id

    return lowest_cost_node


def get_path_from_parents(
    parents: Dict[str, Optional[str]], finish_node_id: str
) -> List[str]:
    path = []
    current_parent_id = finish_node_id

    while current_parent_id is not None:
        path.insert(0, current_parent_id)
        current_parent_id = parents[current_parent_id]

    return path
