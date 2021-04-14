
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");

const isDevelopment = process.env.NODE_ENV == "development";
const getFileNameByEnv = (ext = "[ext]", name = "[name]") => (isDevelopment ? `${name}.${ext}` : `${name}.[contenthash].${ext}`);

module.exports = {
    mode: process.env.NODE_ENV || "development",
    context: path.resolve(__dirname, "src"),
    entry: {
        main: path.resolve(__dirname, "src/index.js"),
    },
    output: {
        filename: getFileNameByEnv("js"),
        path: path.resolve(__dirname, "build"),
        publicPath: "/"
    },
    optimization: isDevelopment ? {} : {
        minimize: true,
        minimizer: [new OptimizeCssAssetsWebpackPlugin()]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
            filename: "index.html",
            inject: true,
            minify: {
                collapseWhitespace: !isDevelopment,
                removeComments: !isDevelopment,
                removeAttributeQuotes: !isDevelopment
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${getFileNameByEnv("css")}`,
            chunkFilename: getFileNameByEnv("css", "[id]")
        }),
        isDevelopment ? () => ({}) : new ImageMinimizerWebpackPlugin({
            minimizerOptions: {
                plugins: [
                    ["gifsicle", { interlaced: true}],
                    ["jpegtran", {progressive: true}],
                    ["optipng", {optimizationLevel: 5}],
                    [
                        "svgo",
                        {
                            plugins: [
                                {
                                    removeViewBox: false
                                }
                            ]
                        }
                    ]
                ]
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/, /\.module\.css$/],
                use: [
                    isDevelopment ? "style-loader" : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, "build/css"),
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment
                        }
                    }]
            },
            {
                test: /\.module\.css$/,
                exclude: [/node_modules/],
                use: [
                    isDevelopment ? "style-loader" : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, "build/css"),
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment,
                            modules: true
                        }
                    }]
            },
            {
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: `./img/${getFileNameByEnv()}`
                    }
                }]
            },
            {
                test: /\.(?:|woff2)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: `./fonts/${getFileNameByEnv()}`
                    }
                }]
            }
        ]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".jsx"],
        alias: {
            "@app": path.resolve(__dirname, 'src/'),
            "@components": path.resolve(__dirname, 'src/components/'),
            "@assets": path.resolve(__dirname, 'src/assets/')
        }
    },
    devServer: {
        open: true,
        hot: true,
        port: 3000,
        contentBase: path.resolve(__dirname, "build"),
        historyApiFallback: true,
        compress: true
    },
    devtool: !isDevelopment ? false : "source-map",
    stats: "errors-only"
};