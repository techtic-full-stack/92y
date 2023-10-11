import { useQuery } from '@apollo/client';
import Collections from '@components/Collections';
import LayoutWrapper from '@components/Layout/LayoutWrapper';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import withApollo from '../../lib/withApollo';
import { Course, GET_COURSES_BY_FILTER, GetCoursesByFilterResponse } from '@queries/courses';
import { GET_COLLECTION_COURSES_BY_SLUG, GET_COLLECTION_BY_SLUG, CollectionType } from '@queries/collection';

const Collection: NextPage = () => {
    const router = useRouter();
    const slug = router.query.slug;
    const title = `Collections`;
    const buttonText = `Join Us`;
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    const [loading, setLoading] = useState(true);
    const [coursesData, setcoursesData] = useState<Course[]>([]);
    useQuery<GetCoursesByFilterResponse>(GET_COURSES_BY_FILTER, {
        variables: { limit: 4 },
        onCompleted: ({ courses }) => {
            if (courses) {
                setcoursesData(courses);
                setLoading(false);
            }
        },
    });

    const { data: collectionCourses, refetch } = useQuery<GetCoursesByFilterResponse>(GET_COLLECTION_COURSES_BY_SLUG, {
        variables: { slug },
    });

    const { data: collection } = useQuery<CollectionType>(GET_COLLECTION_BY_SLUG, {
        variables: { slug },
    });
    useEffect(() => {
        if (accessToken) {
            refetch();
        }
    }, [accessToken, refetch]);

    return (
        <>
            {slug !== undefined && (
                <LayoutWrapper
                    title={title}
                    description="Diane Arbus, Cindy Sherman, and Francesca Woodman: Innovations in 20th Century Photography"
                    navbarColor={collection?.collection.topic.primaryColor}
                    button={buttonText}
                >
                    <Collections
                        courses={coursesData}
                        collectionCourses={collectionCourses?.courses || []}
                        collection={collection}
                        loading={loading}
                    />
                </LayoutWrapper>
            )}
        </>
    );
};

export default withApollo(Collection);
