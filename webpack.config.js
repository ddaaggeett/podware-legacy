const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = {
    watch: true,
    target: 'electron-renderer',
    entry: './src/renderer.js',
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                })
            },
            { 
                test: /\.(png|jpg)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css',
            disable: false,
            allChunks: true
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
}
