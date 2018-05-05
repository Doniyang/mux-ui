const webpack = require('webpack')
const path = require('path')
const webpckBaseConfig = require('./webpack.base.config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge')
module.exports = (env, args) => {
  return merge(webpckBaseConfig, {
    mode: 'development',
    module: {
      rules: [{
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              css: [{loader:'vue-style-loader',sourceMap:false,extract:false}, {loader:'css-loader',sourceMap:false,extract:false}, {loader:'postcss-loader',sourceMap:false,extract:false}],
              less:  [{loader:'vue-style-loader',sourceMap:false,extract:false}, {loader:'css-loader',sourceMap:false,extract:false}, {loader:'less-loader',sourceMap:false,extract:false}],
            },
            cssSourceMap: false,
            cacheBusting: true,
            transformToRequire: {
              video: ['src', 'poster'],
              source: 'src',
              img: 'src',
              image: 'xlink:href'
            }
          }
        }]
      }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      clientLogLevel: 'warning',
      historyApiFallback: {
        rewrites: [
          { from: /.*/, to: path.posix.join('/', 'index.html') },
        ],
      },
      hot: true,
      contentBase: false, // since we use CopyWebpackPlugin.
      compress: true,
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 8080,
      open: false,
      overlay: false,
      publicPath: '/',
      proxy: {},
      quiet: true,
      watchOptions: {
        poll: false
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': 'development'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }),
      new UglifyJsPlugin(),
      new FriendlyErrorsWebpackPlugin(),
    ]
  })
}
