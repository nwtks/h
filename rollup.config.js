import buble from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';

export default [
  {
    input: 'src/hec.js',
    output: {
      file: 'dist/hec.js',
      format: 'cjs'
    },
    plugins: [buble()]
  },
  {
    input: 'src/hec.js',
    output: {
      name: 'hec',
      file: 'dist/hec.min.js',
      format: 'umd'
    },
    plugins: [buble(), uglify()]
  }
];
