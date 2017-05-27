var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '../../static/', dir)
}
module.exports = {
  //context: path.join(__dirname, '../'), //加入解决路径问题
  entry: {
    app: './../static/src/js/src.js',
    header: './../static/src/js/header/header.js',
    login: './../static/src/js/login/login.js',
    changePassword: './../static/src/js/forget/changePassword.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': path.resolve(__dirname,'../node_modules/vue/dist/vue.esm.js'),
      'vue-router': path.resolve(__dirname,'../node_modules/vue-router/dist/vue-router.esm.js'),
      '@': resolve('src')
    },
    modules: [path.join(__dirname, '..', 'node_modules')]
  },
  resolveLoader: {
    modules: [path.join(__dirname, '..', 'node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.join(__dirname,'../')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname,'../static/src/'),path.resolve(__dirname,'../static/build/'),path.resolve(__dirname,'..')],
        exclude: /node_modules/,
        query: {
          "presets": [
            ["es2015", {"modules": false}]
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'vue-style-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  }
}
