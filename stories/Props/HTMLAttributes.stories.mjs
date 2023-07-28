import React from 'react';
import Source from '@idesigncode/storybook-tools/Source.mjs';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  within,
} from '../../test/test-utils.mjs';
import HTMLAttributesExample from './HTMLAttributes.example.mjs';
import HTMLAttributesExampleRaw from './HTMLAttributes.example.mjs?raw';

export default {
  title: 'Props/HTML attributes',
  component: DateInputWithArgs,
};

export const Example = {
  render: HTMLAttributesExample,
};

export const Implementation = {
  args: {
    code: HTMLAttributesExampleRaw,
  },
  render: (args) => <Source {...args} />,
};

export const Id = {
  args: {
    ...defaultArgs,
    id: 'thisId',
  },
  play: async ({ canvasElement, step }) => {
    await step('Field receives the [id="thisId"]', async () => {
      expect(within(canvasElement).getByTestId('field_name')).toHaveAttribute(
        'id',
        'thisId'
      );
    });
  },
};
