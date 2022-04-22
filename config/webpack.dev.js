const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const dist = path.resolve(__dirname, '../dist')

module.exports = {
  target: 'web',
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bioweapon.js',
    path: dist
  },
  devServer: {
    static: {
      directory: dist,
    },
    compress: true,
    port: 3000,
  },
  plugins: [
      new CopyPlugin({
          patterns: [
              { from: 'static' },
          ],
      }),
  ],
};