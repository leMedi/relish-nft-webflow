const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require('webpack-merge');

const common = require('./webpack.config');

const distDir = path.join(__dirname, './dist');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: distDir,
    filename: "bundle.js",
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin({extractComments: false})],
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});