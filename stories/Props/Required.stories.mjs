import Source from '@idesigncode/storybook-tools/Source.mjs';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  within,
} from '../../test/test-utils.mjs';
import RequiredExample from './Required.example.mjs';
import RequiredExampleRaw from './Required.example.mjs?raw';

export default {
  title: 'Props/required',
  component: DateInputWithArgs,
};

export const Example = {
  render: RequiredExample,
};

export const Implementation = {
  args: {
    code: RequiredExampleRaw,
  },
  render: Source,
};

export const Attribute = {
  args: {
    ...defaultArgs,
    required: true,
  },
  play: async ({ canvasElement, step }) => {
    await step('Input receives [required] attribute if given', async () => {
      expect(within(canvasElement).getByTestId('field_name')).toHaveAttribute(
        'required'
      );
    });
  },
};
