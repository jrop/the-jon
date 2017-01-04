'use strict'

module.exports = {
	devtool: '#sourcemap',
	entry: './src/index.js',
	output: {
		path: `${__dirname}/build`,
		filename: 'index.js',
		publicPath: '/build/',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}],
	},
}
