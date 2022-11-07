const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
  return {
  entry: ["./lib/index.ts"],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|fnt|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
    },
  },
  mode: 'production',
  output: {
    filename: "index.min.js",
    path: path.resolve(__dirname, "dist"),
    globalObject: "this",
    library: "FlashPay",
    libraryExport: "default",
    libraryTarget: "umd",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({})],
  }
}
};