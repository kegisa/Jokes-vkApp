const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const {resolvePath} = require('./utils');

const appTsConfig = resolvePath('tsconfig.json');

module.exports = {
    entry: {
        app: './src/index'
    },
    resolve: {
        extensions: ['.css', '.ts', '.tsx', '.js', '.json'],
        plugins: [new TsconfigPathsPlugin({configFile: appTsConfig})],
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg|png|ico)$/,
                loader: 'file-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /icons-(192|512)\.png$/,
                use: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.json$/,
                type: 'javascript/auto',
                use: 'file-loader?name=[name].[ext]',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Aneks',
            template: './public/index.html',
        }),
        new webpack.ProvidePlugin({
            Promise: ['es6-promise', 'Promise']
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: resolvePath('dist'),
    },
};
