import Source from '@idesigncode/storybook-tools/Source.mjs';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  userEvent,
  within,
} from '../../test/test-utils.mjs';
import FormatExample from './Format.example.mjs';
import FormatExampleRaw from './Format.example.mjs?raw';

export default {
  title: 'Props/format',
  component: DateInputWithArgs,
};

export const Example = {
  render: FormatExample,
};

export const Implementation = {
  args: {
    code: FormatExampleRaw,
  },
  render: Source,
};

export const FormatValue = {
  args: {
    ...defaultArgs,
    format: 'MM-yyyy-dd',
  },
  play: async ({ args, canvasElement, step }) => {
    await step(
      'The [onChange] function receives the `formatValue` in the given [format]',
      async () => {
        await userEvent.paste(
          within(canvasElement).getByTestId('field_name'),
          '30/12/2000'
        );
        expect(args.onChange).toHaveBeenLastCalledWith(
          expect.objectContaining({ _reactName: 'onChange' }),
          '12-2000-30'
        );
        args.onChange.mockClear();
      }
    );
  },
};
