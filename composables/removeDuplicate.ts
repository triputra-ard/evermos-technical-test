export default function removeDuplicates(arr: Array, prop: String) {
  const uniqueValues = new Set();
  arr.forEach((obj) => uniqueValues.add(obj[prop]));
  return Array.from(uniqueValues);
}
