const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CheckerPlugin, TsConfigPathsPlugin} = require('awesome-typescript-loader');
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');


// all use relative path
module.exports = () => {
    const config = {
        entry: {
            app: './src/index.ts'
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
            })

        ]
    }
    return config;
}
