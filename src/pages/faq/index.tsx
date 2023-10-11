import LayoutWrapper from '@components/Layout/LayoutWrapper';
import Faq from '@components/Faq';
import type { NextPage } from 'next';
import theme from 'theme';
import CatalogueBanner from '@components/Banner/CatalogueBanner';
import withApollo from '../../lib/withApollo';

const Faqs: NextPage = () => {
    const title = `FAQ`;
    const description = `FAQ`;
    return (
        <LayoutWrapper title={title} description={description} navbarColor={theme.literature.primary} button="Join Us">
            <CatalogueBanner heading={title} bgcolor={theme.literature.primary} />
            <Faq />
        </LayoutWrapper>
    );
};

export default withApollo(Faqs);
