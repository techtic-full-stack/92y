import type { NextPage } from 'next';
import LayoutWrapper from '@components/Layout/LayoutWrapper';
import theme from 'theme';
import CatalogueBanner from '@components/Banner/CatalogueBanner';
import MyClasses from '@components/MyClasses/MyClasses';
import withAuth from 'lib/withAuth';
import withApollo from 'lib/withApollo';

const Mycourses: NextPage = () => {
    return (
        <LayoutWrapper title="My Courses" description="My Courses" navbarColor={theme.navy.primary}>
            <CatalogueBanner heading="My Courses" />
            <MyClasses />
        </LayoutWrapper>
    );
};

export default withAuth(withApollo(Mycourses));
