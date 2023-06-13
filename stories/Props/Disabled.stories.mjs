import Source from '@idesigncode/storybook-tools/Source.mjs';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  userEvent,
  within,
} from '../../test/test-utils.mjs';
import DisabledExample from './Disabled.example.mjs';
import DisabledExampleRaw from './Disabled.example.mjs?raw';

export default {
  title: 'Props/disabled',
  component: DateInputWithArgs,
};

export const Example = {
  render: DisabledExample,
};

export const Implementation = {
  args: {
    code: DisabledExampleRaw,
  },
  render: Source,
};

export const UserInteraction = {
  args: {
    ...defaultArgs,
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    await step('The input is disabled', async () => {
      expect(within(canvasElement).getByTestId('field_name')).toBeDisabled();
    });

    await step(
      'Does not open the calendar if the icon is clicked',
      async () => {
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar')
        ).toBeNull();
        await userEvent.click(
          within(canvasElement).getByTestId('field_name-Icon')
        );
        expect(
          within(canvasElement).queryByTestId('field_name-Calendar')
        ).toBeNull();
      }
    );
  },
};
