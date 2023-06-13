import addMonths from 'date-fns/addMonths/index.js';
import addYears from 'date-fns/addYears/index.js';

/**
 * Get the openToDate for the next dateRange
 * @param {Date} openToDate - the preselected date
 * @param {string} view - the name of the view/tab
 * @returns {Date} - nextDate
 */
export const getNextDate = (openToDate, view) => {
  switch (view) {
    case 'Year':
      return addYears(openToDate, 20);
    case 'Month':
      return addYears(openToDate, 1);
    default:
      return addMonths(openToDate, 1);
  }
};
