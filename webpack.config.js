const path = require('path');

module.exports = {
  entry: {
    app: './src/component/app-element.js',
  },
  output: {
    filename: '[name]-element.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
  },
  devtool: "eval-source-map",
  performance: { hints: false }
};
