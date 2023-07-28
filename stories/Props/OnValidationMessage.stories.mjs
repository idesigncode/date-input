import React from 'react';
import Source from '@idesigncode/storybook-tools/Source.mjs';
import addDays from 'date-fns/addDays/index.js';
import format from 'date-fns/format/index.js';
import subDays from 'date-fns/subDays/index.js';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  jest,
  today,
  todayString,
  userEvent,
  waitFor,
  within,
} from '../../test/test-utils.mjs';
import OnValidationMessageExample from './OnValidationMessage.example.mjs';
import OnValidationMessageExampleRaw from './OnValidationMessage.example.mjs?raw';

export default {
  title: 'Props/onValidationMessage',
  component: DateInputWithArgs,
};

export const Example = {
  render: OnValidationMessageExample,
};

export const Implementation = {
  args: {
    code: OnValidationMessageExampleRaw,
  },
  render: (args) => <Source {...args} />,
};

export const OnLoad = {
  args: {
    ...defaultArgs,
    onValidationMessage: jest.fn(),
  },
  play: async ({ args, step }) => {
    await step('Does not trigger if no [value] given', async () => {
      expect(args.onValidationMessage).not.toHaveBeenCalled();
      args.onValidationMessage.mockClear();
    });
  },
};

export const OnLoadRequired = {
  args: {
    ...defaultArgs,
    onValidationMessage: jest.fn(),
    required: true,
  },
  play: async ({ args, step }) => {
    await step(
      'Does not trigger if no [value] given and is [required]',
      async () => {
        expect(args.onValidationMessage).not.toHaveBeenCalled();
        args.onValidationMessage.mockClear();
      }
    );
  },
};

export const OnLoadValueValid = {
  args: {
    ...defaultArgs,
    onValidationMessage: jest.fn(),
    value: '2000-10-10',
  },
  play: async ({ args, step }) => {
    await step(
      'Receives an empty `message` string if [value] is valid',
      async () => {
        await waitFor(() =>
          expect(args.onValidationMessage).toHaveBeenCalledTimes(1)
        );
        expect(args.onValidationMessage).toHaveBeenLastCalledWith('');
        args.onValidationMessage.mockClear();
      }
    );
  },
};

export const OnLoadValueInvalid = {
  args: {
    ...defaultArgs,
    onValidationMessage: jest.fn(),
    value: '2',
  },
  play: async ({ args, step }) => {
    await step(
      'Receives the correct `message` string if [value] is invalid',
      async () => {
        await waitFor(() =>
          expect(args.onValidationMessage).toHaveBeenCalledTimes(1)
        );
        expect(args.onValidationMessage).toHaveBeenLastCalledWith(
          'Please enter a valid date in "dd/mm/yyyy" format.'
        );
        args.onValidationMessage.mockClear();
      }
    );
  },
};

export const OnUserInputMax = {
  args: {
    ...defaultArgs,
    max: todayString,
    onValidationMessage: jest.fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    await step(
      'Receives the correct `message` string if the typed [value] is after the given [max] date',
      async () => {
        args.onValidationMessage.mockClear();
        await userEvent.type(
          within(canvasElement).getByTestId('field_name'),
          format(addDays(today, 1), 'dd/MM/yyyy')
        );
        expect(args.onValidationMessage).toHaveBeenLastCalledWith(
          `Please enter a valid date before ${format(
            addDays(today, 1),
            'dd/MM/yyyy'
          )}.`
        );
      }
    );
  },
};

export const OnUserInputMaxMin = {
  args: {
    ...defaultArgs,
    min: todayString,
    max: todayString,
    onValidationMessage: jest.fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const input = within(canvasElement).getByTestId('field_name');

    await step('Receives an empty `message` string', async () => {
      await step('If the typed [value] is valid', async () => {
        args.onValidationMessage.mockClear();
        await userEvent.type(input, format(today, 'dd/MM/yyyy'));
        expect(args.onValidationMessage).toHaveBeenLastCalledWith('');
      });
    });

    await userEvent.clear(input);

    await step('Receives the correct `message` string', async () => {
      await step(
        'if the typed [value] is not in the correct [format] format',
        async () => {
          args.onValidationMessage.mockClear();
          await userEvent.type(input, format(today, 'MM/yyyy/dd'));
          expect(args.onValidationMessage).toHaveBeenLastCalledWith(
            'Please enter a valid date in "dd/mm/yyyy" format.'
          );
        }
      );

      await userEvent.clear(input);

      await step(
        'if the typed [value] is not before the given [max] date & after the given [min] date',
        async () => {
          args.onValidationMessage.mockClear();
          await userEvent.type(input, format(subDays(today, 1), 'dd/MM/yyyy'));
          expect(args.onValidationMessage).toHaveBeenLastCalledWith(
            `Please enter a valid date after ${format(
              subDays(today, 1),
              'dd/MM/yyyy'
            )} and before ${format(addDays(today, 1), 'dd/MM/yyyy')}.`
          );
        }
      );
    });
  },
};

export const OnUserInputMin = {
  args: {
    ...defaultArgs,
    min: todayString,
    onValidationMessage: jest.fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    await step(
      'receives the correct `message` string if the typed [value] is before the given [min] date',
      async () => {
        args.onValidationMessage.mockClear();
        await userEvent.type(
          within(canvasElement).getByTestId('field_name'),
          format(subDays(today, 1), 'dd/MM/yyyy')
        );
        expect(args.onValidationMessage).toHaveBeenLastCalledWith(
          `Please enter a valid date after ${format(
            subDays(today, 1),
            'dd/MM/yyyy'
          )}.`
        );
      }
    );
  },
};
