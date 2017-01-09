const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const parts = require('./webpack.parts');

let option = {
    extractTextPlugin: new ExtractTextPlugin('[name].css')
}

const config = parts.common(option);

// all use relative path
module.exports = (env) => {
    console.log(`Current environment *** ${env} ***`);
    /**
     *  environment specify settings
     */
    if (env === "development") {
        config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/');
        config.plugins = config.plugins.concat(parts.devPlugins);
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
                loader: option.extractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader?minimize'
                })
            }
        )
    }

    return config;
}
