import React from 'react';
import PropTypes from 'prop-types';
import { combineClassNames } from './helpers/combineClassNames.mjs';
import CalendarContext from './CalendarContext.mjs';
import DateInputContext from './DateInputContext.mjs';

const CalendarArrow = ({ className }) => {
  const { name } = React.useContext(DateInputContext);
  const { tabOrder, view } = React.useContext(CalendarContext);
  return (
    <svg
      className={combineClassNames(['calendarArrow', className])}
      data-testid={`${name}-CalendarArrow`}
      viewBox="0 0 20 9"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentcolor"
    >
      <polyline
        className={view === tabOrder[0] ? 'selected' : ''}
        points="0,10 10,0 20,10"
        fill="none"
        strokeWidth="1"
      />
    </svg>
  );
};

CalendarArrow.propTypes = {
  className: PropTypes.string,
};

export default CalendarArrow;
