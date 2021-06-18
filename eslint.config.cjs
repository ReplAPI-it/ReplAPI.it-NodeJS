module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	plugins: ['prettier'],
	extends: ['airbnb-base'],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		"prettier/prettier": "error",
		"no-console": "off",
		"no-debugger": "off",
		"import/extensions": "off",
		"import/no-mutable-exports": "off",
		"class-methods-use-this": "off",
	},
};
