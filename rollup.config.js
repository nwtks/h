import buble from "rollup-plugin-buble";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "src/h.js",
  output: {
    name: "h",
    file: "dist/h.js",
    format: "umd"
  },
  plugins: [buble(), uglify()]
};
