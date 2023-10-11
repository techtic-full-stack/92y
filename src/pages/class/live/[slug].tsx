import { useQuery } from '@apollo/client';
import ClassDetail from '@components/ClassDetails/ClassDetail';
import LayoutWrapper from '@components/Layout/LayoutWrapper';
import { GET_MORE_CLASSES, GetCoursesByFilterResponse } from '@queries/courses';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import withApollo from '../../../lib/withApollo';
import theme from '../../../theme';

const LiveCourseDetails: NextPage = () => {
    const router = useRouter();
    const slug = router.query.slug;
    const title = `Live classes`;
    const description = `Live classes of ${slug}`;
    const buttonText = `Join Us`;
    const [navColor, setNavColor] = useState<string>(theme.navy.primary);
    const [courseId, setCourseId] = useState();
    const { data, loading } = useQuery<GetCoursesByFilterResponse>(GET_MORE_CLASSES, {
        variables: { courseId },
    });

    return (
        <LayoutWrapper title={title} description={description} navbarColor={navColor} button={buttonText}>
            <ClassDetail
                onNavColorChanged={setNavColor}
                coursesData={data?.courses || []}
                loadingCourse={loading}
                onTopicChanged={setCourseId}
            />
        </LayoutWrapper>
    );
};

export default withApollo(LiveCourseDetails);
