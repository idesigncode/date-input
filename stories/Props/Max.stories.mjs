import React from 'react';
import Source from '@idesigncode/storybook-tools/Source.mjs';
import addDays from 'date-fns/addDays/index.js';
import format from 'date-fns/format/index.js';
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
import MaxExample from './Max.example.mjs';
import MaxExampleRaw from './Max.example.mjs?raw';

export default {
  title: 'Props/max',
  component: DateInputWithArgs,
};

export const Example = {
  render: MaxExample,
};

export const Implementation = {
  args: {
    code: MaxExampleRaw,
  },
  render: (args) => <Source {...args} />,
};

const max = '2000-10-25';
const afterMax = '2000-10-26';
const beforeMax = '1950-10-26';

export const MaxFuture = {
  args: {
    ...defaultArgs,
    max: futureDateString,
  },
  play: async ({ canvasElement, step }) => {
    await step(
      'Calendar opens to the current date if [max] date is in the future',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon'),
        );
        const button = within(canvasElement).queryByTestId(
          `field_name-Calendar-Day-${todayString}`,
        );
        expect(button).not.toBeNull();
        expect(button).toHaveAttribute('aria-current', 'date');
      },
    );
  },
};

export const MaxPast = {
  args: {
    ...defaultArgs,
    max: pastDateString,
  },
  play: async ({ canvasElement, step }) => {
    await step(
      'Calendar opens to the given [max] date if it is in the past',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon'),
        );
        expect(
          within(canvasElement).queryByTestId(
            `field_name-Calendar-Day-${pastDateString}`,
          ),
        ).not.toBeNull();
      },
    );
  },
};

export const MinIsBeforeMax = {
  args: {
    ...defaultArgs,
    max,
    min: beforeMax,
  },
  play: async ({ canvasElement, step }) => {
    await step(
      'Will not throw an error when calendar opened if the given [max] date is after the given [min]',
      async () => {
        expect(async () => {
          await userEvent.click(
            within(canvasElement).getByTestId('field_name-Icon'),
          );
        }).not.toThrowError();
      },
    );
  },
};

export const TypedValueIsAfterMax = {
  args: {
    ...defaultArgs,
    max,
  },
  play: async ({ args, canvasElement, step }) => {
    await step(
      'Input is in error if the typed [value] is after the given [max] date',
      async () => {
        const input = within(canvasElement).getByTestId('field_name');
        await userEvent.type(
          input,
          format(addDays(new Date(args.max), 1), 'dd/MM/yyyy'),
        );
        await waitFor(() =>
          expect(input.validity.customError).toStrictEqual(true),
        );
        expect(input.validationMessage).toBe(
          `Please enter a valid date before ${format(
            addDays(new Date(args.max), 1),
            'dd/MM/yyyy',
          )}.`,
        );
      },
    );
  },
};

export const ValueIsAfterMax = {
  args: {
    ...defaultArgs,
    max,
    value: afterMax,
  },
  play: async ({ canvasElement, step }) => {
    await step(
      'Input is in error if the given [value] is after the given [max] date',
      async () => {
        const input = within(canvasElement).getByTestId('field_name');
        expect(input.value).toBe(format(new Date(afterMax), 'dd/MM/yyyy'));
        await waitFor(() =>
          expect(input.validity.customError).toStrictEqual(true),
        );
        expect(input.validationMessage).toBe(
          `Please enter a valid date before ${format(
            new Date(afterMax),
            'dd/MM/yyyy',
          )}.`,
        );
      },
    );
  },
};

export const ValueIsBeforeMax = {
  args: {
    ...defaultArgs,
    max,
    value: beforeMax,
  },
  play: async ({ canvasElement, step }) => {
    const icon = within(canvasElement).getByTestId('field_name-Icon');

    await step(
      'Calendar "next" button on "Day" view is not "disabled" if [max] date is not in the current view',
      async () => {
        await userEvent.click(icon);
        const button = within(canvasElement).queryByTestId(
          'field_name-Calendar-Day-ButtonNext',
        );
        const range = within(canvasElement).getByTestId(
          'field_name-Calendar-Day-Range',
        );
        expect(button).not.toHaveAttribute('disabled');
        expect(button).not.toHaveAttribute('aria-hidden');
        expect(range).toHaveTextContent('Oct');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Nov');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Dec');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Jan');
      },
    );

    await step(
      'Calendar "next" button on "Month" view is not "disabled" if [max] date is not in the current view',
      async () => {
        await userEvent.keyboard('{Escape}');
        await userEvent.click(icon);
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Month'),
        );
        const button = within(canvasElement).queryByTestId(
          'field_name-Calendar-Month-ButtonNext',
        );
        const range = within(canvasElement).getByTestId(
          'field_name-Calendar-Month-Range',
        );
        expect(button).not.toHaveAttribute('disabled');
        expect(button).not.toHaveAttribute('aria-hidden');
        expect(range).toHaveTextContent('1950');
        await userEvent.click(button);
        expect(range).toHaveTextContent('1951');
      },
    );

    await step(
      'Calendar "next" button on "Year" view is not "disabled" if [max] date is not in the current view',
      async () => {
        await userEvent.keyboard('{Escape}');
        await userEvent.click(icon);
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Year'),
        );
        const button = within(canvasElement).queryByTestId(
          'field_name-Calendar-Year-ButtonNext',
        );
        const range = within(canvasElement).getByTestId(
          'field_name-Calendar-Year-Range',
        );
        expect(button).not.toHaveAttribute('disabled');
        expect(button).not.toHaveAttribute('aria-hidden');
        expect(range).toHaveTextContent('1940 - 1959');
        await userEvent.click(button);
        expect(range).toHaveTextContent('1960 - 1979');
      },
    );
  },
};

export const ValueIsMax = {
  args: {
    ...defaultArgs,
    max,
    value: max,
  },
  play: async ({ canvasElement, step }) => {
    await userEvent.click(within(canvasElement).getByTestId('field_name-Icon'));

    await step(
      'Calendar "next" button on "Day" view is "disabled" if [max] date is in the current view',
      async () => {
        const button = within(canvasElement).queryByTestId(
          'field_name-Calendar-Day-ButtonNext',
        );
        const range = within(canvasElement).getByTestId(
          'field_name-Calendar-Day-Range',
        );
        expect(button).toHaveAttribute('disabled');
        expect(button).toHaveAttribute('aria-hidden', 'true');
        expect(range).toHaveTextContent('Oct');
        await userEvent.click(button);
        expect(range).toHaveTextContent('Oct');
      },
    );

    await step(
      'Calendar "next" button on "Month" view is "disabled" if [max] date is in the current view',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Month'),
        );
        const button = within(canvasElement).queryByTestId(
          'field_name-Calendar-Month-ButtonNext',
        );
        const range = within(canvasElement).getByTestId(
          'field_name-Calendar-Month-Range',
        );
        expect(button).toHaveAttribute('disabled');
        expect(button).toHaveAttribute('aria-hidden', 'true');
        expect(range).toHaveTextContent('2000');
        await userEvent.click(button);
        expect(range).toHaveTextContent('2000');
      },
    );

    await step(
      'Calendar "next" button on "Year" view is "disabled" if [max] date is in the current view',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Year'),
        );
        const button = within(canvasElement).queryByTestId(
          'field_name-Calendar-Year-ButtonNext',
        );
        const range = within(canvasElement).getByTestId(
          'field_name-Calendar-Year-Range',
        );
        expect(button).toHaveAttribute('disabled');
        expect(button).toHaveAttribute('aria-hidden', 'true');
        expect(range).toHaveTextContent('1990 - 2009');
        await userEvent.click(button);
        expect(range).toHaveTextContent('1990 - 2009');
      },
    );

    await step(
      'Calendar days after the given [max] day are disabled',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Day'),
        );
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-01',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-02',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-03',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-04',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-05',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-06',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-07',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-08',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-09',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-10',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-11',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-12',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-13',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-14',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-15',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-16',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-17',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-18',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-19',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-20',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-21',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-22',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-23',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-24',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-25',
          ).disabled,
        ).toBe(false);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-26',
          ).disabled,
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-27',
          ).disabled,
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-28',
          ).disabled,
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-29',
          ).disabled,
        ).toBe(true);
        expect(
          within(canvasElement).getByTestId(
            'field_name-Calendar-Day-2000-10-30',
          ).disabled,
        ).toBe(true);
      },
    );

    await step(
      'Calendar months after the given [max] month are disabled',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Month'),
        );
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-01')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-02')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-03')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-04')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-05')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-06')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-07')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-08')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-09')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-10')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-11')
            .disabled,
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Month-12')
            .disabled,
        ).toBe(true);
      },
    );

    await step(
      'Calendar years after the given [max] year are disabled',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Year'),
        );
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1990')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1991')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1992')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1993')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1994')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1995')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1996')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1997')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1998')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-1999')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2000')
            .disabled,
        ).toBe(false);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2001')
            .disabled,
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2002')
            .disabled,
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2003')
            .disabled,
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2004')
            .disabled,
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2005')
            .disabled,
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2006')
            .disabled,
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2007')
            .disabled,
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2008')
            .disabled,
        ).toBe(true);
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar-Year-2009')
            .disabled,
        ).toBe(true);
      },
    );
  },
};
