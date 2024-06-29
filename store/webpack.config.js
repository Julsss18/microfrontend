const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const dependencies = require("./package.json").dependencies;

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
      output: {
        publicPath: "http://localhost:3001/"
      },
      plugins: [
        new ModuleFederationPlugin({
            name: "store",
            filename: "remoteEntry.js",
            remotes: {},
            exposes: {
              "./store": "./src/redux/store",
              "./interfaces": "./src/interfaces/icharts"
            },
            shared: {
                react: {
                  singleton: true,
                  requiredVersion: dependencies.react
                },
                "react-dom": {
                  singleton: true,
                  requiredVersion: dependencies["react-dom"],
                }
            },
        }),
        new HtmlWebPackPlugin({
            template: './public/index.html',
        })
      ]
}