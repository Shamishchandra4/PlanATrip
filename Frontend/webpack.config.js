const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  // Other webpack configuration...
  plugins: [
    new NodePolyfillPlugin(),
  ],
  resolve: {
    fallback: {
      global: require.resolve('node-polyfill-webpack-plugin')
    }
  }
};
