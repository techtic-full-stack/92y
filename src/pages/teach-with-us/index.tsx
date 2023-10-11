import { useQuery } from '@apollo/client';
import HomeBanner from '@components/Banner/HomeBanner';
import EducationHomePage from '@components/Home/EducatorHomePage';
import LayoutWrapper from '@components/Layout/LayoutWrapper';
import { GET_HOME_DATA, GetHomeDataResponse } from '@queries/home';
import type { NextPage } from 'next';
import theme from 'theme';
import bannerImg from 'public/Home/educatorBanner.svg';
import withApollo from '../../lib/withApollo';

const HomeEducator: NextPage = () => {
    const { data: homeData, loading } = useQuery<GetHomeDataResponse>(GET_HOME_DATA);
    const title = `Join a legacy of innovative educators`;
    const description = `Roundtable is proud to present a wide variety of impeccably curated subjects. Our courses are led by highly respected experts and artists who are passionate about their areas of interest. Enthusiastic participants are inspired to join the conversation. The result is live, in-the-moment discourse between curious minds and acclaimed thinkers — an experience that can’t be duplicated. `;
    return (
        <LayoutWrapper
            title={title}
            description={description}
            navbarColor={theme.maroon}
            button="Join Us"
            learner="For Learner"
        >
            <HomeBanner heading={title} bgcolor={theme.maroon} bannerImg={bannerImg}>
                {description}
            </HomeBanner>
            <EducationHomePage loading={loading} homeData={homeData} />
        </LayoutWrapper>
    );
};

export default withApollo(HomeEducator);
