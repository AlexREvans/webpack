const path = require('path')

require("echo-loader")
require("raw-loader")

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      
      { test: /\.js$/ },

      { test: /\.js$/, use: 'echo-loader'},
      
      { test: /todo$/, use: 'raw-loader'},
      
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },

          //{ loader: 'style!css' },
        ]
      }

      // https://webpack.js.org/loaders/
      
    ]
  }
};

