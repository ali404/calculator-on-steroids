const webpack = require('webpack')

module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        frameworks: ['mocha'],
        files: [
            'tests.webpack.js'
        ],
        plugins: [
            'karma-chrome-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-coverage',
            'karma-mocha-reporter'
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
        },
        reporters: ['mocha', 'coverage'],
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/
                    }
                ],
                postLoaders: [
                    {
                        test: /\.js$/,
                        exclude: /(\_\_tests\_\_|node_modules)\//,
                        loader: 'istanbul-instrumenter'
                    }
                ]
            },
            externals: {
                'cheerio': 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            }
        },
        webpackServer: {
            noInfo: true
        },
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }
    })
}
