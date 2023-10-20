const path = require('node:path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './entry.js',
  output: {
    // filename: 'main.js',
    library: 'Library',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  optimization: {
    minimize: false,
  },
};
