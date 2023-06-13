import endOfDay from 'date-fns/endOfDay/index.js';
import endOfMonth from 'date-fns/endOfMonth/index.js';
import endOfYear from 'date-fns/endOfYear/index.js';
import parse from 'date-fns/parse/index.js';

/**
 * Get the maxDate of the view
 * @param {string} max - formatted as per the `format` prop (e.g. '2000-12-30')
 * @param {string} format - the format of the `value` prop (e.g. 'yyyy-MM-dd')
 * @param {string} view - the name of the view/tab
 * @returns {Date} - maxDate
 */
export const getMaxDate = (max, format, view) => {
  const maxDate = parse(max, format, new Date());
  switch (view) {
    case 'Year':
      return endOfYear(maxDate);
    case 'Month':
      return endOfMonth(maxDate);
    default:
      return endOfDay(maxDate);
  }
};
