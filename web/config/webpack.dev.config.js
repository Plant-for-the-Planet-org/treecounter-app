const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
  entry: ['babel-polyfill', path.join(__dirname, '../../index.web.js')],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'index.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    port: 8080,
    historyApiFallback: true,
    disableHostCheck: true,
    host: '0.0.0.0', 
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify('development')
      }
    })
  ]
});
