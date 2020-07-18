const nodeResolve = require("rollup-plugin-node-resolve");
const { uglify } = require("rollup-plugin-uglify");
const rollup = require("rollup");
const babel = require("rollup-plugin-babel");
const isDev = process.argv.includes("-w");
const inputOptions = {
  input: "src/index.js",
  plugins: [
    nodeResolve(),
    !isDev &&
      babel({
        presets: ["@babel/preset-env"],
      }),
    !isDev &&
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
        },
      }),
  ].filter(Boolean),
};
const outputOptions = {
  output: {
    file: "dist/pullx.js",
    format: "umd",
    name: "pullx",
  },
};

async function build() {
  outputOptions.output.file = "dist/pullx.min.js";
  const bundle = await rollup.rollup(inputOptions);
  await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
}
function watch() {
  rollup.watch({
    ...inputOptions,
    ...outputOptions,
  });
}
isDev ? watch() : build();
