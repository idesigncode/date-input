import subMonths from 'date-fns/subMonths/index.js';
import subYears from 'date-fns/subYears/index.js';

/**
 * Get the openToDate for the previous dateRange
 * @param {Date} openToDate - the preselected date
 * @param {string} view - the name of the view/tab
 * @returns {Date} - previousDate
 */
export const getPreviousDate = (openToDate, view) => {
  switch (view) {
    case 'Year':
      return subYears(openToDate, 20);
    case 'Month':
      return subYears(openToDate, 1);
    default:
      return subMonths(openToDate, 1);
  }
};
