/** @type {import('next').NextConfig} */
require('dotenv').config();

//https://www.npmjs.com/package/next-plugin-antd-less
const withAntdLess = require('next-plugin-antd-less');
const { withSentryConfig } = require('@sentry/nextjs');

const {
    GRAPHQL_ENDPOINT,
    AWS_REGION,
    COGNITO_USER_POOL_ID,
    COGNITO_CLIENT_ID,
    SENTRY_DSN,
    SENTRY_ENVIRONMENT,
    SENTRY_ORG,
    STRIPE_KEY,
    ENVIRONMENT,
    SITE_URL = 'https://localhost:3000',
} = process.env;

const config = {
    lessVarsFilePath: './styles/antd.less',
    lessVarsFilePathAppendToEndOfContent: false,
    cssLoaderOptions: {},
    webpack(config) {
        return config;
    },

    env: {
        GRAPHQL_ENDPOINT,
        AWS_REGION,
        COGNITO_USER_POOL_ID,
        COGNITO_CLIENT_ID,
        SENTRY_DSN,
        SENTRY_ENVIRONMENT,
        STRIPE_KEY,
        ENVIRONMENT,
        SITE_URL,
    },
    images: {
        domains: [
            'd2tfap7br9xo7n.cloudfront.net',
            'api.roundtable.org',
            'api-stage.roundtable.org',
            'api-dev.roundtable.org',
        ],
    },
};

/**
 *
 * @type {import('@sentry/nextjs/esm/config/types').SentryWebpackPluginOptions}
 */
const sentryWebpackPluginOptions = {
    org: SENTRY_ORG,

    // silent: true, // Suppresses all logs
};

module.exports = withAntdLess(config); // withSentryConfig(, sentryWebpackPluginOptions);
