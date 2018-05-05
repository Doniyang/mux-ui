const path = require('path')
const webpack = require('webpack')
const parse = dir => path.join(__dirname, '..', dir)
module.exports = {
  entry: () => new Promise((resolve, reject) => resolve([parse('src/main.js')])),
  output: {
    path: parse('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.(js|vue)$/,
        enforce: 'pre',
        exclude: [parse('node_modules')],
        use: [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: true
          }
        }]
      }, {
        test: /\.js$/,
        exclude: [parse('node_modules')],
        include: [parse('src'), parse('node_modules/webpack-dev-server/client')],
        use: [{
          loader: 'babel-loader'
        }]
      }, {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1
          }

        }, {
          loader: 'postcss-loader'
        }]
      }, {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': parse('src'),
      'Packages': parse('packages')
    }
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
