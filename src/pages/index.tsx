import { useQuery } from '@apollo/client';
import HomeBanner from '@components/Banner/HomeBanner';
import LearnerHomePage from '@components/Home/LearnerHomePage';
import LayoutWrapper from '@components/Layout/LayoutWrapper';
import { GET_HOME_DATA, GetHomeDataResponse } from '@queries/home';
import type { NextPage } from 'next';
import theme from 'theme';
import bannerImg from 'public/Home/learnerBanner.svg';
import withApollo from '../lib/withApollo';

const HomeLearner: NextPage = () => {
    const { data: homeData, loading } = useQuery<GetHomeDataResponse>(GET_HOME_DATA);

    return (
        <LayoutWrapper
            title="Home"
            description="Home Page for Learner"
            navbarColor={theme.navy.primary}
            button="Join Us"
        >
            <HomeBanner
                heading={`A Destination.\nAn Experience.`}
                buttonText="Explore courses"
                bgcolor={theme.navy.primary}
                bannerImg={bannerImg}
            >
                At Roundtable you’re part of the conversation. What questions do you want to ask? Our live,
                in-the-moment courses give you a place at the table with some of the most respected and passionate
                experts and artists of our time.
                <br />
                <br />
                Show up, pull up a chair — Roundtable by The 92nd Street Y, New York is the place to follow your
                curiosity.
            </HomeBanner>
            <LearnerHomePage loading={loading} homeData={homeData} />
        </LayoutWrapper>
    );
};

export default withApollo(HomeLearner);
