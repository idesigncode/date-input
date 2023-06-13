import addYears from 'date-fns/addYears/index.js';
import endOfDecade from 'date-fns/endOfDecade/index.js';
import startOfDecade from 'date-fns/startOfDecade/index.js';
import subYears from 'date-fns/subYears/index.js';
import { getLocaleDateString } from './getLocaleDateString.mjs';
import { getLocaleNumberString } from './getLocaleNumberString.mjs';

/**
 * Get the main text for the current view (between next & previous buttons)
 * @param {object} locale - the locale object
 * @param {Date} openToDate - the preselected date
 * @param {string} view - the name of the view/tab
 * @returns {string}
 */
export const getDateRangeText = (locale, openToDate, view) => {
  if (view === 'Day') {
    return getLocaleDateString(openToDate, locale, { month: 'short' });
  }

  const getYearText = (date) =>
    getLocaleNumberString(date.getFullYear(), locale);

  if (view === 'Month') {
    return getYearText(openToDate);
  }

  const start = subYears(startOfDecade(openToDate), 10);
  const end = addYears(endOfDecade(start), 10);
  return `${getYearText(start)} - ${getYearText(end)}`;
};
