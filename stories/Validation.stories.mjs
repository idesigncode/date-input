import React from 'react';
import Source from '@idesigncode/storybook-tools/Source.mjs';
import addDays from 'date-fns/addDays/index.js';
import format from 'date-fns/format/index.js';
import parse from 'date-fns/parse/index.js';
import subDays from 'date-fns/subDays/index.js';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  today,
  userEvent,
  waitFor,
  within,
} from '../test/test-utils.mjs';
import ValidationExample from './Validation.example.mjs';
import ValidationExampleRaw from './Validation.example.mjs?raw';

export default {
  title: 'Validation',
  component: DateInputWithArgs,
};

export const Example = {
  render: ValidationExample,
};

export const Implementation = {
  args: {
    code: ValidationExampleRaw,
  },
  render: (args) => <Source {...args} />,
};

export const TypedValueIsOutsideMaxOrMin = {
  args: {
    ...defaultArgs,
    displayFormat: 'MM-yyyy-dd',
    format: 'MM-yyyy-dd',
    max: format(today, 'MM-yyyy-dd'),
    min: format(today, 'MM-yyyy-dd'),
  },
  play: async ({ args, canvasElement, step }) => {
    const maxDate = parse(args.max, 'MM-yyyy-dd', new Date());
    const minDate = parse(args.min, 'MM-yyyy-dd', new Date());
    await step(
      'input is in error if the typed [value] is outside the given [max] & [min] dates',
      async () => {
        const input = within(canvasElement).getByTestId('field_name');
        await userEvent.type(
          within(canvasElement).getByTestId('field_name'),
          format(subDays(minDate, 1), 'MM-yyyy-dd')
        );
        await waitFor(() =>
          expect(input.validity.customError).toStrictEqual(true)
        );
        expect(input.validationMessage).toBe(
          `Please enter a valid date after ${format(
            subDays(minDate, 1),
            'MM-yyyy-dd'
          )} and before ${format(addDays(maxDate, 1), 'MM-yyyy-dd')}.`
        );
      }
    );
  },
};
