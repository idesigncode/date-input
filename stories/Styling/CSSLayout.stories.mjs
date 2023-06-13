import Source from '@idesigncode/storybook-tools/Source.mjs';
import ChildrenExampleRaw from '../Props/Children.example.mjs?raw';

export default {
  title: 'Styling/CSS (layout)',
  component: Source,
};

export const Import = {
  args: {
    code: `import '../../layout.css';`,
  },
};

export const ImportSeparate = {
  args: {
    code: ChildrenExampleRaw.split('\n')
      .filter((line) => line.includes('.css') && !line.includes('theme.css'))
      .join('\n'),
  },
};
