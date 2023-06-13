import isAfter from 'date-fns/isAfter/index.js';
import isBefore from 'date-fns/isBefore/index.js';

/**
 * Should the dateOption be clickable?
 * Returns true if within minDate & maxDate
 * @param {Date} date - the dateOption date || null
 * @param {Date} maxDate - the maxDate || null
 * @param {Date} minDate - the minDate || null
 * @returns {boolean} - isDisabled
 */
export const isDateOptionDisabled = (date, maxDate, minDate) => {
  let isDisabled = false;
  if (maxDate && isAfter(date, maxDate)) {
    isDisabled = true;
  }
  if (minDate && isBefore(date, minDate)) {
    isDisabled = true;
  }
  return isDisabled;
};
