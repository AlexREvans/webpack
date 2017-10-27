const path = require('path')

var loaders = arr => arr.map(x => x+"-loader").map(require) 

loaders(["echo", "raw"])

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
          { loader: 'css-loader' }
        ]
      }

      // https://webpack.js.org/loaders/
      
    ]
  }
};

