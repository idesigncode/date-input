/**
 * Combines an array of classNames into a single string
 * Removes any undesired values (e.g. "", undefined, null, false)
 * ? Note: true and " " values will still be added
 * @param {Array} classNamesArray - the array of classNames
 * @returns {string} - the combined classNames string
 */
export const combineClassNames = (classNamesArray) => {
  return classNamesArray.filter(Boolean).join(' ');
};
