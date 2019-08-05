const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const Dotenv = require('dotenv-webpack');

const commonConfig = require('./webpack.common.config.js');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
  entry: {
    bundle: ['babel-polyfill', path.join(__dirname, '../../index.web.js')],
    widget: [
      'babel-polyfill',
      path.join(__dirname, '../widgets/basic/widget.js')
    ],
    treecounterwidget: [
      'babel-polyfill',
      path.join(__dirname, '../widgets/Treecounter/widget.js')
    ],
    donatetreewidget: [
      'babel-polyfill',
      path.join(__dirname, '../widgets/DonateTrees/widget.js')
    ],
    progressbarwidget: [
      'babel-polyfill',
      path.join(__dirname, '../widgets/progressbar/widget.js')
    ],
    ndviwidget: [
      'babel-polyfill',
      path.join(__dirname, '../widgets/NDVI/widget.js')
    ]
  },
  output: {
    path: path.join(__dirname, '../prod'),
    filename: '[name].js',
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
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Dotenv({
      path: path.join(__dirname, '../../.env'),
      defaults: path.join(__dirname, '../../defaults.env')
    })
  ]
});
