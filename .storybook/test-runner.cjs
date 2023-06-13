const { toMatchImageSnapshot } = require('jest-image-snapshot');

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

module.exports = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postRender(page, context) {
    // Exclude "example" stories from snapshots as they use the "un-mocked" current date
    if (!context.id.includes('example')) {
      // ? Reference: https://github.com/storybookjs/test-runner#dom-snapshot-recipe
      const elementHandler = await page.$('#storybook-root');
      const innerHTML = await elementHandler.innerHTML();
      expect(innerHTML).toMatchSnapshot();

      // ? Reference: https://github.com/storybookjs/test-runner#image-snapshot-recipe
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customDiffDir: `${customSnapshotsDir}/failed/diff`,
        customReceivedDir: `${customSnapshotsDir}/failed`,
        customSnapshotsDir,
        customSnapshotIdentifier: context.id,
        failureThreshold: 0.015,
        failureThresholdType: 'percent',
        storeReceivedOnFailure: true,
      });
    }
  },
};
