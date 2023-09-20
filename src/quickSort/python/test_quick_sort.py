from quick_sort import quickSort


def test_sort_numbers_array():
    result = quickSort([42, 56, 213, 6, 78, 29, 1])
    assert result == [
        1,
        6,
        29,
        42,
        56,
        78,
        213,
    ]


def test_sort_dicts_array():
    result = quickSort(
        [
            {"id": 42},
            {"id": 56},
            {"id": 213},
            {"id": 6},
            {"id": 78},
            {"id": 29},
            {"id": 1},
        ],
        lambda a, b: ((-1, 1)[a["id"] > b["id"]], 0)[a["id"] == b["id"]],
    )
    assert result == [
        {"id": 1},
        {"id": 6},
        {"id": 29},
        {"id": 42},
        {"id": 56},
        {"id": 78},
        {"id": 213},
    ]
