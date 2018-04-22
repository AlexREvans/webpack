require("echo-loader")
require("raw-loader")

module.exports = {  
  mode: 'development',
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

