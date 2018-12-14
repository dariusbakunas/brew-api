const nodeExternals = require('webpack-node-externals');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const dev = argv.mode !== 'production';

  const serverPlugins = [
    new CopyWebpackPlugin([
      {
        from: 'src/templates',
        to: 'templates',
        toType: 'dir',
      },
      {
        from: 'src/schema',
        to: 'schema',
        toType: 'dir',
      },
    ]),
  ];

  if (dev) {
    serverPlugins.push(new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }));
  }

  return {
    mode: dev ? 'development' : 'production',
    entry: {
      server: './src/server.js',
    },
    node: {
      __filename: false,
      __dirname: false,
    },
    devtool: 'sourcemap',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].bundle.js',
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: serverPlugins,
  };
};
