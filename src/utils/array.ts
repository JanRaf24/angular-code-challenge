export function removeDuplicates<T>(
  arr: T[],
  keySelector: (item: T) => string
): T[] {
  const seen = new Set<string>();
  return arr.filter((item) => {
    const key = keySelector(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
