// ? Reference: https://github.com/storybookjs/test-runner#dom-snapshot-recipe
const path = require('node:path');

module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    path.join(
      process.cwd(),
      '__snapshots__',
      `${path.basename(testPath)}${snapshotExtension}`
    ),
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    path.join(
      process.env.TEST_ROOT,
      path.basename(snapshotFilePath, snapshotExtension)
    ),
  testPathForConsistencyCheck: path.join(
    process.env.TEST_ROOT,
    'example.test.js'
  ),
};
