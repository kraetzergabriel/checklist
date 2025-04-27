const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/index.js', // Entry point for the application
    output: {
        filename: 'js/index.js', // Output bundle file name
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    module: {
        rules: [
            {
                test: /\.(?:js)$/, // Apply the rule to JavaScript files
                exclude: /node_modules/, // Exclude node_modules directory
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/, // Apply the rule to CSS files
                use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for handling CSS
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Template HTML file
            filename: 'index.html' // Output HTML file
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'static', to: 'static'} // Copy static assets to the output directory
            ],
        }),
    ],
    mode: "production",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // Serve content from the dist directory
        compress: true, // Enable gzip compression
        port: 4041, // Port to run the development server
    },
};