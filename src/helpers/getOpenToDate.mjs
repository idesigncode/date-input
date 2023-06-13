import closestTo from 'date-fns/closestTo/index.js';
import isAfter from 'date-fns/isAfter/index.js';
import isBefore from 'date-fns/isBefore/index.js';
import isWithinInterval from 'date-fns/isWithinInterval/index.js';

/**
 * Get a date to open the calendar to.
 * Default to today's date.
 * Use valueDate if possible.
 * If valueDate is not beyond min &/or max, use whichever is closest.
 * @param {Date} maxDate - the maxDate || null
 * @param {Date} minDate - the minDate || null
 * @param {Date} valueDate - the valueDate || null
 * @returns {Date} - openToDate
 */
export const getOpenToDate = (maxDate, minDate, valueDate) => {
  let openToDate = new Date();
  if (valueDate) {
    openToDate = valueDate;
  }
  if (
    maxDate &&
    minDate &&
    !isWithinInterval(openToDate, { start: minDate, end: maxDate })
  ) {
    openToDate = closestTo(openToDate, [minDate, maxDate]);
  } else if (maxDate && isBefore(maxDate, openToDate)) {
    openToDate = maxDate;
  } else if (minDate && isAfter(minDate, openToDate)) {
    openToDate = minDate;
  }
  return openToDate;
};
