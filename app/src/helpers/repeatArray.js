export function repeatArray(arr, times = 3) {
  return Array(times).fill(arr).flat();
}
