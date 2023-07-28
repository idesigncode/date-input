import React from 'react';
import PropTypes from 'prop-types';
import { combineClassNames } from './helpers/combineClassNames.mjs';
import { getDateRange } from './helpers/getDateRange.mjs';
import { getMaxDate } from './helpers/getMaxDate.mjs';
import { getMinDate } from './helpers/getMinDate.mjs';
import { getOpenToDate } from './helpers/getOpenToDate.mjs';
import { getValueDate } from './helpers/getValueDate.mjs';
import CalendarContext from './CalendarContext.mjs';
import DateInputContext from './DateInputContext.mjs';
import ViewContext from './ViewContext.mjs';

const View = ({ children, className }) => {
  const { format, max, min, name, value } = React.useContext(DateInputContext);
  const { view } = React.useContext(CalendarContext);

  const valueDate = getValueDate(value, format, view);
  const maxDate = max && getMaxDate(max, format, view);
  const minDate = min && getMinDate(min, format, view);

  const [openToDate, setOpenToDate] = React.useState(
    getOpenToDate(maxDate, minDate, valueDate),
  );

  const dateRange = getDateRange(openToDate, view);

  return (
    <div
      aria-labelledby={`${name}-Tab-${view}`}
      className={combineClassNames(['view', className])}
      data-testid={`${name}-View`}
      role="tabpanel"
    >
      <ViewContext.Provider
        value={{
          dateRange,
          maxDate,
          minDate,
          openToDate,
          setOpenToDate,
          valueDate,
        }}
      >
        {children}
      </ViewContext.Provider>
    </div>
  );
};

View.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default View;
