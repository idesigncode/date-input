import React from 'react';
import formatFn from 'date-fns/format/index.js';
import PropTypes from 'prop-types';
import { combineClassNames } from './helpers/combineClassNames.mjs';
import { getDateOptionText } from './helpers/getDateOptionText.mjs';
import { getLocaleDateString } from './helpers/getLocaleDateString.mjs';
import { isDateOptionCurrentDate } from './helpers/isDateOptionCurrentDate.mjs';
import { isDateOptionDisabled } from './helpers/isDateOptionDisabled.mjs';
import { isDateOptionSelected } from './helpers/isDateOptionSelected.mjs';
import { isDateOptionVisible } from './helpers/isDateOptionVisible.mjs';
import { triggerOnInputByRef } from './helpers/triggerOnInputByRef.mjs';
import CalendarContext from './CalendarContext.mjs';
import DateInputContext from './DateInputContext.mjs';
import ViewContext from './ViewContext.mjs';

const ViewBody = ({ children, className }) => {
  const { displayFormat, locale, name, ref, toggleCalendarOpen } =
    React.useContext(DateInputContext);
  const { allowDateOptionFocus, setView, view } =
    React.useContext(CalendarContext);
  const { dateRange, maxDate, minDate, openToDate, setOpenToDate, valueDate } =
    React.useContext(ViewContext);

  // Focus within dateRange...
  const focusDate =
    // ...the selected date
    dateRange.find((date) => isDateOptionSelected(date, valueDate, view)) ||
    // ...or the first visible non-disabled date
    dateRange.find(
      (date) =>
        isDateOptionVisible(date, openToDate, view) &&
        !isDateOptionDisabled(date, maxDate, minDate)
    );

  const focusRef = React.useRef();
  React.useEffect(() => {
    if (allowDateOptionFocus && focusRef.current) {
      focusRef.current.focus();
    }
  }, [allowDateOptionFocus, focusRef.current, view]);

  return (
    <div
      className={combineClassNames(['viewBody', view, className])}
      data-testid={`${name}-ViewBody`}
    >
      {children}
      {dateRange.map((date) => {
        const isCurrent = isDateOptionCurrentDate(date, view);
        const isSelected = isDateOptionSelected(date, valueDate, view);
        const isVisible = isDateOptionVisible(date, openToDate, view);
        const isDisabled = isVisible
          ? isDateOptionDisabled(date, maxDate, minDate)
          : true;

        const formattedDate = formatFn(date, 'yyyy-MM-dd', { locale });

        const [testIdYear, testIdMonth] = formattedDate.split('-');
        const testId =
          view === 'Year'
            ? testIdYear
            : view === 'Month'
            ? testIdMonth
            : formattedDate;

        const dateOptionLabel = [
          isSelected && 'Selected',
          view === 'Day' && getDateOptionText(date, locale, 'Day'),
          (view === 'Day' || view === 'Month') &&
            getLocaleDateString(date, locale, { month: 'long' }),
          getDateOptionText(date, locale, 'Year'),
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={date}
            aria-current={isCurrent ? 'date' : undefined}
            aria-hidden={!isVisible ? true : undefined}
            aria-label={dateOptionLabel}
            className={combineClassNames([
              'dateOption',
              view,
              isSelected && 'selected',
            ])}
            data-testid={`${name}-Calendar-${view}-${testId}`}
            disabled={isDisabled}
            onClick={() => {
              setOpenToDate(date);
              if (view === 'Year') {
                return setView('Month');
              }
              if (view === 'Month') {
                return setView('Day');
              }

              triggerOnInputByRef(
                ref,
                formatFn(date, displayFormat, { locale })
              );

              return toggleCalendarOpen();
            }}
            {...(focusDate === date ? { ref: focusRef } : {})}
            type="button"
          >
            {getDateOptionText(date, locale, view)}
          </button>
        );
      })}
    </div>
  );
};

ViewBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ViewBody;
