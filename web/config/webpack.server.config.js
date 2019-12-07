const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const commonConfig = require('./webpack.common.config.js')(true);
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
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
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          keep_fnames: true
        }
      })
    ]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        htmlLoader: {
          minimize: false
        }
      }
    })
  ]
});
