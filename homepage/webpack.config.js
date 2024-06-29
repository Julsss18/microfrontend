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
        publicPath: "http://localhost:3000/"
      },
      plugins: [
        new ModuleFederationPlugin({
            name: "homepage",
            filename: "remoteEntry.js",
            remotes: {
              charts: 'charts@http://localhost:3002/remoteEntry.js',
              store: 'store@http://localhost:3001/remoteEntry.js'
            },
            shared: {
                react: {
                  requiredVersion: dependencies.react,
                },
                "react-dom": {
                  requiredVersion: dependencies["react-dom"],
                },
            },
        }),
        new HtmlWebPackPlugin({
            template: './public/index.html'
        })
      ]
}