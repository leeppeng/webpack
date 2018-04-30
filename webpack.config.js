const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
	if(!env){
		env = {}
	}
	let plugins = [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './app/views/index.html'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
	if(env.production) {
		plugins.push(
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"production"'
				}
			}),
			new ExtractTextPlugin('[name].css'),
			new UglifyJsPlugin({
				sourceMap: true
			})
		)
	}
	return {
		mode: 'none',
		entry: {
			app: './app/js/main.js' // webpack会搜索此文件进行编译，打包
		},
		devtool: 'source-map',
		devServer: {
			contentBase: path.join(__dirname, "dist"),
			compress: true,
			port: 9000,
			hot: true
		},
		module: {
			rules:[
				{
					test: /\.html$/,
					loader: 'html-loader'
				},
				{
					test: /\.css$/,
					use:  env.production ? ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: "css-loader?minimize"
					}) : ['style-loader','css-loader?minimize']
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
				{
					test: /\.scss$/,
					use: env.production ? ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: ['css-loader?minimize', 'sass-loader']
					}) : ["style-loader","css-loader","sass-loader"]
					/*use: [{
						loader: "style-loader" // 将 JS 字符串生成为 style 节点
					}, {
						loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
					}, {
						loader: "sass-loader" // 将 Sass 编译成 CSS
					}]*/
					//loader: "style-loader!css-loader!sass-loader"
				}
			]
		},
		plugins,
		output: {
			filename: '[name].min.js',
			path: path.resolve(__dirname,'dist')
		}
	}
}