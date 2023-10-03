from depth_first_search import Graph, Node, depth_first_search


def setup():
    graph = Graph(
        nodes={
            1: Node(id=1, value=5),
            2: Node(id=2, value=5),
            3: Node(id=3, value=5),
            4: Node(id=4, value=5),
            5: Node(id=5, value=5),
            6: Node(id=6, value=15),
            7: Node(id=7, value=5),
        },
        edges={
            1: {2, 3},
            2: {1, 4, 5},
            3: {1, 6, 7},
            4: {2},
            5: {2},
            6: {3},
            7: {3},
        },
    )

    return {"graph": graph}


def test_depth_first_searchh_found_node():
    setup_data = setup()
    graph = setup_data["graph"]
    result = depth_first_search(graph, 1, lambda node: node.value > 10)
    assert result.id == 6


def test_depth_first_search_node_not_found():
    setup_data = setup()
    graph = setup_data["graph"]
    result = depth_first_search(graph, 1, lambda node: node.value > 20)
    assert result is None
