const path = require('path');                                   
const HTMLWebpackPlugin = require('html-webpack-plugin');       
const {CleanWebpackPlugin} = require('clean-webpack-plugin')  

module.exports = {
    mode: "development",                              
    entry: [ "@babel/polyfill", "./src/index.jsx"],              
    output: {                                         
        path: path.resolve(__dirname, "public"),
        filename: "[name].[hash].js",                
        publicPath: './'
    },
    devServer: {
        port: 3000,
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HTMLWebpackPlugin({template: './src/index.html'}),
        new CleanWebpackPlugin()                                       
    ],
    module: {
        rules: [
            {
                test: /\.(css|less)$/,                                  
                use: ['style-loader', 'css-loader', 'less-loader']      
            },
            {
                test: /\.(jpg|jpeg|png|svg)/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,                       
                exclude: /node_modules/,             
                use: {                               
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                    },
                },
            },
        ]
    }

}