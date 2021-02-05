import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
export default {
  input: 'public/form/chat.js',
  output: {
    file: 'public/Ws/ws.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'runtime',
      include: [
        "node_modules",],
      plugins: [
        "@babel/transform-runtime",
        "@babel/transform-regenerator",
        "@babel/transform-async-to-generator",
      ] }),

  ]
};
