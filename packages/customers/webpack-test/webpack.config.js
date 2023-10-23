const path = require('node:path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'production',
  entry: './entry.js',
  output: {
    // filename: 'main.js',
    library: {
      name: 'Library',
      type: 'umd',
      // type: 'commonjs-module',
    },
    path: path.resolve(__dirname, 'dist'),
    clean: true,
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
    splitChunks: {
      // chunks: 'all',
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      name: (module, chunks, cacheGroupKey) => {
        const allChunksNames = chunks.map((chunk) => chunk.name).join('-');
        return allChunksNames;
      },
      cacheGroups: {
        vueVendor: {
          test: /[\\/]node_modules[\\/](vue|vuex|vue-i18n|vue-demi)[\\/]/,
          name: 'vendor-vue',
          chunks: 'all',
        },
        corejsVendor: {
          test: /[\\/]node_modules[\\/](core-js)[\\/]/,
          name: 'vendor-corejs',
          chunks: 'all',
        },
        flagsComponentsDory: {
          test: /[\\/]node_modules[\\/]@dory[\\/]fe-components[\\/]((?!dist[\\/]@dory[\\/]esm[\\/]entry\.esm\.js).*)/,
          name: 'dory-flags',
          chunks: 'all',
        },
      },
      //     cacheGroups: {
      //       defaultVendors: {
      //         // test: /[\\/]node_modules[\\/]/,
      //         test: function (module) {
      //           console.log(module.resource);
      //           return (
      //             module.resource &&
      //             !(
      //               module.resource.includes('@ag-grid-community') ||
      //               module.resource.includes('@ag-grid-enterprise') ||
      //               module.resource.includes('highcharts')
      //             )
      //           );
      //         },
      //         // priority: -10,
      //         reuseExistingChunk: true,
      //         name: (module, chunks) => {
      //           console.log(chunks.map((item) => item.name));
      //           if (chunks.length === 1 && chunks[0].name === null) {
      //             return 'flag';
      //           }
      //           return 'vendor';
      //         },
      //       },
      //       default: {
      //         minChunks: 2,
      //         priority: -20,
      //         reuseExistingChunk: true,
      //       },
      // },
    },
  },
};
