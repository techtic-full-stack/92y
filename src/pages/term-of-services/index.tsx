import LayoutWrapper from '@components/Layout/LayoutWrapper';
import TermOfService from '@components/TermsOfService';
import type { NextPage } from 'next';
import theme from 'theme';
import CatalogueBanner from '@components/Banner/CatalogueBanner';
import withApollo from '../../lib/withApollo';

const TermOfServices: NextPage = () => {
    const title = `Terms of Service`;
    const description = `Terms of Service`;
    return (
        <LayoutWrapper title={title} description={description} navbarColor={theme.literature.primary} button="Join Us">
            <CatalogueBanner heading={title} bgcolor={theme.literature.primary} />
            <TermOfService />
        </LayoutWrapper>
    );
};

export default withApollo(TermOfServices);
