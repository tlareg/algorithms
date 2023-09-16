#!/usr/bin/env python3

import math


def defaultCompare(itemA, itemB):
    return ((-1, 1)[itemA > itemB], 0)[itemA == itemB]


def binarySearch(sortedList, searchedItem, compare = defaultCompare):
    leftIndex = 0
    rightIndex = len(sortedList) - 1
    middleIndex = None

    while leftIndex <= rightIndex:
        middleIndex = math.floor((leftIndex + rightIndex) / 2)
        compareResult = compare(sortedList[middleIndex], searchedItem)

        if compareResult == 0:
            return middleIndex
        if compareResult == -1:
            leftIndex = middleIndex + 1
        elif compareResult == 1:
            rightIndex = middleIndex - 1

    return None
