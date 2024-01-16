/*const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '..', 'index.js'),
    web: path.resolve(__dirname, '..', 'index.web.js')
  },
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['module:metro-react-native-babel-preset'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
}; */

const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '..', 'index.js'),
    web: path.resolve(__dirname, '..', 'index.web.js'),
  },
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.web.js', '.js'],
    alias: {
        'react-native$': 'react-native-web',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['module:metro-react-native-babel-preset','@babel/preset-react'],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
        directory: path.resolve(__dirname, '..', 'public'),
    },
    compress: true,
    port: 8081,
    historyApiFallback: true,
  },
};

