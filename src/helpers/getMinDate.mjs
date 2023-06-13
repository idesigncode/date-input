import parse from 'date-fns/parse/index.js';
import startOfDay from 'date-fns/startOfDay/index.js';
import startOfMonth from 'date-fns/startOfMonth/index.js';
import startOfYear from 'date-fns/startOfYear/index.js';

/**
 * Get the minDate of the view
 * @param {string} min - formatted as per the `format` prop (e.g. '2000-12-30')
 * @param {string} format - the format of the `value` prop (e.g. 'yyyy-MM-dd')
 * @param {string} view - the name of the view/tab
 * @returns {Date} - minDate
 */
export const getMinDate = (min, format, view) => {
  const minDate = parse(min, format, new Date());
  switch (view) {
    case 'Year':
      return startOfYear(minDate);
    case 'Month':
      return startOfMonth(minDate);
    default:
      return startOfDay(minDate);
  }
};
