// const path = require('path')

module.exports = {
  mode: 'development',

  // -- Lines excluded - they're defaults as of webpack 4!
  // entry: './src/index.js',
  // output: {
  //   filename: 'main.js',
  //   path: path.resolve(__dirname, 'dist')
  // },
  
  module: {
    rules: [
      { test: /\.js$/ }
    ]
  }
};

