const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  getBaseWebpackConfig(options, { app, index = "./index.html" }) {
    if (options.mode == null) {
      console.warn("WARNING: No mode was set. Will default to `development`");
    }
    const NODE_ENV = process.env.NODE_ENV === "ci" ? "ci" : options.mode || "development";

    const configPath = path.resolve(__dirname, `../config/${NODE_ENV}.json`);
    const config = require(configPath);
    const {
      private: {
        [app]: { HOST, PORT },
      },
      ...publicVars
    } = config;

    const defineVars = Object.entries(publicVars).reduce((acc, [key, value]) => {
      acc[key] = JSON.stringify(value);
      return acc;
    }, {});

    console.log("NODE_ENV: ", NODE_ENV);
    console.log("APP_CONFIG: ", defineVars);

    const publicPath = `../public/${app}/`;

    return {
      output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, publicPath),
        publicPath: "/",
      },
      plugins: [
        // Check `config/development.json` to see what vars get passed to `window`.
        // Everything except for the `private` key is included.
        new webpack.DefinePlugin({ "process.env": defineVars }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
          filename: "[name].[hash].css",
          chunkFilename: "[id].[hash].css",
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: config.PAGE_TITLE,
          template: index,
          favicon: "./favicon/favicon.ico",
        }),
      ],
      resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"],
        alias: {
          // Shared
          "@api": path.resolve(__dirname, "..", "api"),
          "@common": path.resolve(__dirname, "..", "common"),
          "@uikit": path.resolve(__dirname, "..", "uikit"),
          // Apps
          "@app": path.resolve(__dirname, "..", "app"),
          "@admin": path.resolve(__dirname, "..", "admin"),
          "@graphics": path.resolve(__dirname, "..", "graphics"),
        },
      },
      module: {
        rules: [
          {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /(\.mod)\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[name]__[local]--[hash:base64:5]",
                  },
                },
              },
              "postcss-loader",
            ],
          },
          {
            test: /\.css$/,
            exclude: /\.mod\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  modules: false,
                },
              },
              "postcss-loader",
            ],
          },
          {
            test: /\.(png|svg|jpg|gif|mp4|webm)$/,
            use: [
              {
                loader: "file-loader",
                options: {
                  outputPath: "./images/",
                  publicPath: "/images/",
                  name: (_file) => {
                    if (NODE_ENV === "development") {
                      return "[name].[ext]";
                    }

                    return "[contenthash].[ext]";
                  },
                },
              },
            ],
          },
        ],
      },

      stats: { children: false },
      devServer: {
        contentBase: path.join(__dirname, publicPath),
        compress: true,
        host: HOST, // Probably localhost in development
        port: PORT, // Probably 8080 in development
        historyApiFallback: true,
      },
    };
  },
};
