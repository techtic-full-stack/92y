/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@components/Button';
import { GlobalContainerStyle } from '@components/Global/style';
import LiveClasses from '@components/LiveClasses';
import PopularClasses from '@components/PopularClasses';
import { GetHomeDataResponse } from '@queries/home';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { FC, useMemo } from 'react';
import theme from '../../theme';
import DistinguishEducator from './DistinguishEducator';
import { getCourseDateDisplay } from '../utils';
import {
    ApplyBannerFeatureBody,
    ApplyBannerFeatureTitle,
    ApplyBannerMonthTitle,
    ApplyBannerStyle,
    EducatorContainer,
    EducatorHeading,
    EducatorsStyle,
} from './style';
import TeachWithUs from './TeachWithUs';
import ApplyImage from 'public/Home/applyImage.svg';

type LearnerHomePageProps = {
    loading: boolean;
    homeData?: GetHomeDataResponse;
};

const LearnerHomePage: FC<LearnerHomePageProps> = ({ loading, homeData }) => {
    const collection = homeData?.collection;
    const collectionCourses = useMemo(() => collection?.courses.map(({ course }) => course) || [], [collection]);
    const totalCollectionCourses = homeData?.collection?.courses?.length || 0;
    const collectionDate: string[] = [];
    collectionCourses.map((course) => {
        return collectionDate.push(course.startDate, course.endDate);
    });
    const sortedDate = collectionDate.sort();
    const startDate = sortedDate[0];
    const endDate = sortedDate[sortedDate.length - 1];
    const CollectionDateDisplay = getCourseDateDisplay(startDate, endDate);
    return (
        <>
            <LiveClasses liveClassData={homeData?.courses || []} loading={loading} />
            <EducatorsStyle>
                <GlobalContainerStyle>
                    <EducatorContainer>
                        <EducatorHeading>Featured Experts and Artists</EducatorHeading>
                        <DistinguishEducator loading={loading} educatorsData={homeData?.educators || []} />
                    </EducatorContainer>
                </GlobalContainerStyle>
            </EducatorsStyle>
            <TeachWithUs heading={`Constantly curious?\nBe a subscriber.`} ApplyImage={ApplyImage}>
                Fill your mind with everything from Dylan to DaVinci with unlimited access to all our courses.
            </TeachWithUs>
            <ApplyBannerStyle className="monthFeature">
                <GlobalContainerStyle>
                    <Row className="feature-collection-row">
                        <Col>
                            <ApplyBannerMonthTitle>
                                <strong>This Month's Featured Collection</strong> • {CollectionDateDisplay} • {''}
                                {totalCollectionCourses} Courses
                            </ApplyBannerMonthTitle>
                            <ApplyBannerFeatureTitle>{collection?.name}</ApplyBannerFeatureTitle>
                            <ApplyBannerFeatureBody>{collection?.headline}</ApplyBannerFeatureBody>
                            {collectionCourses.length === 0 ? (
                                <Button bgcolor={theme.orange.secondary} color="#000000" lg disabled>
                                    Explore Collection
                                </Button>
                            ) : (
                                <Link href={`/collection/${collection?.slug}`} passHref>
                                    <a>
                                        <Button bgcolor={theme.orange.secondary} color="#000000" lg>
                                            Explore Collection
                                        </Button>
                                    </a>
                                </Link>
                            )}
                        </Col>
                    </Row>
                    <Row gutter={[26, 48]} className="feature-collection-list-row">
                        <PopularClasses coursesData={collectionCourses} loading={loading} />
                    </Row>
                </GlobalContainerStyle>
            </ApplyBannerStyle>
        </>
    );
};

export default LearnerHomePage;
