const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: "localhost",
        port: 10888,
        contentBase: './public',
        historyApiFallback: true,
        hot: true,
        stats: {
            colors: true,
            hash: true,
            timings: true,
            chunks: false,
            chunkModules: true,
            children: true,
            modules: false,
            reasons: false,
            warnings: true,
            assets: true,
            version: false,
        }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
