const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'production',

    entry: ['./src/index'],

    output: {
        publicPath: 'dist/',
    },

    optimization: {
        minimize: true
    },

};
