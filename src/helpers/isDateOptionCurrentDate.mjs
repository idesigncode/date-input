import isThisMonth from 'date-fns/isThisMonth/index.js';
import isThisYear from 'date-fns/isThisYear/index.js';
import isToday from 'date-fns/isToday/index.js';

/**
 * Is dateOption today's day/month/year?
 * @param {Date} date - the dateOptionDate || null
 * @param {string} view - the name of the view/tab
 * @returns {boolean} - isCurrent
 */
export const isDateOptionCurrentDate = (date, view) => {
  switch (view) {
    case 'Year':
      return isThisYear(date);
    case 'Month':
      return isThisMonth(date);
    default:
      return isToday(date);
  }
};
