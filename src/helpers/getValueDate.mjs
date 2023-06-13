import parse from 'date-fns/parse/index.js';
import startOfDay from 'date-fns/startOfDay/index.js';
import startOfMonth from 'date-fns/startOfMonth/index.js';

/**
 * Get the valueDate of the view
 * Will return null if no date given
 * @param {string} value - formatted as per the `format` prop (e.g. '2000-12-30')
 * @param {string} format - the format of the `value` prop (e.g. 'yyyy-MM-dd')
 * @param {string} view - the name of the view/tab
 * @returns {null|Date} - valueDate
 */
export const getValueDate = (value, format, view) => {
  const valueDate = parse(value, format, new Date());
  if (!value || valueDate.toString() === 'Invalid Date') {
    return null;
  }
  if (view === 'Month') {
    return startOfMonth(valueDate);
  }
  return startOfDay(valueDate);
};
