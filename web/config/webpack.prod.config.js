const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const commonConfig = require('./webpack.common.config.js')(true);
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    donatetreewidget: [
      'babel-polyfill',
      path.join(__dirname, '../widgets/DonateTrees/widget.js')
    ],
    progressbarwidget: [
      'babel-polyfill',
      path.join(__dirname, '../widgets/progressbar/widget.js')
      // ],
      // ndviwidget: [
      //   'babel-polyfill',
      //   path.join(__dirname, '../widgets/NDVI/widget.js')
    ]
  },
  output: {
    path: path.join(__dirname, '../prod'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
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
    new MiniCssExtractPlugin(),
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
    })
  ]
});
