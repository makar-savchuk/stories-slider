const path = require('path');
const fs = require('fs');
const sass = require('sass');
const CleanCSS = require('clean-css');
const banner = require('./banner.js');

const buildCss = async () => {
  const src = path.resolve(__dirname, '../src/stories-slider.scss');
  const result = sass.compile(src);
  fs.writeFileSync(
    path.resolve(__dirname, '../dist/stories-slider.css'),
    `${banner}\n${result.css}`,
  );

  const scss = fs.readFileSync(src, 'utf-8');
  fs.writeFileSync(
    path.resolve(__dirname, '../dist/stories-slider.scss'),
    `${banner}\n${scss}`,
  );

  const minified = new CleanCSS({
    compatibility: '*,-properties.zeroUnits',
  }).minify(result.css);

  fs.writeFileSync(
    path.resolve(__dirname, '../dist/stories-slider.min.css'),
    minified.styles,
  );
};
module.exports = buildCss;
