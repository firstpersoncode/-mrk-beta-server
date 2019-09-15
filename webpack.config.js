const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'production',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        lib: path.resolve(process.cwd(), 'src'),
    },
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.mjs', '.json', '.jsx', '.ts', '.tsx', '.css'],
        modules: [
            path.resolve(process.cwd(), 'src'),
            path.resolve(process.cwd(), 'src/middleware'),
            'node_modules',
        ],
    },
    devtool: 'source-map',
    optimization: {
        minimize: true,
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx|mjs)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('awesome-typescript-loader'),
                        // options: {
                        //     presets: ['@babel/preset-env'],
                        // },
                    },
                ],
            },
        ],
    },
}
