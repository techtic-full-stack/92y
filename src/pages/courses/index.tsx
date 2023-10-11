import { useQuery } from '@apollo/client';
import CatalogueBanner from '@components/Banner/CatalogueBanner';
import CatalogueHome from '@components/ClassCatalogue/CatalogueHome';
import Class, { ClassFetchFilters } from '@components/ClassCatalogue/Class';
import LayoutWrapper from '@components/Layout/LayoutWrapper';
import {
    GET_CLASS_CATALOGUE_FILTER_DATA,
    GET_LATEST_CLASSES,
    GetClassCatalogueFilterDataResponse,
    RecentlyAddedCourses,
} from '@queries/courses';
import { Topic } from '@queries/topics';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import withApollo from '../../lib/withApollo';
import theme from '../../theme';

const Catalog: NextPage = () => {
    const router = useRouter();
    const { filter } = router.query;
    const title = `Explore Our Classes`;
    const description = `Join us for live discussions on diverse topics that will spark your curiosity.`;
    const buttonText = `Join Us`;
    const [navbarColor, setNavbarColor] = useState(theme.navy.primary);
    const [topicId, setTopicId] = useState<string[]>();
    const [topicList, setTopicList] = useState<Topic[]>([]);
    const [educatorList, setEducatorList] = useState([
        {
            id: '',
            name: '',
        },
    ]);

    const [fetchFilters, setFetchFilters] = useState<ClassFetchFilters | undefined>();
    useQuery<GetClassCatalogueFilterDataResponse>(GET_CLASS_CATALOGUE_FILTER_DATA, {
        onCompleted: ({ educators, topics }) => {
            setTopicList(topics);

            const allEducators = educators.map((list) => {
                return {
                    id: list.id,
                    name: list.fullName,
                };
            });

            setEducatorList([
                {
                    id: 'all',
                    name: 'All',
                },
                ...allEducators,
            ]);
        },
    });

    useEffect(() => {
        const topic = topicList.find((t) => t.slug === filter);
        setNavbarColor(topic?.primaryColor || theme.yellow.primary);
        const updatedTopicId = topic ? [topic.id] : topicList.map((t) => t.id);
        setTopicId(updatedTopicId);
        if (router.asPath === '/courses') {
            setNavbarColor(theme.navy.primary);
            setFetchFilters(undefined);
        } else {
            setFetchFilters((old) => ({ ...old, topicId: updatedTopicId } as any));
        }
    }, [router, topicList, filter, setNavbarColor, setFetchFilters]);

    const { data: recentlyAddedClasses, loading: recentlyAddedLoading } = useQuery<RecentlyAddedCourses>(
        GET_LATEST_CLASSES,
        {
            variables: {
                ...fetchFilters,
                filteredByDate: !!fetchFilters?.endDate || !!fetchFilters?.startDate,
            },
        },
    );

    return (
        <>
            {topicList && (
                <LayoutWrapper title={title} description={description} navbarColor={navbarColor} button={buttonText}>
                    <CatalogueBanner
                        bgcolor={navbarColor}
                        dataTopic={topicList}
                        path="/courses"
                        heading="Pull Up a Chair"
                    >
                        {description}
                    </CatalogueBanner>
                    {filter ? (
                        <Class
                            topicId={topicId}
                            onFiltersChanged={setFetchFilters}
                            educatorList={educatorList}
                            recentlyAddedClasses={recentlyAddedClasses?.courses || []}
                            recentlyAddedLoading={recentlyAddedLoading}
                        />
                    ) : (
                        <CatalogueHome
                            recentlyAddedClasses={recentlyAddedClasses?.courses || []}
                            recentlyAddedLoading={recentlyAddedLoading}
                        />
                    )}
                </LayoutWrapper>
            )}
        </>
    );
};

export default withApollo(Catalog);
