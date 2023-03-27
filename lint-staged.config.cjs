module.exports = {
	'*.{ts,tsx}': () => [
		'npm run format:fix',
		'npm run format:check',
		'npm run type:check',
		'npm run lint',
	],
};
