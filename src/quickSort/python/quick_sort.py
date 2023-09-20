#!/usr/bin/env python3


def defaultCompare(itemA, itemB):
    return ((-1, 1)[itemA > itemB], 0)[itemA == itemB]


def quickSort(arr, compare=defaultCompare):
    if len(arr) <= 1:
        return arr

    pivot = arr[0]
    smallerValues = [v for v in arr[1:] if compare(v, pivot) <= 0]
    greaterValues = [v for v in arr[1:] if compare(v, pivot) > 0]

    return (
        quickSort(smallerValues, compare) + [pivot] + quickSort(greaterValues, compare)
    )
