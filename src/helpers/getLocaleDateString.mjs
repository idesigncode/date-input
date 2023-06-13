/**
 * Get internationalised text from date
 * Will fall back to en-AU if locale.code cannot be used
 * @param {Date} date - the date to transform to text
 * @param {object} locale - the locale object
 * @param {object} options - e.g. { weekday: 'short' }
 * @returns {string}
 */
export const getLocaleDateString = (date, locale, options) =>
  date.toLocaleDateString([locale.code, 'en-AU'], options);
