import React from 'react';
import { jest } from '@storybook/jest';
import addYears from 'date-fns/addYears/index.js';
import format from 'date-fns/format/index.js';
import subYears from 'date-fns/subYears/index.js';
import timeshift from 'timeshift';
import DateInput from '../src/DateInput.mjs';

export * from '@storybook/jest';
export * from '@storybook/testing-library';

export const defaultArgs = {
  name: 'field_name',
  onChange: jest.fn(),
  value: '',
};

// "Mock" the current date for consistent snapshot tests
export const todayString = '2023-06-02';
export const today = new Date(`${todayString}T00:00:00.000Z`);
export const pastDateString = format(subYears(today, 10), 'yyyy-MM-dd');
export const futureDateString = format(addYears(today, 10), 'yyyy-MM-dd');

// Storybook decorator to set the current date "mock" (if it has a "playFunction")
// Uses timeshift for consistency in local and CI environments (both node & browser)
export const decoratorSetCurrentDate = (Story, context) => {
  timeshift(context.playFunction ? todayString : undefined);

  return <Story />;
};

// Test component with state & args
const DateInputWithArgs = ({ onChange, value: valueInitial = '', ...args }) => {
  const [value, setValue] = React.useState(valueInitial);

  const handleOnChange = (event, formatValue) => {
    setValue(formatValue);
    if (onChange) {
      onChange(event, formatValue);
    }
  };

  return <DateInput {...args} onChange={handleOnChange} value={value} />;
};

DateInputWithArgs.propTypes = DateInput.propTypes;

export default DateInputWithArgs;
