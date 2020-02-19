const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const Dotenv = require('dotenv-webpack');
function getConfig(prodEnv) {
  const config = {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/transform-react-jsx',
              '@babel/plugin-proposal-class-properties'
            ]
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
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development'
              }
            },
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[hash].[ext]'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: !prodEnv, // webpack@1.x
                disable: !prodEnv, // webpack@2.x and newer
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 2
                }
              }
            }
          ]
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
      new MiniCssExtractPlugin({
        filename: prodEnv ? '[name].[hash].css' : '[name].css',
        chunkFilename: prodEnv ? '[id].[hash].css' : '[id].css'
      }),
      new Dotenv({
        path: (!prodEnv && '.env.develop') || (prodEnv && '.env.production'),
        safe: false
      })
    ]
  };
  return config;
}
module.exports = getConfig;
