export function toColorHex(num: number): string {
  return num.toString(16).padStart(2, '0');
}
