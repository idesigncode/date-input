import React from 'react';
import Source from '@idesigncode/storybook-tools/Source.mjs';
import format from 'date-fns/format/index.js';
import subDays from 'date-fns/subDays/index.js';
import subMonths from 'date-fns/subMonths/index.js';
import subYears from 'date-fns/subYears/index.js';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  today,
  todayString,
  userEvent,
  within,
} from '../test/test-utils.mjs';
import RequiredPropsExample from './RequiredProps.example.mjs';
import RequiredPropsExampleRaw from './RequiredProps.example.mjs?raw';

export default {
  title: 'Required Props',
  component: DateInputWithArgs,
};

export const Example = {
  render: RequiredPropsExample,
};

export const Implementation = {
  args: {
    code: RequiredPropsExampleRaw,
  },
  render: (args) => <Source {...args} />,
};

export const Name = {
  args: {
    ...defaultArgs,
    name: 'test_name',
  },
  play: async ({ args, canvasElement, step }) => {
    await step('Input receives the given [name] as [data-testid]', async () => {
      const input = within(canvasElement).getByTestId(args.name);
      expect(input.tagName).toBe('INPUT');
      await input.focus();
      await userEvent.paste(todayString);
    });

    await step(
      'The given [name] is used in the [data-testid] of subcomponents',
      async () => {
        const button = within(canvasElement).getByTestId(
          `${args.name}-OpenCalendarButton`
        );
        expect(button.classList.contains('openCalendarButton')).toBe(true);
        await userEvent.click(button);
        expect(
          within(canvasElement)
            .getByTestId(`${args.name}-Calendar`)
            .classList.contains('calendar')
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId(`${args.name}-CalendarArrow`)
            .classList.contains('calendarArrow')
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId(`${args.name}-CalendarTabs`)
            .classList.contains('calendarTabs')
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(`${args.name}-Tab-Day`).id
        ).toBe(`${args.name}-Tab-Day`);
        expect(
          within(canvasElement).getByTestId(`${args.name}-Tab-Month`).id
        ).toBe(`${args.name}-Tab-Month`);
        expect(
          within(canvasElement).getByTestId(`${args.name}-Tab-Year`).id
        ).toBe(`${args.name}-Tab-Year`);
        expect(
          within(canvasElement)
            .getByTestId(`${args.name}-View`)
            .classList.contains('view')
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId(`${args.name}-ViewHead`)
            .classList.contains('viewHead')
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId(`${args.name}-Calendar-Day-ButtonPrevious`)
            .classList.contains('arrowButton')
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId(`${args.name}-Calendar-Day-ButtonNext`)
            .classList.contains('arrowButton')
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId(`${args.name}-Calendar-Day-Range`)
            .classList.contains('dateRangeText')
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId(`${args.name}-DateRangeYear`)
            .classList.contains('dateRangeYear')
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId(`${args.name}-ViewBody`)
            .classList.contains('viewBody')
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId(`${args.name}-Calendar-Day-WeekDay-1`)
            .classList.contains('viewWeekDays')
        ).toBe(true);
        expect(
          within(canvasElement)
            .getByTestId(`${args.name}-Calendar-Day-${todayString}`)
            .classList.contains('dateOption')
        ).toBe(true);
      }
    );
  },
};

let eventValue = {};
let formatValue = {};

export const OnChange = {
  args: {
    ...defaultArgs,
    onChange: (onChangeEvent, onChangeFormatValue) => {
      eventValue = onChangeEvent;
      formatValue = onChangeFormatValue;
    },
  },
  play: async ({ canvasElement, step }) => {
    eventValue = {};
    formatValue = {};
    await expect(eventValue).toEqual({});
    await expect(formatValue).toEqual({});
    await within(canvasElement).getByTestId('field_name').focus();
    await userEvent.paste(todayString);

    await step(
      'Receives the `event.target.value` in the default [displayFormat] format',
      async () => {
        await expect(eventValue.target.value).toEqual(
          format(today, 'dd/MM/yyyy')
        );
      }
    );

    await step(
      'Receives the `formatValue` in the default [format] format',
      async () => {
        await expect(formatValue).toEqual(todayString);
      }
    );
  },
};

export const Value = {
  args: {
    ...defaultArgs,
    value: todayString,
  },
  play: async ({ args, canvasElement, step }) => {
    const input = within(canvasElement).getByTestId('field_name');

    await step('Input [value] is not empty if given', async () => {
      expect(input.value).toBe(format(new Date(args.value), 'dd/MM/yyyy'));
    });

    await step(
      'In "Day" view the given [value] date is selected and has ":focus"',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-OpenCalendarButton')
        );
        const dateOptionTestId = `field_name-Calendar-Day-${args.value}`;
        expect(
          within(canvasElement).queryByTestId(dateOptionTestId)
        ).not.toBeNull();
        expect(
          within(canvasElement)
            .getByTestId(dateOptionTestId)
            .classList.contains('selected')
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(dateOptionTestId)
        ).toHaveAttribute(
          'aria-label',
          `Selected ${format(new Date(args.value), 'd MMMM yyyy')}`
        );
        expect(
          within(canvasElement).getByTestId(dateOptionTestId)
        ).toHaveFocus();
      }
    );

    await step(
      'In "Month" view the given [value] month is selected and has ":focus"',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Month')
        );
        const month = format(new Date(args.value), 'MM');
        const dateOptionTestId = `field_name-Calendar-Month-${month}`;
        expect(
          within(canvasElement).queryByTestId(dateOptionTestId)
        ).not.toBeNull();
        expect(
          within(canvasElement)
            .getByTestId(dateOptionTestId)
            .classList.contains('selected')
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(dateOptionTestId)
        ).toHaveAttribute(
          'aria-label',
          `Selected ${format(new Date(args.value), 'MMMM yyyy')}`
        );
        expect(
          within(canvasElement).getByTestId(dateOptionTestId)
        ).toHaveFocus();
      }
    );

    await step(
      'In "Year" view the given [value] year is selected and has ":focus"',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Year')
        );
        const year = format(new Date(args.value), 'yyyy');
        const dateOptionTestId = `field_name-Calendar-Year-${year}`;
        expect(
          within(canvasElement).queryByTestId(dateOptionTestId)
        ).not.toBeNull();
        expect(
          within(canvasElement)
            .getByTestId(dateOptionTestId)
            .classList.contains('selected')
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(dateOptionTestId)
        ).toHaveAttribute('aria-label', `Selected ${year}`);
        expect(
          within(canvasElement).getByTestId(dateOptionTestId)
        ).toHaveFocus();
      }
    );

    await step(
      'Is updated if a new date from the calendar is selected',
      async () => {
        const newDate = subYears(subMonths(subDays(today, 1), 1), 1);
        const newDateString = format(newDate, 'yyyy-MM-dd');
        const [newYear, newMonth] = newDateString.split('-');
        await userEvent.click(
          within(canvasElement).getByTestId(
            `field_name-Calendar-Year-${newYear}`
          )
        );
        await userEvent.click(
          within(canvasElement).getByTestId(
            `field_name-Calendar-Month-${newMonth}`
          )
        );
        await userEvent.click(
          within(canvasElement).getByTestId(
            `field_name-Calendar-Day-${newDateString}`
          )
        );
        expect(input.value).toBe(format(newDate, 'dd/MM/yyyy'));
      }
    );

    await step(
      'Calendar opens with the pasted [value] date option selected',
      async () => {
        await userEvent.clear(input);
        await input.focus();
        await userEvent.paste('25/10/2000');
        expect(input.value).toBe('25/10/2000');
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-OpenCalendarButton')
        );
        expect(
          within(canvasElement)
            .getByTestId('field_name-Calendar-Day-2000-10-25')
            .classList.contains('selected')
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-25'
          )
        ).toHaveAttribute('aria-label', 'Selected 25 October 2000');
      }
    );
  },
};
