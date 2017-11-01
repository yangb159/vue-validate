/**
 * Created by yangbing on 2017/11/1.
 */
const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
module.exports = {
    entry:{
        index:[
            "webpack-dev-server/client?http://127.0.0.1:8080/",
            "webpack/hot/only-dev-server",
            './example/index.js'
        ]
    },
    output: {
        publicPath: "/_example/",
        path: path.resolve(__dirname, '../_example'),
        filename: '[name].js'
    },
    devtool:'inline-source-map',
    devServer: {
        contentBase:path.resolve(__dirname,'../'),
        hot:true,
        historyApiFallback:true,
        publicPath:'/_example/',
        noInfo:false,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, "../node_modules")
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    },
    resolve: {
        alias:{
            'vue-validate':path.resolve(__dirname, '../src/index.esm.js'),
            'vue$':'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new htmlPlugin({
            template:path.resolve(__dirname,'../example/index.html'),
            inject:true,
            filename:'../_example/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}