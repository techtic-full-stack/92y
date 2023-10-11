import { useQuery } from '@apollo/client';
import CatalogueBanner from '@components/Banner/CatalogueBanner';
import EducatorDirectory from '@components/EducatorDirectory';
import LayoutWrapper from '@components/Layout/LayoutWrapper';
import { GET_ALL_TOPICS, GetAllTopicsResponse, Topic } from '@queries/topics';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import theme from 'theme';
import withApollo from '../../lib/withApollo';

const ExpertAndArtist: NextPage = () => {
    const router = useRouter();
    const { filter } = router.query;
    const title = `Meet Our World-Renowned Thinkers and Creators`;
    const description = `Our live, in-the-moment courses give you a place at the table with some of the most respected and passionate experts and artists of our time.`;
    const buttonText = `Join Us`;
    const [navbarColor, setNavbarColor] = useState(theme.navy.primary);
    const [topicsData, setTopicsData] = useState<Topic[]>([]);
    const [end, setEnd] = useState(false);
    const [topicId, setTopicId] = useState<string | number | undefined>();
    const [page, setPage] = useState(1);

    useQuery<GetAllTopicsResponse>(GET_ALL_TOPICS, {
        onCompleted: ({ topics }) => {
            if (topics) {
                const topic = topics.find((topicItem) => topicItem.slug === filter);
                if (topic) {
                    setNavbarColor(topic.primaryColor);
                }
                setTopicsData(topics);
            }
        },
    });

    useEffect(() => {
        if (!router.isReady || !topicsData.length) {
            return;
        }

        if (filter !== undefined) {
            setEnd(false);
            setPage(1);
            const filterTopic = topicsData.find((topic) => topic.slug === filter);
            if (filterTopic) {
                setNavbarColor(filterTopic.primaryColor);
                setTopicId(filterTopic.id);
            } else {
                setNavbarColor(theme.navy.primary);
                setTopicId('all');
            }
        } else {
            setTopicId('all');
        }
    }, [filter, topicsData, router]);

    return (
        <>
            {topicsData !== undefined && (
                <LayoutWrapper title={title} description={description} navbarColor={navbarColor} button={buttonText}>
                    <CatalogueBanner
                        bgcolor={navbarColor}
                        dataTopic={topicsData}
                        path="/experts-and-artists"
                        heading={title}
                    >
                        {description}
                    </CatalogueBanner>
                    {!!topicId && (
                        <EducatorDirectory topicId={topicId} end={end} setEnd={setEnd} page={page} setPage={setPage} />
                    )}
                </LayoutWrapper>
            )}
        </>
    );
};

export default withApollo(ExpertAndArtist);
