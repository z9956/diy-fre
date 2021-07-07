import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

const plugins = [
	resolve(),
	json(),
	typescript(),
	babel({ babelHelpers: 'bundled' }),
	production && terser(),
];

export default {
	input: 'src/main.ts',
	output: [
		{
			file: 'dist/main.ems.js',
			format: 'esm',
			sourcemap: true,
		},
		{
			file: 'dist/main.umd.js',
			format: 'umd',
			name: 'main',
			sourcemap: true,
		},
	],
	plugins,
	exclude: 'node_modules',
};
