const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js')();
const path = require('path');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  entry: {
    bundle: [path.join(__dirname, '../../index.web.js')]
    /* uncomment these widgets if you want to work on them */
    // widget: [ path.join(__dirname, '../widgets/basic/widget.js') ],
    // treecounterwidget: [ path.join(__dirname, '../widgets/Treecounter/widget.js') ],
    // donatetreewidget: [ path.join(__dirname, '../widgets/DonateTrees/widget.js') ],
    // progressbarwidget: [ path.join(__dirname, '../widgets/progressbar/widget.js') ]
    // ndviwidget: [ path.join(__dirname, '../widgets/NDVI/widget.js') ]
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    historyApiFallback: true,
    disableHostCheck: true
    //port: 8080,
    //host: '0.0.0.0'
  }
});
