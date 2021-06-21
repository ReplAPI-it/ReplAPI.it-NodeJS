const { builtinModules } = require('module');
const { dependencies } = require('./package.json');

const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = [
	{
		input: 'source/index.js',
		output:{
			file: 'dist/replapi-it.cjs',
			format: 'cjs',
			preferConst: true,
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
				plugins: ['lodash'],
			}),
		],
		external: [
			...builtinModules,
			...Object.keys(dependencies),
			'lodash/assign',
			'lodash/findIndex',
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
			}),
		],
		external: [
			...builtinModules,
			...Object.keys(dependencies),
			'lodash/assign',
			'lodash/findIndex',
		],
	}
];