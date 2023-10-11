/** @type {import('next-sitemap').IConfig} */
const fetch = require('cross-fetch');

const { SITE_URL = 'https://roundtable.org', GRAPHQL_ENDPOINT, ENVIRONMENT } = process.env;
module.exports = {
    siteUrl: SITE_URL,
    generateRobotsTxt: true,
    exclude: ['/sitemaps.xml', '/sitemaps*'], // <= exclude here
    additionalPaths: async (config) => {
        const { data } = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
         query GetTopics {
        topics(order_by: { order: asc }) {
            id
            name
            slug
            primaryColor
            secondaryColor
            shapeType
        }
    }
      `,
            }),
        }).then((res) => res.json());

        const urls = data?.topics.map((topic) => `${SITE_URL}/sitemaps/${topic.slug}.xml`);
        urls.push(`${SITE_URL}/sitemaps/educators.xml`);
        config.robotsTxtOptions.additionalSitemaps.push(...urls);
        return urls;
    },
    robotsTxtOptions: {
        policies: ENVIRONMENT !== 'prod' ? [{ userAgent: '*', disallow: '/' }] : [],
        additionalSitemaps: [],
    },
};
