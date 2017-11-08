const path = require('path');
const Html = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join( __dirname, 'dist'),
    filename: 'index.js'
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new Html({
      favicon: false
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  Object.assign(module.exports, {
    entry: './src/index.js',
    output: Object.assign(module.exports.output, {
      libraryTarget: "commonjs2",
    }),
    externals: [nodeExternals()],
    devtool: undefined,
    plugins: []
  });
}
