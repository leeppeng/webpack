const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = env => {
  if (!env) {
    env = {}
  }
  let plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './client/views/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
  if (env.production) {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: 'production'
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
    entry: './client/main.js',
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.(vue|js|jsx)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          enforce: 'pre' // 预处理
        },
        {
          test: /\.jsx$/,
          loader: 'babel-loader'
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            cssModules: {
              localIdentName: '[path][name]---[local]---[hash:base64:5]',
              camelCase: true
            },
            loaders: env.production ? {
              css: ExtractTextPlugin.extract({use: 'css-loader?minimize', fallback: 'vue-style-loader'}),
              scss: ExtractTextPlugin.extract({use: 'css-loader?minimize!sass-loader', fallback: 'vue-style-loader'}) // <style lang="scss">
            } : {
              css: 'style-loader!css-loader!sass-loader',
              scss: 'vue-style-loader!css-loader!sass-loader'
            },
            extractCSS: true
          }
        },
        {
          test: /\.css$/,
          use: env.production ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?minimize', 'sass-loader']
          }) : ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.scss$/,
          use: env.production ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?minimize'
          }) : ['style-loader', 'css-loader', 'sass-loader']
          // loader: 'style-loader!css-loader!sass-loader'
        }
      ]
    },
    plugins,
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
      }
    },
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist') // string
    }
  }
}
