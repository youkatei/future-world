const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');

const server = {
    entry: './src/server/server.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({ 'global.GENTLY': false }),
        new ESLintPlugin(),
        new RemovePlugin({
            before: {
                include: [
                    path.resolve(buildPath, 'server')
                ]
            },
            watch: {
                include: [
                    path.resolve(buildPath, 'server')
                ]
            }
        })
    ],
    optimization: {
        minimize: false,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[contenthash].server.js',
        path: path.resolve(buildPath, 'server')
    },
    target: 'node',
};

const client = {
    entry: './src/client/client.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new ESLintPlugin(),
        new RemovePlugin({
            before: {
                include: [
                    path.resolve(buildPath, 'client')
                ]
            },
            watch: {
                include: [
                    path.resolve(buildPath, 'client')
                ]
            }
        })
    ],
    optimization: {
        minimize: false,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[contenthash].client.js',
        path: path.resolve(buildPath, 'client'),
    },
};

module.exports = [server, client];
