/** Validate an EAN-13 barcode: 13 digits with valid checksum. */
export function isValidEAN13(code: string): boolean {
  const s = code.trim();
  if (!/^\d{13}$/.test(s)) return false;
  const digits = s.split("").map(Number);
  const check = digits.pop()!;
  const sum = digits.reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 1 : 3), 0);
  const expected = (10 - (sum % 10)) % 10;
  return expected === check;
}

export function normalizeBarcode(code: string): string {
  return code.replace(/\D/g, "");
}
