import type { NextPage } from 'next';
import LayoutWrapper from '@components/Layout/LayoutWrapper';
import theme from 'theme';
import { useRouter } from 'next/router';
import Lectures from '@components/MyClasses/Lectures';
import { convertToString } from '@components/utils';
import withAuth from 'lib/withAuth';
import withApollo from 'lib/withApollo';

const Lecture: NextPage = () => {
    const router = useRouter();
    return (
        <LayoutWrapper
            title={`My Courses | ${convertToString(`${router.query.slug}`)}`}
            description={`My Courses | ${convertToString(`${router.query.slug}`)}`}
            navbarColor={theme.navy.primary}
        >
            <Lectures />
        </LayoutWrapper>
    );
};

export default withAuth(withApollo(Lecture));
