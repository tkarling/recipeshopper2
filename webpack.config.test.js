var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        'app': './src/test.ts',
        'vendor': './src/vendor.ts'
    },

    output: {
        publicPath: '/',
        path: "./testdist",
        filename: "test-bundle.js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/test/index.html'
        })
    ],

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' },
        ],

        noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bundles') ]
    },

    devtool: 'source-map',

    devServer: {
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 8082
    }
};