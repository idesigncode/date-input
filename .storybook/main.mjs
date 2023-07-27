import packageJson from '../package.json';
import { webpackFinal } from '@idesigncode/storybook-tools/storybookConfig.mjs';

export default {
  addons: [
    {
      name: '@storybook/addon-coverage',
      options: {
        istanbul: {
          include: ['**/src/**'], // Prevent coverage code injection in PropsTable values
        },
      },
    },
    '@storybook/addon-docs',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  docs: {
    autodocs: 'tag',
  },
  env: (config) => ({
    ...config,
    IMPORT_PATH_REPLACEMENTS: JSON.stringify({
      '^': `${packageJson.name}/`, // Prepend package name to relative paths
      '../': '', // Remove "parent directory" relative path segments
      './': '', // Remove "current directory" relative path segments
      'src/': '', // Remove "src directory" path segments
    }),
  }),
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  stories: ['../**/RequiredProps.mdx', '../**/*.mdx', '../**/*.stories.*'],
  webpackFinal,
};
