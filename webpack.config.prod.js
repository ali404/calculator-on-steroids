const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PATHS = {
    app: path.join(__dirname, 'src/app.js'),
    js: path.join(__dirname, 'src/js'),
    css: path.join(__dirname, 'src/css'),
    build: path.join(__dirname, 'public/build')
}

module.exports = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'cheap-module-source-map',
    module: {
        loaders: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'react-hot'
            },
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                test: /\.svg$/,
                loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]'
            },
            {
                test: /\.woff$/,
                loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]'
            },
            {
                test: /\.woff2$/,
                loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]'
            },
            {
                test: /\.[ot]tf$/,
                loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]'
            },
            {
                test: /\.eot$/,
                loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('style.css'),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': "production"
        //     }
        // }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ],
}
