const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = (env, argv) => {
  const dev = argv.mode !== 'production';

  return {
    mode: dev ? 'development' : 'production',
    entry: {
      server: './src/server.js',
    },
    node: {
      __filename: true,
      __dirname: true,
    },
    devtool: 'sourcemap-inline',
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
  };
};
