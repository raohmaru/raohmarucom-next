module.exports = (ctx) => {
	const isProd = ctx.env === 'production';
	return Object.assign({}, ctx.options, {
		map: !isProd,
		plugins: [
			require('postcss-preset-env')(),
			require('postcss-import')(),
			require('postcss-nested')(),
			require('autoprefixer')(),
			isProd && require('cssnano')({
				preset: ['default', {
					autoprefixer: false
				}]
			})
		]
	});
}
