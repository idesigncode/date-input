import getMonth from 'date-fns/getMonth/index.js';
import getYear from 'date-fns/getYear/index.js';

/**
 * Is the next button disabled
 * @param {Array} dateRange - the current dateRange of the view
 * @param {Date} maxDate - the maxDate || null
 * @param {string} view - the name of the view/tab
 * @returns {boolean} - nextButtonDisabled
 */
export const isNextButtonDisabled = (dateRange, maxDate, view) => {
  if (maxDate) {
    if (view === 'Day') {
      // Use the (nearest) middle of the dateRange to avoid dateRange dates outside the current month
      const middleOfDateRange = dateRange[Math.floor(dateRange.length / 2)];

      // Compare both month and year
      return (
        getMonth(middleOfDateRange) >= getMonth(maxDate) &&
        getYear(middleOfDateRange) === getYear(maxDate)
      );
    }

    // Use the end of the dateRange
    // Compare the year
    return getYear(dateRange[dateRange.length - 1]) >= getYear(maxDate);
  }
  return false;
};
