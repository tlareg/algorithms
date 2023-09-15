type CompareFn<T> = (itemA: T, itemB: T) => -1 | 0 | 1

function defaultCompare<T>(itemA: T, itemB: T) {
  return itemA === itemB ? 0 : itemA > itemB ? 1 : -1;
}

export function binarySearch<T>(
  sortedList: T[],
  searchedItem: T,
  compare: CompareFn<T> = defaultCompare<T>
): number | undefined {
  let leftIndex = 0;
  let rightIndex = sortedList.length - 1;
  let middleIndex;

  while (leftIndex <= rightIndex) {
    middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    const compareResult = compare(sortedList[middleIndex], searchedItem);
    if (compareResult === 0) {
      return middleIndex;
    }
    if (compareResult === -1) {
      leftIndex = middleIndex + 1;
    } else if (compareResult === 1) {
      rightIndex = middleIndex - 1;
    }
  }
}
