const webpack = require('webpack')

const PROD = process.env.NODE_ENV == 'production'
const PROD_PLUGINS = [new webpack.optimize.UglifyJsPlugin({
	comments: false,
	compress: {warnings: false},
	minimize: true,
}), new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: '"production"',
	},
})]

module.exports = {
	devtool: '#sourcemap',
	entry: './src/index.tsx',
	output: {
		path: `${__dirname}/lib/`,
		filename: 'index.js',
		publicPath: '/lib/',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			exclude: /node_modules/,
			loader: 'awesome-typescript-loader',
		}],
	},
	plugins: PROD ? PROD_PLUGINS : [],
}
