import React from 'react';
import Source from '@idesigncode/storybook-tools/Source.mjs';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  userEvent,
  within,
} from '../../test/test-utils.mjs';
import DisplayFormatExample from './DisplayFormat.example.mjs';
import DisplayFormatExampleRaw from './DisplayFormat.example.mjs?raw';

export default {
  title: 'Props/displayFormat',
  component: DateInputWithArgs,
};

export const Example = {
  render: DisplayFormatExample,
};

export const Implementation = {
  args: {
    code: DisplayFormatExampleRaw,
  },
  render: (args) => <Source {...args} />,
};

export const MonthYearDay = {
  args: {
    ...defaultArgs,
    displayFormat: 'MM-yyyy-dd',
  },
  play: async ({ canvasElement, step }) => {
    const input = within(canvasElement).getByTestId('field_name');

    await step('Shows "mm-yyyy-dd" as the input placeholder text', async () => {
      expect(input.placeholder).toBe('mm-yyyy-dd');
    });

    await step(
      'Input is in error if the [value] does not match the given [displayFormat] format',
      async () => {
        expect(input.value).toBe('');
        expect(input.validity.customError).toStrictEqual(false);
        expect(input.validationMessage).toBe('');
        await userEvent.type(input, '3/30/11');
        expect(input.value).toBe('3/30/11');
        expect(input.validity.customError).toStrictEqual(true);
        expect(input.validationMessage).toBe(
          'Please enter a valid date in "mm-yyyy-dd" format.'
        );
      }
    );

    await step(
      'Input is not in error if the [value] matches the given [displayFormat] format',
      async () => {
        await userEvent.clear(input);
        await userEvent.type(input, '12-2000-30');
        expect(input.value).toBe('12-2000-30');
        expect(input.validity.customError).toStrictEqual(false);
        expect(input.validationMessage).toBe('');
      }
    );

    await step(
      'Input [value] is formatted to the given [displayFormat] format',
      async () => {
        await userEvent.clear(input);
        await userEvent.type(input, '2000-12-3');
        expect(input.value).toBe('2000-12-3');
        await userEvent.type(input, '0');
        expect(input.value).toBe('12-2000-30');
      }
    );

    await step(
      'Tab order follows [displayFormat] order (month, year, day)',
      async () => {
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        const tabs = within(canvasElement).getAllByRole('tab');
        expect(tabs).toHaveLength(3);
        expect(tabs[0]).toHaveAttribute('data-testid', 'field_name-Tab-Month');
        expect(tabs[1]).toHaveAttribute('data-testid', 'field_name-Tab-Year');
        expect(tabs[2]).toHaveAttribute('data-testid', 'field_name-Tab-Day');
      }
    );
  },
};

export const YearDay = {
  args: {
    ...defaultArgs,
    displayFormat: 'yyyy dd',
  },
  play: async ({ canvasElement, step }) => {
    await step('Uses default tab order', async () => {
      await userEvent.click(
        within(canvasElement).getByTestId('field_name-Icon')
      );
      const tabs = within(canvasElement).getAllByRole('tab');
      expect(tabs).toHaveLength(3);
      expect(tabs[0]).toHaveAttribute('data-testid', 'field_name-Tab-Day');
      expect(tabs[1]).toHaveAttribute('data-testid', 'field_name-Tab-Month');
      expect(tabs[2]).toHaveAttribute('data-testid', 'field_name-Tab-Year');
    });
  },
};
