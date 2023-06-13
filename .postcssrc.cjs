'use strict';

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer({
      cascade: false,
    }),
    cssnano({
      preset: 'default',
    }),
  ],
};
