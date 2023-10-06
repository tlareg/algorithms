from dijkstra import Graph, Node, dijkstra


def setup():
    graph = Graph(
        nodes={
            "book": Node(id="book"),
            "disc": Node(id="disc"),
            "poster": Node(id="poster"),
            "bass": Node(id="bass"),
            "drums": Node(id="drums"),
            "piano": Node(id="piano"),
        },
        edges={
            "book": {"disc": 5, "poster": 0},
            "disc": {"bass": 15, "drums": 20},
            "poster": {"bass": 30, "drums": 35},
            "bass": {"piano": 20},
            "drums": {"piano": 10},
        },
    )

    return graph


def test_dijkstra():
    graph = setup()

    shortest_path = dijkstra(graph, "book", "piano")
    assert shortest_path == ["book", "disc", "drums", "piano"]

    shortest_path = dijkstra(graph, "book", "bass")
    assert shortest_path == ["book", "disc", "bass"]

    shortest_path = dijkstra(graph, "book", "drums")
    assert shortest_path == ["book", "disc", "drums"]

    shortest_path = dijkstra(graph, "poster", "piano")
    assert shortest_path == ["poster", "drums", "piano"]
