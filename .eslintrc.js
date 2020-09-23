module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'react/forbid-prop-types': [0, { forbid: ['any'] }],
		'react/prop-types': 0,
		'no-tabs': 0,
		'react/jsx-indent': 0,
		indent: 0,
		'react/jsx-indent-props': 0,
		'no-use-before-define': [0],
	},
};
