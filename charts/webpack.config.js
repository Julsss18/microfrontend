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
        publicPath: "http://localhost:3002/"
      },
      plugins: [
        new ModuleFederationPlugin({
            name: "charts",
            filename: "remoteEntry.js",
            remotes: {
              store: 'store@http://localhost:3001/remoteEntry.js',
              interfaces: 'interfaces@http://localhost:3001/remoteEntry.js'
            },
            exposes: {
              "./ChartsCardContent":"./src/components/ChartsCardContent",
              "./ChartsCard":"./src/components/ChartsCard",
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