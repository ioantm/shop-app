const { resolve } = require('path')

module.exports = env => {
    return {
        entry: './index.js',
        output: {
            filename: 'bundle.js',
            path: resolve(__dirname, 'public'),
            pathinfo: true
        },
        devServer: {
            contentBase: "./public",
            historyApiFallback: true
        },
        context: resolve(__dirname, 'src'),
        devtool: env.prod ? 'source-map' : 'eval',
        module: {
            loaders: [
                { 
                    test: /\.js|jsx$/, 
                    loader: 'babel-loader', 
                    query: {
                        cacheDirectory: true
                    },
                    exclude: '/node_modules/'
                },
                { test: /\.css$/, loader: 'style-loader!css-loader'},
                {
                    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                    loader: 'file-loader',
                    query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                    }
                },
                {
                    test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
                    loader: 'url-loader',
                    query: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                    }
                }
            ]
        }
    }
}