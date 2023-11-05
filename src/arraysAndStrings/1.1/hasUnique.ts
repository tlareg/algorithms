export function hasUnique(input: string) {
  return new Set([...input]).size === input.length;
}

export function hasUniqueSort(input: string) {
  const sortedInput = [...input].sort();

  for (var i = 1; i < sortedInput.length; ++i) {
    if (sortedInput[i] === sortedInput[i - 1]) {
      return false;
    }
  }
  return true;
}