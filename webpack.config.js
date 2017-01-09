const {resolve} = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const NyanProgressWebpackPlugin = require('nyan-progress-webpack-plugin');
const {CheckerPlugin, TsConfigPathsPlugin} = require('awesome-typescript-loader');
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const parts = require('./webpack.parts');

let extractTextPlugin = new ExtractTextPlugin('[name].css');

// all use relative path
module.exports = (env) => {
    console.log(`Current environment *** ${env} ***`);

    let entry = {
        app: [
            './src/index.ts'
        ],
        vendor: [   //<- vendor packages
            'angular',
            'angular-material'
        ]
    };

    let output = {
        path: resolve('./dist'),
        filename: '[name].js',
    };

    let plugins = [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
        }),
        new NyanProgressWebpackPlugin(),
        new CheckerPlugin(),
        new TsConfigPathsPlugin(),
        new NgAnnotatePlugin({
            add: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // Specify the common bundle's name.
        }),
        extractTextPlugin
    ];

    let devPlugins = [
        // OccurenceOrderPlugin: Assign the module and chunk ids by occurrence count. 
        // https://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.NamedModulesPlugin()
    ]

    let loaders = [
        {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        }
    ];

    const config = {
        entry,
        output,
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            loaders
        },
        plugins,
        performance: {
            /**
             * remove the file oversize warning message when build
             */
            hints: false
        }
    }

    /**
     *  environment specify settings
     */
    if (env === "development") {
        config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/');
        config.plugins = plugins.concat(devPlugins);
        config.devServer = parts.devServer({
            // Customize host/port here if needed
            host: process.env.HOST,
            port: process.env.PORT
        });

        config.module.loaders.push(
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        )
    } else if (env === "production") {
        config.plugins.push(
            // https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            new webpack.optimize.UglifyJsPlugin({
                compress: true,
                mangle: true,
                comments: false
            }));
        config.module.loaders.push(
            {
                test: /\.css$/,
                loader: extractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader?minimize'
                })
            }
        )
    }

    return config;
}
