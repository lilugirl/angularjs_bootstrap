const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  entry: 'app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname + '/dist', 'bundle')
  },
  devtool: 'source-map', // for debug purposes on production
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.(png|jpe?g)/i,
        use: [{
            loader: 'url-loader',
            options: {
              name: './assets/images/[name].[ext]',
              limit: 10000
            }
          },
          {
            loader: 'img-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
            loader: 'ng-annotate-loader'
          },
          {
            loader: 'babel-loader'
          }
        ]

      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};