const path = require('path'); //для того чтобы превратить относительный путь в абсолютный, мы будем использовать пакет path
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: {
            index: '/index.html',
            disableDotRule: true,
            rewrites: [
                { from: /^\/.*/, to: '/index.html' },
            ],
        },
        static: {
            directory: path.resolve(__dirname, '..', 'public'),
        },
        // compress: true, // это ускорит загрузку в режиме разработки
        port: 8081, // порт выбран свободным, чтобы не конфликтовать с уже запущенными локальными сервисами
        open: true, // сайт будет открываться сам при запуске npm run dev
        hot: true,
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
    ]
}