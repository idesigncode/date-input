const { getJestConfig } = require('@storybook/test-runner');

module.exports = {
  ...getJestConfig(),
  snapshotResolver: './test/snapshotResolver.cjs',
};
