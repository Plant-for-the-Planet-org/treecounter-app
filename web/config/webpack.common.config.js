var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

var config = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "stage-2"]
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "[hash].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./web/index.html",
      filename: "./web/index.html"
    }),
    new ExtractTextPlugin("[name].css")
  ]
};
module.exports = config;
