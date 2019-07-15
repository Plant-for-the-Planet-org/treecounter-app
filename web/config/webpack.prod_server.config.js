const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const Dotenv = require('dotenv-webpack');

require(`dotenv-defaults`).config({
  path: path.join(__dirname, '../../.env'),
  defaults: path.join(__dirname, '../../defaults.env')
});

const commonConfig = require('./webpack.common.config.js');
const path = require('path');
const {
  BugsnagBuildReporterPlugin,
  BugsnagSourceMapUploaderPlugin
} = require('webpack-bugsnag-plugins');
const pkg = require('../../package.json');

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
    progressbarwidget: [
      'babel-polyfill',
      path.join(__dirname, '../widgets/progressbar/widget.js')
    ],
    donatetreewidget: [
      'babel-polyfill',
      path.join(__dirname, '../widgets/DonateTrees/widget.js')
    ]
  },
  output: {
    path: path.join(__dirname, '../server'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  plugins: [
    new BugsnagBuildReporterPlugin({
      apiKey: process.env.BUGSNAG_API_KEY,
      appVersion: pkg.version
    }),
    new BugsnagSourceMapUploaderPlugin({
      apiKey: process.env.BUGSNAG_API_KEY,
      appVersion: pkg.version,
      overwrite: true,
      publicPath: '*'
    }),
    new WebpackCleanupPlugin({
      preview: true
    }),
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
      },
      sourceMap: true
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
