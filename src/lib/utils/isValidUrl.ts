/**
 * Tests whether a string is a valid URL.
 * @param str
 */
export function isValidUrl(str: string): boolean {
  try {
    // eslint-disable-next-line no-new
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}
