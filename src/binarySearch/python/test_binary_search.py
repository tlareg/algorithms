from binary_search import binarySearch


def test_search_in_numbers_list():
    result = binarySearch([1, 2, 4, 15, 33, 123, 567], 123)
    assert result == 5


def test_search_in_objects_list():
    result = binarySearch(
        [
            {'id': 1},
            {'id': 2},
            {'id': 4},
            {'id': 15},
            {'id': 33},
            {'id': 123},
            {'id': 567},
        ],
        {'id': 123},
        lambda a, b: ((-1, 1)[a['id'] > b['id']], 0)[a['id'] == b['id']]
    )
    assert result == 5
