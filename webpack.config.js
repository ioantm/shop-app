const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const removeEmpty = array => array.filter(i => !!i);
  const cssModuleLoader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader?modules&importLoaders=1!postcss-loader!sass-loader'
  });

  const cssLoader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader'
  });

  // const sassLoader = ExtractTextPlugin.extract({
  //   notExtractLoader: 'style-loader',
  //   loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!resolve-url!postcss-loader',
  // });
  return {
    entry: {
      app: './index.js',
      vender: ['react', 'react-dom']
    },
    output: {
      filename: 'bundle.[name].[chunkhash].js',
      path: resolve(__dirname, 'public'),
      publicPath: '/',
      pathinfo: true
    },
    devServer: {
      contentBase: './public',
      noInfo: true,
      historyApiFallback: true,
      inline: true,
      proxy: {
        '/graphql': {
          target: 'http://localhost:8000/',
          secure: false,
          changeOrigin: true
        },
        '/api/**': {
          target: 'http://localhost:8000/',
          secure: false,
          changeOrigin: true
        }
      }
    },
    context: resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval',
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          loader: 'babel-loader',
          query: { cacheDirectory: true },
          exclude: ['/node_modules/', '/server/']
        },
        /* {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader', 'eslint-loader']
        }, */
        // {
        //   test: /\.css|sass$/,
        //   loader: (
        //     env.prod
        //       ? cssModuleLoader
        //       : 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!sass-loader!postcss-loader'
        //   ),
        //   exclude: [ '/server/' ]
        // },
        {
          test: /\.css|.sass$/,
          use: (env.prod
            ? cssModuleLoader
            : [
                {
                  loader: 'style-loader'
                },
                {
                  loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                },
                {
                  loader: 'sass-loader'
                }
              ])
        },
        {
          test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
          loader: 'url-loader',
          query: { limit: 10000, name: 'static/media/[name].[hash:8].[ext]' }
        }
      ]
    },
    plugins: removeEmpty([
      new HtmlWebpackPlugin({ template: './index.html' }),
      ifProd(new ExtractTextPlugin({ filename: 'app.css', allChunks: true })),
      ifProd(
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        })
      ),
      ifProd(
        new webpack.DefinePlugin({
          'process.env': { NODE_ENV: '"production"' }
        })
      ),
      ifProd(new webpack.optimize.CommonsChunkPlugin({ name: 'vender' })),
      ifProd(
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false
          }
        })
      ),
      ifProd(
        new BundleAnalyzerPlugin({
          // Can be `server`, `static` or `disabled`.
          // In `server` mode analyzer will start HTTP server to show bundle report.
          // In `static` mode single HTML file with bundle report will be generated.
          // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
          analyzerMode: 'server',
          // Host that will be used in `server` mode to start HTTP server.
          analyzerHost: '127.0.0.1',
          // Port that will be used in `server` mode to start HTTP server.
          analyzerPort: 8888,
          // Path to bundle report file that will be generated in `static` mode.
          // Relative to bundles output directory.
          reportFilename: 'report.html',
          // Automatically open report in default browser
          openAnalyzer: true,
          // If `true`, Webpack Stats JSON file will be generated in bundles output directory
          generateStatsFile: false,
          // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
          // Relative to bundles output directory.
          statsFilename: 'stats.json',
          // Options for `stats.toJson()` method.
          // For example you can exclude sources of your modules from stats file with `source: false` option.
          // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
          statsOptions: null,
          // Log level. Can be 'info', 'warn', 'error' or 'silent'.
          logLevel: 'info'
        })
      )
    ])
  };
};
