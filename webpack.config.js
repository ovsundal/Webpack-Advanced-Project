var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//name of libraries we want to include in the separate vendor file
//(put files that rarely changes here - these will not be added to 
//bundle.js)
const VENDOR_LIBS = [
  'react', 'redux', 'lodash', 'react-redux', 'react-dom', 'faker',
  'react-input-range', 'redux-form', 'redux-thunk'
];

//multiple entry points, a bundle is created, then 
module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    //[name] - use key in entry section, 
    //[chunkhash] - a hash of the file included in file output name; used for cache busting
    filename: '[name].[chunkhash].js'
  },

  module: {
      //setup babel loader
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      //handle css
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    //prevent webpack from including library files in both vendor and bundle.js output
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    //obsolete the need to manually maintain script tags inside the HTML document
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    //reduce amount of error checking React does, only needed in dev. Tied to NODE_ENV=production in package.json
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

