import React from 'react';
import Source from '@idesigncode/storybook-tools/Source.mjs';
import format from 'date-fns/format/index.js';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  today,
  todayString,
  userEvent,
  waitFor,
  within,
} from '../../test/test-utils.mjs';
import OpenExample from './Open.example.mjs';
import OpenExampleRaw from './Open.example.mjs?raw';

export default {
  title: 'Props/open',
  component: DateInputWithArgs,
};

export const Example = {
  render: OpenExample,
};

export const Implementation = {
  args: {
    code: OpenExampleRaw,
  },
  render: (args) => <Source {...args} />,
};

export const NoValue = {
  args: {
    ...defaultArgs,
    open: true,
  },
  play: async ({ canvasElement, step }) => {
    await step('Is initially rendered as [open]', async () => {
      expect(
        within(canvasElement).queryByTestId('field_name-Calendar'),
      ).not.toBeNull();
    });

    await step(
      'The first selectable date option does not have ":focus"',
      async () => {
        expect(
          within(canvasElement).getByTestId(
            `field_name-Calendar-Day-${todayString}`,
          ),
        ).not.toHaveFocus();
      },
    );

    await step(
      'The first selectable date option gains ":focus" after <Calendar /> is interacted with',
      async () => {
        const dateOptionDay = within(canvasElement).getByTestId(
          `field_name-Calendar-Day-${format(today, 'yyyy-MM')}-01`,
        );
        expect(dateOptionDay).not.toHaveFocus();
        await userEvent.tab(); // Input
        await userEvent.tab(); // "Open Calendar" button
        await userEvent.tab(); // "Month" tab button (triggers onFocus of Calendar dialog)
        await waitFor(() => expect(dateOptionDay).toHaveFocus(), {
          timeout: 1000,
        });
      },
    );

    await step(
      'The first selectable date option gains ":focus" after "Month" view selected',
      async () => {
        const dateOptionMonthTestId = 'field_name-Calendar-Month-01';
        expect(
          within(canvasElement).queryByTestId(dateOptionMonthTestId),
        ).toBeNull();
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Month'),
        );
        await waitFor(
          () =>
            expect(
              within(canvasElement).getByTestId(dateOptionMonthTestId),
            ).toHaveFocus(),
          { timeout: 1000 },
        );
      },
    );

    await step(
      'The first selectable date option gains ":focus" after "Year" view selected',
      async () => {
        const dateOptionYearTestId = 'field_name-Calendar-Year-2010';
        expect(
          within(canvasElement).queryByTestId(dateOptionYearTestId),
        ).toBeNull();
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Year'),
        );
        await waitFor(
          () =>
            expect(
              within(canvasElement).getByTestId(dateOptionYearTestId),
            ).toHaveFocus(),
          { timeout: 1000 },
        );
      },
    );
  },
};

export const Value = {
  args: {
    ...defaultArgs,
    open: true,
    value: todayString,
  },
  play: async ({ canvasElement, step }) => {
    await step(
      'The given [value] date option does not have ":focus"',
      async () => {
        expect(
          within(canvasElement).getByTestId(
            `field_name-Calendar-Day-${todayString}`,
          ),
        ).not.toHaveFocus();
      },
    );

    await step(
      'The given [value] date option gains ":focus" after <Calendar /> is interacted with',
      async () => {
        const dateOption = within(canvasElement).getByTestId(
          `field_name-Calendar-Day-${todayString}`,
        );
        expect(dateOption).not.toHaveFocus();
        await userEvent.tab(); // Input
        await userEvent.tab(); // "Open Calendar" button
        await userEvent.tab(); // "Month" tab button (triggers onFocus of Calendar dialog)
        await waitFor(() => expect(dateOption).toHaveFocus(), {
          timeout: 1000,
        });
      },
    );

    await step(
      'The given [value] date option gains ":focus" after "Month" view selected',
      async () => {
        const dateOptionMonthTestId = `field_name-Calendar-Month-${format(
          today,
          'MM',
        )}`;
        expect(
          within(canvasElement).queryByTestId(dateOptionMonthTestId),
        ).toBeNull();
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Month'),
        );
        await waitFor(
          () =>
            expect(
              within(canvasElement).getByTestId(dateOptionMonthTestId),
            ).toHaveFocus(),
          { timeout: 1000 },
        );
      },
    );

    await step(
      'The given [value] date option gains ":focus" after "Year" view selected',
      async () => {
        const dateOptionYearTestId = `field_name-Calendar-Year-${format(
          today,
          'yyyy',
        )}`;
        expect(
          within(canvasElement).queryByTestId(dateOptionYearTestId),
        ).toBeNull();
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Tab-Year'),
        );
        await waitFor(
          () =>
            expect(
              within(canvasElement).getByTestId(dateOptionYearTestId),
            ).toHaveFocus(),
          { timeout: 1000 },
        );
      },
    );
  },
};
