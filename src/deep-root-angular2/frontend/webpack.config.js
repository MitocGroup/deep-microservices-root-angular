var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var path = require('path');
var helpers = require('./config/helpers');

var webpackConfig = webpackMerge(helpers.webpackDepsConfig(), {
  context: helpers.root('..', '..'),
  entry: {
    'bootstrap': helpers.root('bootstrap.ts'),
    'js/vendor': helpers.root('js/vendor.ts'),
    'js/polyfills': helpers.root('js/polyfills.ts'),
  },

  resolve: {
    modules: [
      'node_modules',
      helpers.root('node_modules'),].concat(
      helpers.getMicroservices().map(ms => path.join(ms, 'frontend', 'node_modules'))
    ),
    extensions: ['', '.js', '.es6', '.ts', '.json'],
  },

  get resolveLoader() {
    return this.resolve;
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('index.html')],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file',
        query: {
          name: 'assets/[name].[hash].[ext]'
        }
      },
      {
        test: /\.css$/,
        loader: 'raw'
      },
      {
        test: /\.es6$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components|dist)/i,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['js/vendor', 'js/polyfills'],
    }),
  ],

  output: {
    path: helpers.root(),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
});

if (['dev', 'stage'].indexOf(helpers.deeployConfig().env) !== -1) {
  webpackConfig.devtool = 'cheap-module-source-map';
}

module.exports = webpackConfig;
