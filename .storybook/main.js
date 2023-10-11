const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    webpackFinal: async (config, { configType }) => {
        config.module.rules.push({
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } },
            ],
            include: path.resolve(__dirname, '../'),
        });

        return config;
    },
    staticDirs: ['../src/public'],
    core: {
        builder: 'webpack5',
    },
};
