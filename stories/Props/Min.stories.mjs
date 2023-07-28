import React from 'react';
import Source from '@idesigncode/storybook-tools/Source.mjs';
import format from 'date-fns/format/index.js';
import subDays from 'date-fns/subDays/index.js';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  futureDateString,
  pastDateString,
  todayString,
  userEvent,
  waitFor,
  within,
} from '../../test/test-utils.mjs';
import MinExample from './Min.example.mjs';
import MinExampleRaw from './Min.example.mjs?raw';

export default {
  title: 'Props/min',
  component: DateInputWithArgs,
};

export const Example = {
  render: MinExample,
};

export const Implementation = {
  args: {
    code: MinExampleRaw,
  },
  render: (args) => <Source {...args} />,
};

const min = '2000-10-25';
const afterMin = '2050-10-24';
const beforeMin = '2000-10-24';

export const MinInFuture = {
  args: {
    ...defaultArgs,
    min: futureDateString,
  },
  play: async ({ canvasElement, step }) => {
    await step(
      'Calendar opens to the given [min] date if it is in the future',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        expect(
          within(canvasElement).queryByTestId(
            `field_name-Calendar-Day-${futureDateString}`
          )
        ).not.toBeNull();
      }
    );
  },
};

export const MinInPast = {
  args: {
    ...defaultArgs,
    min: pastDateString,
  },
  play: async ({ canvasElement, step }) => {
    await step(
      'Calendar opens to the current date if [min] date is in the past',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        const button = within(canvasElement).queryByTestId(
          `field_name-Calendar-Day-${todayString}`
        );
        expect(button).not.toBeNull();
        expect(button).toHaveAttribute('aria-current', 'date');
      }
    );
  },
};

export const MinIsAfterMax = {
  args: {
    ...defaultArgs,
    min,
    max: afterMin,
  },
  play: async ({ canvasElement, step }) => {
    await step(
      'Will not throw an error when calendar opened if the given [min] date is before the given [max]',
      async () => {
        expect(async () => {
          await userEvent.click(
            within(canvasElement).getByTestId('field_name-Icon')
          );
        }).not.toThrowError();
      }
    );
  },
};

export const TypedValueIsBeforeMin = {
  args: {
    ...defaultArgs,
    min,
  },
  play: async ({ args, canvasElement, step }) => {
    await step(
      'Input is in error if the typed [value] is before the given [min] date',
      async () => {
        const input = within(canvasElement).getByTestId('field_name');
        await userEvent.type(
          within(canvasElement).getByTestId('field_name'),
          format(subDays(new Date(args.min), 1), 'dd/MM/yyyy')
        );
        await waitFor(() =>
          expect(input.validity.customError).toStrictEqual(true)
        );
        expect(input.validationMessage).toBe(
          `Please enter a valid date after ${format(
            subDays(new Date(args.min), 1),
            'dd/MM/yyyy'
          )}.`
        );
      }
    );
  },
};

export const ValueIsAfterMin = {
  args: {
    ...defaultArgs,
    min,
    value: afterMin,
  },
  play: async ({ canvasElement, step }) => {
    const icon = within(canvasElement).getByTestId('field_name-Icon');

    await step(
      'Calendar "previous" button on "Day" view is not "disabled" if [min] date is not in the current view',
      async () => {
        await userEvent.click(icon);
        const button = within(canvasElement).queryByTestId(
          'field_name-Calendar-Day-ButtonPrevious'
        );
        const range = within(canvasElement).getByTestId(
          'field_name-Calendar-Day-Range'
        );
        expect(button).not.toHaveAttribute('disabled');
        expect(button).not.toHaveAttribute('aria-hidden');
        expect(range).toHaveTextContent('Oct');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Sept');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Aug');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Jul');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Jun');
        await userEvent.click(button);
        expect(range).toHaveTextContent('May');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Apr');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Mar');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Feb');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Jan');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Dec');
      }
    );

    await step(
      'Calendar "previous" button on "Month" view is not "disabled" if [min] date is not in the current view',
      async () => {
        await userEvent.keyboard('{Escape}');
        await userEvent.click(icon);
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Month')
        );
        const button = within(canvasElement).queryByTestId(
          'field_name-Calendar-Month-ButtonPrevious'
        );
        const range = within(canvasElement).getByTestId(
          'field_name-Calendar-Month-Range'
        );
        expect(button).not.toHaveAttribute('disabled');
        expect(button).not.toHaveAttribute('aria-hidden');
        expect(range).toHaveTextContent('2050');
        await userEvent.click(button);
        expect(range).toHaveTextContent('2049');
      }
    );

    await step(
      'Calendar "previous" button on "Year" view is not "disabled" if [min] date is not in the current view',
      async () => {
        await userEvent.keyboard('{Escape}');
        await userEvent.click(icon);
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Year')
        );
        const button = within(canvasElement).queryByTestId(
          'field_name-Calendar-Year-ButtonPrevious'
        );
        const range = within(canvasElement).getByTestId(
          'field_name-Calendar-Year-Range'
        );
        expect(button).not.toHaveAttribute('disabled');
        expect(button).not.toHaveAttribute('aria-hidden');
        expect(range).toHaveTextContent('2040 - 2059');
        await userEvent.click(button);
        expect(range).toHaveTextContent('2020 - 2039');
      }
    );
  },
};

export const ValueIsBeforeMin = {
  args: {
    ...defaultArgs,
    min,
    value: beforeMin,
  },
  play: async ({ canvasElement, step }) => {
    await step(
      'Input is in error if the given [value] is before the given [min] date',
      async () => {
        const input = within(canvasElement).getByTestId('field_name');
        expect(input.value).toBe(format(new Date(beforeMin), 'dd/MM/yyyy'));
        await waitFor(() =>
          expect(input.validity.customError).toStrictEqual(true)
        );
        expect(input.validationMessage).toBe(
          `Please enter a valid date after ${format(
            new Date(beforeMin),
            'dd/MM/yyyy'
          )}.`
        );
      }
    );
  },
};

export const ValueIsMin = {
  args: {
    ...defaultArgs,
    min,
    value: min,
  },
  play: async ({ canvasElement, step }) => {
    await userEvent.click(within(canvasElement).getByTestId('field_name-Icon'));

    await step(
      'calendar "previous" button on "Day" view is "disabled" if [min] date is in the current view',
      async () => {
        const button = within(canvasElement).queryByTestId(
          'field_name-Calendar-Day-ButtonPrevious'
        );
        const range = within(canvasElement).getByTestId(
          'field_name-Calendar-Day-Range'
        );
        expect(button).toHaveAttribute('disabled');
        expect(button).toHaveAttribute('aria-hidden', 'true');
        expect(range).toHaveTextContent('Oct');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Oct');
      }
    );

    await step(
      'calendar "previous" button on "Month" view is "disabled" if [min] date is in the current view',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Month')
        );
        const button = within(canvasElement).queryByTestId(
          'field_name-Calendar-Month-ButtonPrevious'
        );
        const range = within(canvasElement).getByTestId(
          'field_name-Calendar-Month-Range'
        );
        expect(button).toHaveAttribute('disabled');
        expect(button).toHaveAttribute('aria-hidden', 'true');
        expect(range).toHaveTextContent('2000');
        await userEvent.click(button);
        expect(range).toHaveTextContent('2000');
      }
    );

    await step(
      'calendar "previous" button on "Year" view is "disabled" if [min] date is in the current view',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Year')
        );
        const button = within(canvasElement).queryByTestId(
          'field_name-Calendar-Year-ButtonPrevious'
        );
        const range = within(canvasElement).getByTestId(
          'field_name-Calendar-Year-Range'
        );
        expect(button).toHaveAttribute('disabled');
        expect(button).toHaveAttribute('aria-hidden', 'true');
        expect(range).toHaveTextContent('1990 - 2009');
        await userEvent.click(button);
        expect(range).toHaveTextContent('1990 - 2009');
      }
    );

    await step(
      'calendar days before the given [min] day are disabled',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Day')
        );
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-01'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-02'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-03'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-04'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-05'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-06'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-07'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-08'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-09'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-10'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-11'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-12'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-13'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-14'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-15'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-16'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-17'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-18'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-19'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-20'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-21'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-22'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-23'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-24'
          ).disabled
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-25'
          ).disabled
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-26'
          ).disabled
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-27'
          ).disabled
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-28'
          ).disabled
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-29'
          ).disabled
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-30'
          ).disabled
        ).toBe(false);
      }
    );

    await step(
      'calendar months before the given [min] month are disabled',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Month')
        );
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-01')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-02')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-03')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-04')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-05')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-06')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-07')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-08')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-09')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-10')
            .disabled
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-11')
            .disabled
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-12')
            .disabled
        ).toBe(false);
      }
    );

    await step(
      'calendar years before the given [min] year are disabled',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Year')
        );
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1990')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1991')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1992')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1993')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1994')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1995')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1996')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1997')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1998')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1999')
            .disabled
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2000')
            .disabled
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2001')
            .disabled
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2002')
            .disabled
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2003')
            .disabled
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2004')
            .disabled
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2005')
            .disabled
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2006')
            .disabled
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2007')
            .disabled
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2008')
            .disabled
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2009')
            .disabled
        ).toBe(false);
      }
    );
  },
};
