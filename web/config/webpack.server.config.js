const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const commonConfig = require('./webpack.common.config.js');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
  entry: ['babel-polyfill', path.join(__dirname, '../../index.web.js')],
  output: {
    path: path.join(__dirname, '../server'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        htmlLoader: {
          minimize: false
        }
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        keep_fnames: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify('production')
      }
    })
  ]
});
