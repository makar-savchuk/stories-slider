const fs = require('fs');
const path = require('path');
const { rollup } = require('rollup');
const Terser = require('terser');
const banner = require('./banner');

const buildJs = async () => {
  const bundle = await rollup({
    input: path.resolve(__dirname, '../src/stories-slider.esm.js'),
  });
  const bundleResult = await bundle.write({
    format: 'umd',
    name: 'createStoriesSlider',
    strict: true,
    sourcemap: true,
    sourcemapFile: path.resolve(__dirname, '../dist/stories-slider.js.map'),
    file: path.resolve(__dirname, '../dist/stories-slider.js'),
    banner,
  });
  const result = bundleResult.output[0];
  const { code, map } = await Terser.minify(result.code, {
    sourceMap: {
      content: result.map,
      filename: `stories-slider.min.js`,
      url: `stories-slider.min.js.map`,
    },
    output: {
      preamble: banner,
    },
  }).catch((err) => {
    console.error(`Terser failed on file stories-slider: ${err.toString()}`);
  });

  fs.writeFileSync(
    path.resolve(__dirname, `../dist/stories-slider.min.js`),
    code,
  );
  fs.writeFileSync(
    path.resolve(__dirname, `../dist/stories-slider.min.js.map`),
    map,
  );

  ['src', 'src/react', 'src/vue'].forEach((folder) => {
    fs.readdirSync(path.resolve(__dirname, '..', folder)).forEach((file) => {
      const from = path.resolve(__dirname, '..', folder, file);
      const to = path.resolve(
        __dirname,
        '..',
        folder.replace('src', 'dist'),
        file,
      );
      if (file.includes('.scss')) return;
      if (fs.lstatSync(from).isDirectory()) {
        if (!fs.existsSync(to)) {
          fs.mkdirSync(to);
        }
        return;
      }
      fs.copyFileSync(from, to);
    });
  });

  ['.esm', '-react', '-vue'].forEach((suffix) => {
    const file = path.resolve(__dirname, `../dist/stories-slider${suffix}.js`);
    const content = fs.readFileSync(file, 'utf-8');
    fs.writeFileSync(file, `${banner}\n${content}`);
  });
};
module.exports = buildJs;
