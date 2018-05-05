const webpack = require('webpack')
const webpckBaseConfig = require('./webpack.base.config.js')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const merge = require('webpack-merge')
module.exports = (env, args) = {
    return merge(webpckBaseConfig, {
        module: {
            rules: [{
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            css: ExtractTextPlugin.extract({
                                use: [{
                                    loader: 'css-loader',
                                    sourceMap: true
                                }, {
                                    loader: 'postcss-loader',
                                    sourceMap: true
                                }],
                                fallback: 'vue-style-loader'
                            }),
                            less: ExtractTextPlugin.extract({
                                use: [{
                                        loader: 'css-loader',
                                        sourceMap: true
                                    }, {
                                        loader: 'postcss-loader',
                                        sourceMap: true
                                    },
                                    {
                                        loader: 'less-loader',
                                        sourceMap: true
                                    }
                                ],
                                fallback: 'vue-style-loader'
                            })
                        }
                    }
                }]
            }]
        },
        devtool: 'source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': 'production'
            })
        ]
    })
}