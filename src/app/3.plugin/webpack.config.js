const RedundantComparisonPlugin = require('./src/compilation/RedundantComparison.js')

module.exports = {
  mode: 'development',
  plugins: [
    new RedundantComparisonPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};

