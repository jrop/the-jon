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
	entry: './src/index.js',
	output: {
		path: `${__dirname}/build`,
		filename: 'index.js',
		publicPath: '/build/',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}],
	},
	plugins: PROD ? PROD_PLUGINS : [],
}
