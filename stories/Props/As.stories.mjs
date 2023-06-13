import React from 'react';
import Source from '@idesigncode/storybook-tools/Source.mjs';
import Field from '../../src/Field.mjs';
import DateInputWithArgs, {
  defaultArgs,
  expect,
  within,
} from '../../test/test-utils.mjs';
import AsComponentExample, { CustomInput } from './AsComponent.example.mjs';
import AsComponentExampleRaw from './AsComponent.example.mjs?raw';
import AsTagNameExample from './AsTagName.example.mjs';
import AsTagNameExampleRaw from './AsTagName.example.mjs?raw';

export default {
  title: 'Props/as',
  component: DateInputWithArgs,
};

export const AsComponentExampleExample = {
  render: AsComponentExample,
};

export const AsComponentImplementation = {
  args: {
    code: AsComponentExampleRaw,
  },
  render: Source,
};

export const AsComponentDateInput = {
  args: {
    ...defaultArgs,
    as: CustomInput,
  },
  play: async ({ canvasElement, step }) => {
    await step('Renders input as component', async () => {
      expect(within(canvasElement).getByTestId('field_name')).toHaveStyle(
        'color: rgb(0, 191, 255)'
      );
    });
  },
};

export const AsComponentField = {
  args: {
    ...defaultArgs,
    children: <Field as={CustomInput} />,
  },
  play: AsComponentDateInput.play,
};

export const AsTagNameExampleExample = {
  render: AsTagNameExample,
};

export const AsTagNameImplementation = {
  args: {
    code: AsTagNameExampleRaw,
  },
  render: Source,
};

export const AsTagNameDateInput = {
  args: {
    ...defaultArgs,
    as: 'textarea',
  },
  play: async ({ canvasElement, step }) => {
    await step('Renders input as tagName "textarea"', async () => {
      expect(within(canvasElement).getByTestId('field_name').tagName).toBe(
        'TEXTAREA'
      );
    });
  },
};

export const AsTagNameField = {
  args: {
    ...defaultArgs,
    children: <Field as="textarea" />,
  },
  play: AsTagNameDateInput.play,
};
