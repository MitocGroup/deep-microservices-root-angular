var webpack = require('webpack');
var path = require('path');
var helpers = require('./config/helpers');

module.exports = {
  context: helpers.root('..', '..'),
  entry: {
    'bootstrap': helpers.root('bootstrap.ts'),
    'js/vendor': helpers.root('js/vendor.ts'),
    'js/polyfills': helpers.root('js/polyfills.ts'),
  },

  resolve: {
    root: helpers.root(),
    modulesDirectories: [
      'node_modules',
      helpers.root('node_modules'),
    ].concat(helpers.getMicroservices().map(ms => path.join(ms, 'frontend', 'node_modules'))),
    extensions: ['', '.js', '.ts'],
    modules: ['node_modules'],
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          require.resolve('awesome-typescript-loader'),
          require.resolve('angular2-template-loader'),
        ]
      },
      {
        test: /\.html$/,
        loader: require.resolve('raw-loader'),
        exclude: [helpers.root('index.html')],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'raw'
      }
    ]
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
};
