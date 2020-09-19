import multi from '@rollup/plugin-multi-entry';

const isProd = process.env.NODE_ENV === 'production';
const input = process.argv.indexOf('--watch') > -1 ? '**/*.js' : 'main.js';

export default {
	input: `src/js/${input}`,
	output: {
		file: 'dist/js/main.js',
		format: 'es',
		sourcemap: isProd ? false : 'inline'
	},
	watch: {
		clearScreen: false
	},
	plugins: [multi({
		exports: false
	})]
};
