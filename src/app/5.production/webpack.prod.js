const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',

    // https://github.com/webpack/docs/wiki/optimization
    optimization: {
        minimize: true
    },

    plugins: [

        // Defaults as of webpack 4!

        // Other minification options exist (babel & gclosure)
        // new UglifyJSPlugin({
        //     sourceMap: true
        // }),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // })
    ]
});