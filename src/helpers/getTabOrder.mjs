/**
 * Get the tab order as an array
 * @param {string} displayFormat - e.g. dd/MM/yyyy
 * @returns {Array} - tabOrder
 */
export const getTabOrder = (displayFormat) => {
  const yearSelector = ['y', 'r', 'u'];
  const monthSelector = ['m', 'l'];

  // eslint-disable-next-line react/prop-types
  const splitDisplayFormat = displayFormat.toLowerCase().split(/[^A-Za-z]+/gu);

  const orderedArr = splitDisplayFormat.map((segment) => {
    if (
      yearSelector.some((el) => {
        return segment.includes(el);
      })
    ) {
      return 'Year';
    }

    if (
      monthSelector.some((el) => {
        return segment.includes(el);
      })
    ) {
      return 'Month';
    }

    return 'Day';
  });

  // Default tab order
  if (orderedArr.length !== 3) {
    return ['Day', 'Month', 'Year'];
  }

  return orderedArr;
};
