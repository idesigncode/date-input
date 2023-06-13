import addYears from 'date-fns/addYears/index.js';
import eachDayOfInterval from 'date-fns/eachDayOfInterval/index.js';
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval/index.js';
import eachYearOfInterval from 'date-fns/eachYearOfInterval/index.js';
import endOfDecade from 'date-fns/endOfDecade/index.js';
import endOfMonth from 'date-fns/endOfMonth/index.js';
import endOfWeek from 'date-fns/endOfWeek/index.js';
import endOfYear from 'date-fns/endOfYear/index.js';
import startOfDecade from 'date-fns/startOfDecade/index.js';
import startOfMonth from 'date-fns/startOfMonth/index.js';
import startOfWeek from 'date-fns/startOfWeek/index.js';
import startOfYear from 'date-fns/startOfYear/index.js';
import subYears from 'date-fns/subYears/index.js';

/**
 * Get the start date from openToDate
 * @param {Date} openToDate - the preselected date
 * @param {string} view - the name of the view/tab
 * @returns {Date} - start
 */
const getStart = (openToDate, view) => {
  switch (view) {
    case 'Year':
      return subYears(startOfDecade(openToDate), 10);
    case 'Month':
      return startOfYear(openToDate);
    default:
      return startOfWeek(startOfMonth(openToDate), { weekStartsOn: 1 });
  }
};

/**
 * Get the end date from openToDate
 * @param {Date} openToDate - the preselected date
 * @param {Date} start - the start of the date range (used for Year view)
 * @param {string} view - the name of the view/tab
 * @returns {Date} - end
 */
const getEnd = (openToDate, start, view) => {
  switch (view) {
    case 'Year':
      return addYears(endOfDecade(start), 10);
    case 'Month':
      return endOfYear(openToDate);
    default:
      return endOfWeek(endOfMonth(openToDate), { weekStartsOn: 1 });
  }
};

/**
 * Get an array of dates from start to end
 * @param {Date} openToDate - the preselected date
 * @param {string} view - the name of the view/tab
 * @returns {Array} - dateRange
 */
export const getDateRange = (openToDate, view) => {
  const start = getStart(openToDate, view);
  const end = getEnd(openToDate, start, view);

  switch (view) {
    case 'Year':
      return eachYearOfInterval({ start, end });
    case 'Month':
      return eachMonthOfInterval({ start, end });
    default:
      return eachDayOfInterval({ start, end });
  }
};
