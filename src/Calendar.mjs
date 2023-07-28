import React from 'react';
import PropTypes from 'prop-types';
import { combineClassNames } from './helpers/combineClassNames.mjs';
import { getTabOrder } from './helpers/getTabOrder.mjs';
import IconCalendar from './icons/IconCalendar.mjs';
import CalendarContext from './CalendarContext.mjs';
import DateInputContext from './DateInputContext.mjs';

const Calendar = ({ children, className }) => {
  const {
    buttonRef,
    calendarOpen,
    disabled,
    displayFormat,
    initialCalendarOpen,
    initialView,
    name,
    toggleCalendarOpen,
    value,
  } = React.useContext(DateInputContext);
  const [allowDateOptionFocus, setAllowDateOptionFocus] = React.useState(
    !initialCalendarOpen,
  );
  const [view, setView] = React.useState(initialView);

  React.useEffect(() => {
    if (!calendarOpen && initialView && !value) {
      // Reset the view to initialView if field emptied
      setView(initialView);
    }
  }, [calendarOpen, initialView, value]);

  return (
    <React.Fragment>
      <button
        aria-label="Open calendar date picker"
        className="openCalendarButton"
        data-testid={`${name}-OpenCalendarButton`}
        disabled={disabled}
        onClick={toggleCalendarOpen}
        ref={buttonRef}
        type="button"
      >
        <IconCalendar className="iconCalendar" data-testid={`${name}-Icon`} />
      </button>
      {calendarOpen && !disabled && (
        // Elements with autofocus within a <dialog> will not receive focus on page load
        // Therefore we must render the dialog on demand
        // ? Reference: https://web.dev/learn/html/dialog/#closing-a-dialog
        <dialog
          className={combineClassNames(['calendar', className])}
          data-testid={`${name}-Calendar`}
          onFocus={() => {
            if (!allowDateOptionFocus) {
              setAllowDateOptionFocus(true);
            }
          }}
          open
        >
          <CalendarContext.Provider
            value={{
              allowDateOptionFocus,
              view,
              setView,
              tabOrder: getTabOrder(displayFormat),
            }}
          >
            {children}
          </CalendarContext.Provider>
        </dialog>
      )}
    </React.Fragment>
  );
};

Calendar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Calendar;
