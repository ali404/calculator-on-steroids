const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PATHS = {
    app: path.join(__dirname, 'static/app.js'),
    js: path.join(__dirname, 'static/js'),
    css: path.join(__dirname, 'static/css'),
    build: path.join(__dirname, 'public/build')
}

function getDevTool() {
    if(process.env.NODE_ENV !== 'production') {
        return 'eval-source-map'
    }

    return false
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
    devtool: getDevTool(),
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
                loaders: ['style-loader', 'css-loader', 'sass-loader']
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
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: PATHS.build,
        historyAPIFallback: true,
        hot: true,
        inline: true,
        progress: true,

        stats: 'errors-only',

        host: process.env.HOST,
        port: process.env.PORT
    }
}
