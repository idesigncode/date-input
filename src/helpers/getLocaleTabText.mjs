/**
 * Get internationalised text for the tabs in locale language
 * Will fall back to en-AU if locale.code cannot be used
 * @param {object} locale - the locale object
 * @param {string} tabText - the (english) tab text to convert
 * @returns {string} localeTabText
 */
export const getLocaleTabText = (locale, tabText) =>
  new Intl.DisplayNames([locale.code, 'en-AU'], {
    type: 'dateTimeField',
  }).of(tabText.toLowerCase());
