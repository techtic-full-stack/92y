import { GET_ALL_TOPICS, GetAllTopicsResponse } from '@queries/topics';
import { GetServerSideProps } from 'next';
import { getServerSideSitemapIndex } from 'next-sitemap';
import newApollo from '../../lib/newApollo';
import { initApollo } from '../../lib/withApollo';

const { SITE_URL = 'https://roundtable.org' } = process.env;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const client = initApollo(newApollo);

    const { data } = await client.query<GetAllTopicsResponse>({
        query: GET_ALL_TOPICS,
    });

    if (!data) {
        return getServerSideSitemapIndex(ctx, []);
    }

    const links = data.topics.map((topic) => `${SITE_URL}/sitemaps/${topic.slug}.xml`);
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')

    return getServerSideSitemapIndex(ctx, links);
};

// Default export to prevent next.js errors
export default function SitemapsIndex() {}
