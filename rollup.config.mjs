import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'react/jsx-runtime'
];

const banner = "'use client';\n";

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      banner
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
      banner
    }
  ],
  plugins: [
    url({
      include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
      limit: 0,
    }),
    svgr({
      exportType: 'named',
      ref: true,
      svgoConfig: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false
          }
        ]
      }
    }),
    postcss({
      config: true,
      extract: true,
      modules: false,
      minimize: true
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
      babelHelpers: 'bundled',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
      ]
    }),
    resolve({
      extensions
    }),
    commonjs()
  ],
  external
};
