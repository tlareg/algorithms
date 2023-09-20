type CompareFn<T> = (itemA: T, itemB: T) => -1 | 0 | 1;

function defaultCompare<T>(itemA: T, itemB: T) {
  return itemA === itemB ? 0 : itemA > itemB ? 1 : -1;
}

export function quickSort<T>(
  arr: T[],
  compare: CompareFn<T> = defaultCompare<T>
) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(Math.random() * arr.length)];

  const { smallerValues, equalValues, greaterValues } = arr.reduce<{
    smallerValues: T[];
    equalValues: T[];
    greaterValues: T[];
  }>(
    (acc, value) => {
      const compareResult = compare(value, pivot);
      if (compareResult < 0) {
        acc.smallerValues.push(value);
        return acc;
      }
      if (compareResult === 0) {
        acc.equalValues.push(value);
        return acc;
      }
      acc.greaterValues.push(value);
      return acc;
    },
    {
      smallerValues: [],
      equalValues: [],
      greaterValues: [],
    }
  );

  return [
    ...quickSort(smallerValues, compare),
    ...equalValues,
    ...quickSort(greaterValues, compare),
  ];
}
