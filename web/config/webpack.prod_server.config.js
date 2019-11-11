const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const commonConfig = require('./webpack.common.config.js')(true);
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
      // ],
      // ndviwidget: [
      //   'babel-polyfill',
      //   path.join(__dirname, '../widgets/NDVI/widget.js')
    ]
  },
  output: {
    path: path.join(__dirname, '../server'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      }
    ]
  },
  plugins: [
    new BugsnagBuildReporterPlugin({
      apiKey: '6f2971a9b077662912f61ae602716afd',
      appVersion: pkg.version
    }),
    new BugsnagSourceMapUploaderPlugin({
      apiKey: '6f2971a9b077662912f61ae602716afd',
      appVersion: pkg.version,
      overwrite: true,
      publicPath: '*'
    }),
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
      },
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
