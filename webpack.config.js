const webpack = require('webpack');

module.exports = {
  entry: {
    slv: ["babel-polyfill", "./src/app.js"],
  },
  output: {
    path: __dirname + "/dist/",
    filename: "js/[name].js"
  },
  resolve: {
    alias: {
      "package.json": __dirname + "/package.json"
    },
    root: [
      __dirname + "/src"
    ]
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?modules&camelCase&localIdentName=[local]-[hash:base64:5]&sourceMap", "sass"]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      },
      {
        test: /\.(wav|mp3)$/,
        loader: "buffer"
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      // 'REVISION': JSON.stringify(require('child_process').execSync('git rev-parse HEAD').toString().trim()),
    })
  ],
  devtool: "source-map"
};
