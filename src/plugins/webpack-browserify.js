const webpack = require('webpack');

module.exports = function (context, options) {
    return {
      name: 'webpack-browserify',
      // eslint-disable-next-line
      configureWebpack(config, isServer, utils) {
        return {
          resolve: {
            alias: {
              path: require.resolve('path-browserify'),
            },
            fallback: {
              fs: false,
              http: require.resolve('stream-http'),
              https: require.resolve('https-browserify'),
              os: require.resolve('os-browserify/browser'),
              crypto: require.resolve('crypto-browserify'),
              buffer: require.resolve('buffer/'),
              stream: require.resolve('stream-browserify'),
              vm: require.resolve('vm-browserify'),
            },
          },
          plugins: [
            new webpack.ProvidePlugin({
              Buffer: ['buffer', 'Buffer'],
              process: 'process/browser',
            }),
          ],
        };
      },
    };
  };