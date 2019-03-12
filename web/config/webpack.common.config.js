const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const config = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      chunks: ['widget'],
      filename: './testwidget.html',
      template: './web/widget.index.html'
    }),
    new HtmlWebPackPlugin({
      inject: true,
      chunks: ['progressbarwidget'],
      filename: './testprogressbar.html',
      template: './web/widget.index.html'
    }),
    new HtmlWebPackPlugin({
      inject: true,
      chunks: ['treecounterwidget'],
      filename: './treecounterwidget.html',
      template: './web/widget.index.html'
    }),
    new HtmlWebPackPlugin({
      chunks: ['bundle'],
      template: './web/index.html',
      filename: './index.html'
    }),

    new ExtractTextPlugin('[name].css')
  ]
};
module.exports = config;
