import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/hel.js',
    output: {
      file: 'dist/hel.js',
      format: 'cjs'
    },
    plugins: [buble()]
  },
  {
    input: 'src/hel.js',
    output: {
      name: 'hel',
      file: 'dist/hel-umd.js',
      format: 'umd'
    },
    plugins: [buble(), uglify()]
  }
]
