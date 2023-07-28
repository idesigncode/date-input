import React from 'react';
import PropTypes from 'prop-types';
import { combineClassNames } from './helpers/combineClassNames.mjs';
import { getDateRangeText } from './helpers/getDateRangeText.mjs';
import { getLocaleNumberString } from './helpers/getLocaleNumberString.mjs';
import { getLocaleTabText } from './helpers/getLocaleTabText.mjs';
import { getNextDate } from './helpers/getNextDate.mjs';
import { getPreviousDate } from './helpers/getPreviousDate.mjs';
import { isNextButtonDisabled } from './helpers/isNextButtonDisabled.mjs';
import { isPreviousButtonDisabled } from './helpers/isPreviousButtonDisabled.mjs';
import ArrowButton from './ArrowButton.mjs';
import CalendarContext from './CalendarContext.mjs';
import DateInputContext from './DateInputContext.mjs';
import ViewContext from './ViewContext.mjs';

const ViewHead = ({ className }) => {
  const { locale, name } = React.useContext(DateInputContext);
  const { setView, view } = React.useContext(CalendarContext);
  const { dateRange, maxDate, minDate, openToDate, setOpenToDate } =
    React.useContext(ViewContext);

  const nextDate = getNextDate(openToDate, view);
  const previousDate = getPreviousDate(openToDate, view);

  const getButtonText = (newDate) =>
    `View ${getLocaleTabText(locale, view)} options in ${getDateRangeText(
      locale,
      newDate,
      view,
    )}`;

  const visibleYear =
    view === 'Day'
      ? getLocaleNumberString(openToDate.getFullYear(), locale)
      : '';

  return (
    <div
      className={combineClassNames(['viewHead', className])}
      data-testid={`${name}-ViewHead`}
    >
      <div className={`dateRange ${view}`}>
        <ArrowButton
          data-testid={`${name}-Calendar-${view}-ButtonPrevious`}
          direction="previous"
          disabled={isPreviousButtonDisabled(dateRange, minDate, view)}
          onClick={() => setOpenToDate(previousDate)}
        >
          {getButtonText(previousDate)}
        </ArrowButton>
        <span
          data-testid={`${name}-Calendar-${view}-Range`}
          className="dateRangeText"
        >
          {getDateRangeText(locale, openToDate, view)}
        </span>
        <ArrowButton
          data-testid={`${name}-Calendar-${view}-ButtonNext`}
          direction="next"
          disabled={isNextButtonDisabled(dateRange, maxDate, view)}
          onClick={() => setOpenToDate(nextDate)}
        >
          {getButtonText(nextDate)}
        </ArrowButton>
      </div>
      {view === 'Day' && (
        <button
          aria-label={`Change ${getLocaleTabText(locale, 'Year')}`}
          className={`dateRangeYear ${view}`}
          data-testid={`${name}-DateRangeYear`}
          onClick={() => setView('Year')}
          type="button"
        >
          {visibleYear}
        </button>
      )}
    </div>
  );
};

ViewHead.propTypes = {
  className: PropTypes.string,
};

export default ViewHead;
