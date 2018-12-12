const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const dev = argv.mode !== 'production';

  const serverPlugins = [];

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
      __filename: true,
      __dirname: true,
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
