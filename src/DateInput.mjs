import React from 'react';
import enAU from 'date-fns/locale/en-AU/index.js';
import PropTypes from 'prop-types';
import { combineClassNames } from './helpers/combineClassNames.mjs';
import useOutsideClick from './hooks/useOutsideClick.mjs';
import Calendar from './Calendar.mjs';
import CalendarArrow from './CalendarArrow.mjs';
import CalendarTabs from './CalendarTabs.mjs';
import DateInputContext from './DateInputContext.mjs';
import Field from './Field.mjs';
import View from './View.mjs';
import ViewBody from './ViewBody.mjs';
import ViewHead from './ViewHead.mjs';
import ViewWeekDays from './ViewWeekDays.mjs';

const DateInput = React.forwardRef(
  (
    {
      as,
      children,
      className,
      disabled,
      displayFormat = 'dd/MM/yyyy',
      format = 'yyyy-MM-dd',
      initialView = 'Day',
      locale = enAU,
      max,
      min,
      name,
      onChange,
      onValidationMessage,
      open: initialCalendarOpen = false,
      value,
      ...inputProps
    },
    ref,
  ) => {
    const buttonRef = React.useRef();
    const localRef = React.useRef();
    const outsideClickRef = React.useRef(null);
    const [calendarOpen, setCalendarOpen] = React.useState(initialCalendarOpen);

    useOutsideClick(outsideClickRef, () => {
      return setCalendarOpen(false);
    });

    const toggleCalendarOpen = () => {
      if (!disabled) {
        return setCalendarOpen(!calendarOpen);
      }
    };

    React.useEffect(() => {
      if (calendarOpen) {
        const handleEsc = (event) => {
          if (event.key === 'Escape') {
            toggleCalendarOpen();
            buttonRef.current.focus();
          }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }
    }, [calendarOpen, buttonRef.current]);

    return (
      <div
        ref={outsideClickRef}
        className={combineClassNames(['dateInput', className])}
        data-testid={`${name}-DateInput`}
      >
        <DateInputContext.Provider
          value={{
            buttonRef,
            calendarOpen,
            disabled,
            displayFormat,
            format,
            inputProps,
            initialCalendarOpen,
            initialView,
            locale,
            max,
            min,
            name,
            onChange,
            ref: ref || localRef,
            onValidationMessage,
            toggleCalendarOpen,
            value,
          }}
        >
          {children ? (
            // Composable usage
            children
          ) : (
            // Pre-composed usage
            <React.Fragment>
              <Field as={as} />
              <Calendar>
                <CalendarArrow />
                <CalendarTabs />
                <View>
                  <ViewHead />
                  <ViewBody>
                    <ViewWeekDays />
                  </ViewBody>
                </View>
              </Calendar>
            </React.Fragment>
          )}
        </DateInputContext.Provider>
      </div>
    );
  },
);

DateInput.displayName = 'DateInput';

DateInput.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  displayFormat: PropTypes.string,
  format: PropTypes.string,
  initialView: PropTypes.oneOf(['Day', 'Month', 'Year']),
  locale: PropTypes.shape({
    code: PropTypes.string.isRequired,
    formatDistance: PropTypes.func.isRequired,
    formatLong: PropTypes.object.isRequired,
    formatRelative: PropTypes.func.isRequired,
    localize: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
  }),
  max: PropTypes.string,
  min: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onValidationMessage: PropTypes.func,
  open: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

export default DateInput;
