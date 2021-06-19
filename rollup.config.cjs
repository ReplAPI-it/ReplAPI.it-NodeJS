const { builtinModules } = require('module');
const { dependencies } = require('./package.json');

module.exports = {
	input: 'source/index.js',
	output: [
//		{
//			file: 'dist/replapi-it.cjs',
//			format: 'cjs',
//			preferConst: true,
//		},
		{
			file: 'dist/replapi-it.mjs',
			format: 'esm',
			preferConst: true,
		},
	],
	external: [...builtinModules, ...Object.keys(dependencies)],
};