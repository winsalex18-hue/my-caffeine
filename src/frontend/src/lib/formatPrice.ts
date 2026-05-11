/**
 * Convert backend fils (bigint, 1/100 of riyal) to a formatted Arabic price string.
 * e.g. 1999n → "19.99 ريال"
 */
export function formatPrice(fils: bigint): string {
  const riyals = Number(fils) / 100;
  return `${riyals.toLocaleString("ar-SA", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ريال`;
}
