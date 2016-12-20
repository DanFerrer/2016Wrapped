const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const config = {
  devtool: 'cheap-module-source-map',
  entry: [
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle-[hash].min.js',
    publicPath: '/'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extension: ['', '.js', '.scss']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.join(__dirname, 'src/index.html')
    }),
    new ExtractTextPlugin('styles-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        'presets': ['es2015']
      }
    },
    {
      test: /\.html$/,
      loader: 'html'
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!sass!postcss')
    }]
  },
  postcss: [ autoprefixer({ browsers: ['last 3 versions']}) ]
};

module.exports = config;
