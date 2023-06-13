import { getLocaleDateString } from './getLocaleDateString.mjs';
import { getLocaleNumberString } from './getLocaleNumberString.mjs';

/**
 * Get the text for a date option
 * @param {Date} date - the dateOption date
 * @param {object} locale - the locale object
 * @param {string} view - the name of the view/tab
 * @returns {{short: string, long: string}|string}
 */
export const getDateOptionText = (date, locale, view) => {
  switch (view) {
    case 'Year':
      return getLocaleNumberString(date.getFullYear(), locale);
    case 'Month':
      return getLocaleDateString(date, locale, { month: 'short' });
    default:
      return getLocaleNumberString(date.getDate(), locale);
  }
};
