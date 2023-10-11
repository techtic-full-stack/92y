import { ApolloClient } from '@apollo/client';
import { GET_COURSE_SLUGS_BY_TOPIC_SLUG, GetCourseSlugsByTopicSlug } from '@queries/courses';
import { Educator, GET_EDUCATORS_LIST } from '@queries/educators';
import { GetServerSideProps } from 'next';
import { getServerSideSitemap, getServerSideSitemapIndex } from 'next-sitemap';
import newApollo from '../../lib/newApollo';
import { initApollo } from '../../lib/withApollo';

const { SITE_URL = 'https://roundtable.org' } = process.env;

const getCourseFields = async (client: ApolloClient<any>, slug: string) => {
    const { data } = await client.query<GetCourseSlugsByTopicSlug>({
        query: GET_COURSE_SLUGS_BY_TOPIC_SLUG,
        variables: {
            slug,
        },
    });

    if (!data) {
        return [];
    }
    return data.courses.map((c) => ({
        loc: `${SITE_URL}/class/course/${c.slug}`,
        lastmod: c.updatedAt,
    }));
};

const getEducatorFields = async (client: ApolloClient<any>) => {
    const { data } = await client.query<{ educators: Educator[] }>({
        query: GET_EDUCATORS_LIST,
    });

    if (!data) {
        return [];
    }
    return data.educators.map((e) => ({
        loc: `${SITE_URL}/educator/${e.slug}`,
    }));
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const slug = (ctx.params?.slug as string).replace('.xml', '');

    const client = initApollo(newApollo);

    const fields = await (slug === 'educators' ? getEducatorFields(client) : getCourseFields(client, slug));

    if (!fields.length) {
        return getServerSideSitemapIndex(ctx, []);
    }

    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')

    return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
