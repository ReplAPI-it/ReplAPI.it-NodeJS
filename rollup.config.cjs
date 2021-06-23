const { builtinModules } = require('module');
const { dependencies } = require('./package.json');

const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = [
	{
		input: 'source/index.js',
		output:{
			file: 'dist/replapi-it.cjs',
			format: 'cjs',
			preferConst: true,
			exports: 'auto',
		},
		plugins: [
			nodeResolve(),
			commonjs(),
			babel({
				babelHelpers: 'bundled',
				exclude: 'node_modules/**',
				presets: [
					[
						'@babel/env',
						{
							modules: false,
							useBuiltIns: "usage",
							corejs: 3,
							targets: 'maintained node versions',
						},
					],
				],
				plugins: ['lodash', 'tailcall-optimization'],
			}),
			terser(),
		],
		external: [
			...builtinModules,
			...Object.keys(dependencies),
			/lodash/
		],
	},
	{
		input: 'source/index.js',
		output:{
			file: 'dist/replapi-it.mjs',
			format: 'esm',
			preferConst: true,
		},
		plugins: [
			nodeResolve(),
			commonjs(),
			babel({
				babelHelpers: 'bundled',
				babelrc: false,
				exclude: 'node_modules/**',
				presets: [
					[
						'@babel/env',
						{
							modules: false,
							useBuiltIns: "usage",
							corejs: 3,
							targets: 'maintained node versions',
						},
					],
				],
				plugins: ['tailcall-optimization'],
			}),
			terser(),
		],
		external: [
			...builtinModules,
			...Object.keys(dependencies),
			/lodash/
		],
	}
];