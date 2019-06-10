// basic vars
const path = require('path');
const webpack = require('webpack');

// additional plugins
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ImagesminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');

// module settings
module.exports = {
	mode: "production",

	// базовый путь к проекту
	context: path.resolve(__dirname, 'src'),

	// точки входа js
	entry: {
		// основной фал приложения
		app: [
			'./index.js', // относительно context
			'./index.scss'
		],
	},

	// путь для собранных файлов
	output: {
		filename: 'js/index.js',
		path: path.resolve(__dirname, 'build')
	},

	module: {
		rules: [
			// html
			{
				test: /\.pug$/,
				use: [
					{
						loader: 'pug-loader',
						options: {
							pretty: true
						}
					}
				]
			},

			// js
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				]
			},

			// scss
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader:'css-loader',
							options: {
								sourceMap: true,
								url: false
							}
						},
						/*{
							loader:'postcss-loader',
							options: {
								sourceMap: true,
								plugins: function () { // post css plugins, can be exported to postcss.config.js
									return [
										require('precss'),
										require('autoprefixer')
									];
								}
							}
						},*/
						{
							loader:'sass-loader',
							options: {
								sourceMap: true
							}
						},
					],
					fallback: 'style-loader',
				})
			},

			// images
			{
				test: /\.{png|gif|jpg|jpeg}$/,
				exclude: /node_modules/,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						}
					},
					'img-loader'
				]
			},

			// fonts
			{
				test: /\.{woff|woff2|eot|ttf|otf}$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						}
					}
				]
			},

			// svg
			{
				test: /\.svg/,
				loader: 'svg-url-loader'
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.pug',
			minify: false
		}),

		new ExtractTextPlugin({
			filename: 'css/index.css'
		}),

		new ImagesminPlugin({
			test: /\.{png|gif|jpe&g|svg}$/i
		}),

		new CopyWebpackPlugin(
			[
				{ from: './images', to: 'images', copyUnmodified: true },
				{ from: './fonts', to: 'fonts', copyUnmodified: true }
			],
			{ignore: [{glob: 'svg/*'}]}
		),

		new webpack.ProvidePlugin({
			Popper: ['popper.js', 'default']
		}),

		new webpack.LoaderOptionsPlugin({
			minimize: false,
		}),

		new CleanWebpackPlugin (),

		new UglifyJSPlugin()
	]
};