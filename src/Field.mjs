import React from 'react';
import { isValid } from 'date-fns';
import addDays from 'date-fns/addDays/index.js';
import endOfDay from 'date-fns/endOfDay/index.js';
import formatFn from 'date-fns/format/index.js';
import isAfter from 'date-fns/isAfter/index.js';
import isBefore from 'date-fns/isBefore/index.js';
import parse from 'date-fns/parse/index.js';
import startOfDay from 'date-fns/startOfDay/index.js';
import subDays from 'date-fns/subDays/index.js';
import PropTypes from 'prop-types';
import { combineClassNames } from './helpers/combineClassNames.mjs';
import { triggerOnInputByRef } from './helpers/triggerOnInputByRef.mjs';
import DateInputContext from './DateInputContext.mjs';

const Field = ({ as: C = 'input', className }) => {
  const {
    calendarOpen,
    disabled,
    displayFormat,
    format,
    inputProps,
    locale,
    max,
    min,
    name,
    onChange,
    ref,
    onValidationMessage,
    toggleCalendarOpen,
    value,
  } = React.useContext(DateInputContext);

  const placeholder = displayFormat.toLowerCase();

  /**
   * Validate a given date string
   * @param {string} dateValue - the initial value
   * @param {string} initialFormat - the format of the dateValue
   * @returns {string|null} - returns null (if valid) or the validation message
   */
  const validateDateStringFormat = (dateValue, initialFormat) => {
    /**
     * Return valid if there is no dateValue and field is not required
     */
    if (!dateValue.length && !inputProps.required) {
      return null;
    }

    /**
     * Check date is valid format
     * Prevent formatting error by first checking parsedDateValue is a valid date
     * Prevent premature formatting by returning error message if lengths do not match
     */
    const parsedDateValue = parse(dateValue, initialFormat, new Date());
    const isValidFormat =
      isValid(parsedDateValue) &&
      formatFn(parsedDateValue, initialFormat) === dateValue;
    if (dateValue.length !== initialFormat.length || !isValidFormat) {
      return `Please enter a valid date in "${initialFormat.toLowerCase()}" format.`;
    }

    return null;
  };

  /**
   * Validate a given date string
   * @param {string} dateValue - the initial value
   * @param {string} initialFormat - the format of the dateValue
   * @returns {string|null} - returns null (if valid) or the validation message
   */
  const validateDateStringMaxMin = (dateValue, initialFormat) => {
    /**
     * Return valid if there is no dateValue and field is not required
     */
    if (!dateValue.length && !inputProps.required) {
      return null;
    }

    /**
     * Check parsedDate is valid within min &/or max
     */
    const parsedDate = parse(dateValue, initialFormat, new Date());
    const start = min
      ? endOfDay(subDays(parse(min, format, new Date()), 1))
      : null;
    const end = max
      ? startOfDay(addDays(parse(max, format, new Date()), 1))
      : null;
    if (start && end) {
      if (!(isAfter(parsedDate, start) && isBefore(parsedDate, end))) {
        return `Please enter a valid date after ${formatFn(
          start,
          displayFormat,
        )} and before ${formatFn(end, displayFormat)}.`;
      }
    } else if (end) {
      if (!isBefore(parsedDate, end)) {
        return `Please enter a valid date before ${formatFn(
          end,
          displayFormat,
        )}.`;
      }
    } else if (start) {
      if (!isAfter(parsedDate, start)) {
        return `Please enter a valid date after ${formatFn(
          start,
          displayFormat,
        )}.`;
      }
    }

    return null;
  };

  /**
   * Format a given date string
   * @param {string} dateValue - the initial value
   * @param {string} initialFormat - the format of dateValue
   * @param {string} returnFormat - the format of returned date string
   * @returns {string} - dateValue in returnFormat | dateValue | empty string
   */
  const formatValue = (dateValue, initialFormat, returnFormat) => {
    if (dateValue) {
      const isDateValueInInitialFormat = !validateDateStringFormat(
        dateValue,
        initialFormat,
      );

      const parsedDate = parse(
        dateValue,
        isDateValueInInitialFormat ? initialFormat : returnFormat,
        new Date(),
      );

      return isDateValueInInitialFormat
        ? formatFn(parsedDate, returnFormat, { locale })
        : dateValue;
    }
    return '';
  };

  /**
   * Format displayFormat (e.g. 'dd/MM/yyyy') to format (e.g. 'yyyy-MM-dd')
   * @param {string} dateValue - the initial value
   * @returns {string} - the returned format (e.g. 'yyyy-MM-dd') string OR empty string
   */
  const formatToValueFormat = (dateValue) => {
    return formatValue(dateValue, displayFormat, format);
  };

  /**
   * Format format (e.g. 'yyyy-MM-dd') to displayFormat (e.g. 'dd/MM/yyyy')
   * @param {string} dateValue - the initial value
   * @returns {string} - the returned displayFormat (e.g. 'dd/MM/yyyy') string OR empty string
   */
  const formatToDisplayFormat = (dateValue) => {
    return formatValue(dateValue, format, displayFormat);
  };

  /**
   * Trigger an "onInput" event on initial render
   * This will run validation on the initial value (if given)
   */
  React.useEffect(() => {
    if (ref && ref.current && ref.current.value) {
      return triggerOnInputByRef(ref, ref.current.value);
    }
  }, [ref]);

  return (
    <C
      {...inputProps}
      aria-label={`Date format: ${placeholder}`}
      className={combineClassNames(['field', className])}
      data-testid={name}
      disabled={disabled}
      name={name}
      onChange={(e) => {
        /**
         * Close calendar if open
         */
        if (calendarOpen) {
          toggleCalendarOpen();
        }

        /**
         * Return the event and the value formatted as per the `format` prop
         */
        return onChange(e, formatToValueFormat(e.target.value));
      }}
      onInput={(e) => {
        /**
         * Check value validity
         * Ensure value is in displayFormat
         */
        const valueDisplayFormat = formatToDisplayFormat(e.target.value);
        const validationMessage =
          validateDateStringFormat(valueDisplayFormat, displayFormat) ||
          validateDateStringMaxMin(valueDisplayFormat, displayFormat) ||
          '';

        /**
         * Custom validation handling (via "onValidationMessage")
         */
        if (onValidationMessage) {
          return onValidationMessage(validationMessage);
        }

        /**
         * Default validation handling
         */
        ref.current.setCustomValidity(validationMessage);
      }}
      placeholder={placeholder}
      ref={ref}
      type="text"
      value={formatToDisplayFormat(value)}
    />
  );
};

Field.displayName = 'Field';

Field.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  className: PropTypes.string,
};

export default Field;
