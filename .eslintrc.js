module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"node": true
	},
	"extends": [
		"eslint:recommended"
	],
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"rules": {
		"no-param-reassign": 'off',
		"max-params": 'off',
		'semi': ["error", "never"],
		"no-empty": 'off',
		'eol-last': 'error',
		'object-curly-spacing': ["error", "always"]
	},
	ignorePatterns: ['/node_modules']
}
