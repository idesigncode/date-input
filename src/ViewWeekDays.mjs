import React from 'react';
import addDays from 'date-fns/addDays/index.js';
import startOfWeek from 'date-fns/startOfWeek/index.js';
import PropTypes from 'prop-types';
import { combineClassNames } from './helpers/combineClassNames.mjs';
import { getLocaleDateString } from './helpers/getLocaleDateString.mjs';
import CalendarContext from './CalendarContext.mjs';
import DateInputContext from './DateInputContext.mjs';

// Start at 1 for Monday at the start of the week
const currentStartOfWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

const ViewWeekDays = ({ className }) => {
  const { locale, name } = React.useContext(DateInputContext);
  const { view } = React.useContext(CalendarContext);

  const weekDays = Array.from({ length: 7 }, (_, index) => {
    return getLocaleDateString(addDays(currentStartOfWeek, index), locale, {
      weekday: 'short',
    });
  });

  if (view === 'Day') {
    return weekDays.map((weekDayText, index) => {
      return (
        <div
          key={weekDayText}
          className={combineClassNames(['viewWeekDays', className])}
          data-testid={`${name}-Calendar-${view}-WeekDay-${index + 1}`}
        >
          {weekDayText}
        </div>
      );
    });
  }

  return '';
};

ViewWeekDays.propTypes = {
  className: PropTypes.string,
};

export default ViewWeekDays;
