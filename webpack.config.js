const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.wasm$/,
        type: 'webassembly/async'
      }
    ],
  },
  mode: 'development',
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "url": require.resolve("url/"),
      "path": require.resolve("path-browserify"),
      "assert": require.resolve('assert/'),
      "util": require.resolve('util/'),
      "zlib": require.resolve('browserify-zlib'), // For zlib
      "querystring": require.resolve('querystring-es3'), // For querystring
      "events": require.resolve('events/'),
      "stream": require.resolve('stream/'),
      "http": require.resolve('stream-http'),
      "https": require.resolve('https-browserify'),
      "vm": require.resolve("vm-browserify"),
      "buffer": require.resolve("buffer/"), // Example polyfill for buffer
      
      "child_process": false, // Replace with appropriate polyfills if needed
      "fs": false, // This tells Webpack to not try to resolve 'fs'
      "os": false,
      "net": false,
      "tls": false,
      "events": false,
    }
  },
  experiments: {
    asyncWebAssembly: true
  }
};