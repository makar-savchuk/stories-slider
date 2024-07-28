const pkg = require('../package.json');

const date = {
  day: new Date().getDate(),
  month:
    'January February March April May June July August September October November December'.split(
      ' ',
    )[new Date().getMonth()],
  year: new Date().getFullYear(),
};

module.exports = `${`
/**
 * UI Initiative Stories Slider ${pkg.version}
 *
 * ${pkg.description}
 *
 * https://uiinitiative.com
 *
 * Copyright 2022-${date.year} UI Initiative
 *
 * Released under the UI Initiative Regular License
 *
 * Released on: ${date.month} ${date.day}, ${date.year}
 */
`.trim()}\n`;
