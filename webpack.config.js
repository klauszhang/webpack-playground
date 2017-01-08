const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CheckerPlugin, TsConfigPathsPlugin} = require('awesome-typescript-loader');
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpack = require('webpack');

// all use relative path
module.exports = (env) => {
    const config = {
        entry: {
            app: './src/index.ts',
            vendor: [   //<- vendor packages
                'angular',
                'angular-material'
            ]
        },
        output: {
            path: './dist',
            filename: '[name].js',
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    loader: 'awesome-typescript-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: true,
            }),
            new CheckerPlugin(),
            new TsConfigPathsPlugin(),
            new NgAnnotatePlugin({
                add: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor' // Specify the common bundle's name.
            }),
            // OccurenceOrderPlugin: Assign the module and chunk ids by occurrence count. 
            // https://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin
            new webpack.optimize.OccurrenceOrderPlugin(),

        ],
        performance: {
            /**
             * remove the file oversize warning message when build
             */
            hints: false
        }
    }
    return config;
}
