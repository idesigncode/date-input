import React from 'react';
import PropTypes from 'prop-types';
import { combineClassNames } from './helpers/combineClassNames.mjs';
import { getLocaleTabText } from './helpers/getLocaleTabText.mjs';
import CalendarContext from './CalendarContext.mjs';
import DateInputContext from './DateInputContext.mjs';

const CalendarTabs = ({ className }) => {
  const { locale, name } = React.useContext(DateInputContext);
  const { setView, tabOrder, view } = React.useContext(CalendarContext);

  return (
    <div
      className={combineClassNames(['calendarTabs', className])}
      data-testid={`${name}-CalendarTabs`}
      role="tablist"
    >
      {tabOrder.map((tab) => {
        const isSelected = view === tab;
        const id = `${name}-Tab-${tab}`;
        return (
          <button
            key={tab}
            aria-selected={isSelected ? true : undefined}
            data-testid={id}
            disabled={isSelected}
            id={id}
            onClick={() => setView(tab)}
            role="tab"
            type="button"
          >
            <span>{getLocaleTabText(locale, tab)}</span>
          </button>
        );
      })}
    </div>
  );
};

CalendarTabs.propTypes = {
  className: PropTypes.string,
};

export default CalendarTabs;
