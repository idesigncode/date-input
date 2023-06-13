import getMonth from 'date-fns/getMonth/index.js';

/**
 * Should the dateOption be visible?
 * @param {Date} date - the dateOption date || null
 * @param {Date} openToDate - the preselected date
 * @param {string} view - the name of the view/tab
 * @returns {boolean} - isVisible
 */
export const isDateOptionVisible = (date, openToDate, view) => {
  if (view === 'Day') {
    return getMonth(openToDate) === getMonth(date);
  }
  return true;
};
