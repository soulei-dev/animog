const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: path.join(__dirname, "src/index.js")
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules)/,
                use: ["babel-loader"]
            }, 
            {
                test: /\.scss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./src/index.html")
        })
    ],
    stats: "minimal",
    devtool: "source-map",
    mode: "development",
    devServer: {
        open: false,
        contentBase: "./dist",
        inline: true,
        port: 4000
    }
};