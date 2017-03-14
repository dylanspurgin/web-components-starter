const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const sourcePath = path.join(__dirname, './src');
const buildPath = path.join(__dirname, './build');

// const nodeEnv = env && env.prod ? 'production' : 'development';
const nodeEnv = 'production';
const isProd = nodeEnv === 'production';


// let plugins = [
//     // new webpack.optimize.CommonsChunkPlugin({
//     //     name: 'vendor',
//     //     minChunks: Infinity,
//     //     filename: 'vendor.bundle.js'
//     // }),
//     // new webpack.EnvironmentPlugin({
//     //     NODE_ENV: nodeEnv,
//     // }),
//     // new webpack.NamedModulesPlugin()
//     new ExtractTextPlugin("[name].css")
// ];
//
// if (isProd) {
//     plugins.push(
//         new webpack.LoaderOptionsPlugin({
//             minimize: true,
//             debug: false
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false,
//                 screw_ie8: true,
//                 conditionals: true,
//                 unused: true,
//                 comparisons: true,
//                 sequences: true,
//                 dead_code: true,
//                 evaluate: true,
//                 if_return: true,
//                 join_vars: true,
//             },
//             output: {
//                 comments: false,
//             },
//         })
//     );
// }

module.exports = {
    devtool: isProd ? 'source-map' : 'eval',
    context: sourcePath,
    entry: {
        index: './index.js',
        webcomponents: ['webcomponents.js']
    },
    output: {
        path: buildPath,
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            // html webcomponent loader
            {
                test: /\.html$/,
                loaders: [
                    'webcomponents-loader?' + JSON.stringify({
                            babel: {
                                presets: [
                                    ['es2015', {modules: false, loose: true}]
                                ],
                                plugins: [
                                    'transform-custom-element-classes'
                                ],
                                compact: true
                            },
                            sass: {
                                presets: 'es2015',
                                compact: true
                            },
                            minify: {
                                removeAttributeQuotes: true,
                                minifyCSS: true,
                                minifyJS: true,
                                removeComments: true,
                                collapseWhitespace: true
                            }
                        }),
                ]
            },
            // {
            //     test: /\.html$/,
            //     loader: 'webcomponents-loader',
            //     query: {
            //         babel: {
            //             presets: 'latest',
            //             plugins: [
            //                 "transform-custom-element-classes"
            //             ],
            //             compact: true
            //         },
            //         sass: {
            //             presets: 'es2015',
            //             compact: true
            //         },
            //         minify: {
            //             removeAttributeQuotes: true,
            //             minifyCSS: true,
            //             minifyJS: true,
            //             removeComments: true,
            //             collapseWhitespace: true
            //         }
            //     }
            // },
            // es6 babel loader
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
            }, {
                test: /\.(gif|png|jpe?g|svg)$/i,
                exclude: /node_modules/,
                loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ],
    resolve: {
        // extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            sourcePath
        ]
    },
    performance: isProd && {
        maxAssetSize: 100,
        maxEntrypointSize: 300,
        hints: 'warning',
    },

    stats: {
        colors: {
            green: '\u001b[32m',
        }
    },

    devServer: {
        contentBase: sourcePath,
        port: 7272,
        hot: true,
        inline: true
    }

};
