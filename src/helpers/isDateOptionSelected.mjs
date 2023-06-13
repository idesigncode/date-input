import compareAsc from 'date-fns/compareAsc/index.js';
import getYear from 'date-fns/getYear/index.js';

/**
 * Is the dateOption selected?
 * @param {Date} date - the dateOption date
 * @param {Date} valueDate - the valueDate
 * @param {string} view - the name of the view/tab
 * @returns {boolean} - isSelected
 */
export const isDateOptionSelected = (date, valueDate, view) => {
  if (valueDate) {
    if (view === 'Year') {
      return getYear(valueDate) === getYear(date);
    }
    return compareAsc(valueDate, date) === 0;
  }
  return false;
};
