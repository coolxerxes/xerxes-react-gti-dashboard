module.exports = {
	ignorePatterns: ['vite.config.ts', 'vite-env.d.ts', 'lint-staged.config'],
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'standard-with-typescript',
		'prettier',
		'plugin:import/typescript',
		'plugin:react-hooks/recommended',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	plugins: ['react'],
	rules: {
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['warn'],
		'@typescript-eslint/explicit-module-boundary-types': ['off'],
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': 'error',
		'react/react-in-jsx-scope': 'off',
		'no-console': 2,
		'import/no-duplicates': 'warn',
		'@typescript-eslint/no-misused-promises': [
			2,
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
