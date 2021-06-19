module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    rules: {
		"no-console": "off",
		"no-debugger": "off",
		"import/extensions": "off",
		"import/no-mutable-exports": "off",
		"class-methods-use-this": "off",
	},
};
