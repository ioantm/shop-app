const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const removeEmpty = array => array.filter(i => !!i);
  const cssModuleLoader = ExtractTextPlugin.extract({
    notExtractLoader: 'style-loader',
    loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
  });

  const cssLoader = ExtractTextPlugin.extract({
    notExtractLoader: 'style-loader',
    loader: 'css-loader'
  });

  // const sassLoader = ExtractTextPlugin.extract({
  //   notExtractLoader: 'style-loader',
  //   loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!resolve-url!postcss-loader',
  // });
  return {
    entry: { app: './index.js', vender: [ 'react', 'react-dom', 'styled-components', 'react-router' ] },
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
      loaders: [
        {
          test: /\.js|jsx$/,
          loader: 'babel-loader',
          query: { cacheDirectory: true },
          exclude: [ '/node_modules/', '/server/' ]
        },
        /* {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader', 'eslint-loader']
        }, */
        {
          test: /\.css$/,
          include: resolve(__dirname + '/node_modules/'),
          loader: env.prod ? cssLoader : 'style-loader!css-loader'
        },
        {
          test: /\.css$/,
          exclude: resolve(__dirname + '/node_modules/'),
          loader: env.prod
            ? cssModuleLoader
            : 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        },
        {
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
          loader: 'file-loader',
          query: { name: 'static/media/[name].[hash:8].[ext]' }
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
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })),
      ifProd(new webpack.DefinePlugin({
        'process.env': { NODE_ENV: '"production"' }
      })),
      ifProd(new webpack.optimize.CommonsChunkPlugin({ name: 'vender' })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        }
      }))
    ])
  };
};
