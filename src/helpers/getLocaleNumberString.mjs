/**
 * Get internationalised text from number
 * Will fall back to en-AU if locale.code cannot be used
 * @param {number} number - the number to convert
 * @param {object} locale - the locale object
 * @returns {string}
 */
export const getLocaleNumberString = (number, locale) =>
  number.toLocaleString([locale.code, 'en-AU'], { useGrouping: false });
