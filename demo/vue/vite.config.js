import vue from '@vitejs/plugin-vue';
import path from 'path';

export default {
  plugins: [vue()],
  root: './src',
  base: '',
  publicDir: path.resolve(__dirname, '../../public'),
  build: {
    outDir: path.resolve(__dirname, '../../www/vue'),
    assetsInlineLimit: 0,
    emptyOutDir: true,
  },
};
