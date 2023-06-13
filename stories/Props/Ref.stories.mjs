import Source from '@idesigncode/storybook-tools/Source.mjs';
import RefExample from './Ref.example.mjs';
import RefExampleRaw from './Ref.example.mjs?raw';

export default {
  title: 'Props/ref',
};

export const Example = {
  render: RefExample,
};

export const Implementation = {
  args: {
    code: RefExampleRaw,
  },
  render: Source,
};
