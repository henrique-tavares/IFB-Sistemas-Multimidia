export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function isEmpty(data: { [k: string]: any }) {
  return Object.entries(data).length === 0;
}
