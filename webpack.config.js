let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = (env) => {
    // console.log('env', env)
    let isProduction = env === 'production';
    let CSSExtract = new ExtractTextPlugin('styles.css');
    return {
        entry: './src/App.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js',
            publicPath: '/'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract ({
                    use: [
                        {
                            loader: 'css-loader?url=false',
                            options: {
                                sourceMap: true,
                                modules: true,
                                camelCase: true,
                                localIdentName: '[name]__[path]__[local]--[hash:base64:5]',
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                                camelCase: true,
                                localIdentName: '[name]__[path]__[local]--[hash:base64:5]',
                                minimize: true
                            }
                        }
                    ]
                })
            }, {
                test: /\.less$/,
                use: [
                {
                    loader: "style-loader"
                },
                {
                    loader: "css-loader?url=false",
                    options: {
                        sourceMap: true,
                        modules: true,
                        camelCase: true,
                        localIdentName: '[name]__[path]__[local]--[hash:base64:5]',
                        minimize: true
                    }
                },
                {
                    loader: "less-loader"
                }
                ]
            }, {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    use: [
                    {
                        loader: 'url-loader',
                        query: { 
                            limit : 100000000000
                        }
                    }
                ]
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
}

// console.log(path.join(__dirname, 'public'));