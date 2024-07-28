import path from 'path';

export default {
  root: './src',
  base: '',
  publicDir: path.resolve(__dirname, '../../public'),
  build: {
    outDir: path.resolve(__dirname, '../../www/core'),
    assetsInlineLimit: 0,
    emptyOutDir: true,
  },
};
