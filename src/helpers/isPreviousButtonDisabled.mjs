import getMonth from 'date-fns/getMonth/index.js';
import getYear from 'date-fns/getYear/index.js';

/**
 * Is the previous button disabled
 * @param {Array} dateRange - the current dateRange of the view
 * @param {Date} minDate - the minDate || null
 * @param {string} view - the name of the view/tab
 * @returns {boolean} - previousButtonDisabled
 */
export const isPreviousButtonDisabled = (dateRange, minDate, view) => {
  if (minDate) {
    if (view === 'Day') {
      // Use the (nearest) middle of the dateRange to avoid dateRange dates outside the current month
      const middleOfDateRange = dateRange[Math.floor(dateRange.length / 2)];

      // Compare both month and year
      return (
        getMonth(middleOfDateRange) <= getMonth(minDate) &&
        getYear(middleOfDateRange) === getYear(minDate)
      );
    }

    // Use the start of the dateRange
    // Compare the year
    return getYear(dateRange[0]) <= getYear(minDate);
  }
  return false;
};
