const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
function getConfig(prodEnv) {
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
        filename: './progressbarwidget.html',
        template: './web/widget.index.html'
      }),
      new HtmlWebPackPlugin({
        inject: true,
        chunks: ['treecounterwidget'],
        filename: './treecounterwidget.html',
        template: './web/widget.index.html'
      }),
      new HtmlWebPackPlugin({
        inject: true,
        chunks: ['donatetreewidget'],
        filename: './donatetreewidget.html',
        template: './web/widget.index.html'
      }),
      // new HtmlWebPackPlugin({
      //   inject: true,
      //   chunks: ['ndviwidget'],
      //   filename: './ndviwidget.html',
      //   template: './web/widget.index.html'
      // }),
      new HtmlWebPackPlugin({
        chunks: ['bundle'],
        template: './web/index.html',
        filename: './index.html'
      }),
      new FaviconsWebpackPlugin('./app/assets/images/Planet-Logo.png'),
      new ExtractTextPlugin(prodEnv ? '[name].[hash].css' : '[name].css')
    ]
  };
  return config;
}
module.exports = getConfig;
