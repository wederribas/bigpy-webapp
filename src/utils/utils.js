// @flow

/**
 * Deburr special Latin letters to basic Latin letters and removing
 * combining diacritical marks.
 */
export function deburr(string: string): string {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
