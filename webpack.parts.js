const webpack = require('webpack');
const {resolve} = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const NyanProgressWebpackPlugin = require('nyan-progress-webpack-plugin');
const {CheckerPlugin, TsConfigPathsPlugin} = require('awesome-typescript-loader');
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');


exports.devServer = (options) => {
    return {
        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback: true,

        // Unlike the cli flag, this doesn't set
        // HotModuleReplacementPlugin!
        hot: true,

        // Don't refresh if hot loading fails. If you want
        // refresh behavior, set inline: true instead.
        hotOnly: false,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        // Parse host and port from env to allow customization.
        //
        // If you use Vagrant or Cloud9, set
        // host: options.host || '0.0.0.0';
        //
        // 0.0.0.0 is available to all network devices
        // unlike default `localhost`.
        host: options.host, // Defaults to `localhost`
        port: options.port // Defaults to 8080

    }
};


exports.common = (option) => {
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
        option.extractTextPlugin
    ];

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

    return config;
}

exports.devPlugins = [
    // OccurenceOrderPlugin: Assign the module and chunk ids by occurrence count. 
    // https://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.NamedModulesPlugin()
]