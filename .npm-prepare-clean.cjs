'use strict';

const fsPromises = require('node:fs/promises');
const { files } = require('./package.json');

async function removeBuildFiles(filepath) {
  try {
    // Check file exists (or error with "ENOENT")
    await fsPromises.access(filepath);
    // Remove file recursively
    await fsPromises.rm(filepath, { recursive: true, force: true });
    // Log if file removed
    return console.log(`${filepath} removed`);
  } catch (error) {
    // Only throw errors if file exists
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

(async function () {
  try {
    await Promise.all([...files, 'storybook-static'].map(removeBuildFiles));
  } catch (error) {
    console.error(error);
  }
})();
