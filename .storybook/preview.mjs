import '@idesigncode/storybook-tools/styles.css';
import DocsContainer from '@idesigncode/storybook-tools/DocsContainer.mjs';
import { decoratorSetCurrentDate } from '../test/test-utils.mjs';

export const parameters = {
  docs: {
    container: DocsContainer, // TODO - Remove once resolved: https://github.com/hipstersmoothie/storybook-dark-mode/issues/205#issuecomment-1419862816
  },
  viewMode: 'docs',
};

export default {
  decorators: [decoratorSetCurrentDate],
};
