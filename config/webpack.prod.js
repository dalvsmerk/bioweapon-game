const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const dist = path.resolve(__dirname, '../dist')

module.exports = {
  target: 'web',
  mode: 'production',
  entry: './src/index.ts',
  // entry: {
    // bioweapon: './src/index.ts',
    // vendor: ['three'],
  // },
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
    // filename: 'bioweapon.js',
    filename: '[name].js',
    path: dist
  },
  plugins: [
      new CopyPlugin({
          patterns: [
              { from: 'static' },
          ],
      }),
  ],
};