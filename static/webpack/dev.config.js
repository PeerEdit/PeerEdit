const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'bootstrap-loader',
        'webpack-hot-middleware/client',
        './src/index',
    ],
    output: {
        publicPath: '/dist/',
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015']
        },
        {
            test: /\.scss$/,
            loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!sass',
        },
        {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        },
        {
            test: /\.(png|gif|jpe?g|svg)$/i,
            loader: 'file-loader'
        }],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
            __DEVELOPMENT__: true,
        }),
        new ExtractTextPlugin('bundle.css'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
        }),
    ],
};
