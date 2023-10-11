/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/client';
import Button from '@components/Button';
import { GlobalContainerStyle } from '@components/Global/style';
import DistinguishEducator from '@components/Home/DistinguishEducator';
import {
    ApplyBannerFeatureBody,
    ApplyBannerFeatureTitle,
    ApplyBannerMonthTitle,
    EducatorClassesStyled,
    EducatorContainer,
    EducatorHeading,
    EducatorsStyle,
} from '@components/Home/style';
import HtmlContent from '@components/HtmlContent';
import PopularClasses from '@components/PopularClasses';
import PromoBanner from '@components/PromoBanner';
import { Course, GET_PICKED_FOR_YOU_DATA } from '@queries/courses';
import { Educator } from '@queries/educators';
import { Topic } from '@queries/topics';
import { CountAggregate } from '@queries/types';
import { Col, Row, Typography } from 'antd';
import Link from 'next/link';
import { FC, useMemo, useEffect } from 'react';
import theme from '../../theme';
import { getCourseDateDisplay } from '../utils';
import { ClassStyle, FeatureCollectionContainer, RegisterClassStyled } from './style';
import UpcomingClassCard from './UpcomingClassCard';
import Skeleton from 'react-loading-skeleton';
import { LiveClassRow } from '@components/LiveClasses/style';

const { Title } = Typography;

interface PickedForYouResults {
    courses: Course[];
    course: Course;
    educators: Educator[];
    collection: {
        name: string;
        headline: string;
        slug: string;
        image: {
            url: string;
        };
        topic: Topic;
        totalCourses: CountAggregate;
        courses: Course[];
    };
}

type CatalogueHomeProps = {
    recentlyAddedClasses: Course[];
    recentlyAddedLoading?: boolean;
};

const CatalogueHome: FC<CatalogueHomeProps> = ({ recentlyAddedClasses, recentlyAddedLoading }) => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    const { data, loading, refetch } = useQuery<PickedForYouResults>(GET_PICKED_FOR_YOU_DATA, {
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        if (accessToken) {
            refetch();
        }
    }, [accessToken, refetch]);
    const collection = data?.collection;
    const collectionCourses = useMemo(() => collection?.courses.map(({ course }) => course) || [], [collection]);
    const totalCollectionCourses = collection?.totalCourses.aggregate.count || 0;
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
            <PromoBanner />
            <ClassStyle className="pb-0">
                <GlobalContainerStyle>
                    <EducatorClassesStyled>
                        <div className="title">
                            <Title>New Courses Now Available</Title>
                        </div>
                        <div className="cards">
                            <LiveClassRow gutter={[26, 48]}>
                                <PopularClasses
                                    coursesData={recentlyAddedClasses}
                                    loading={recentlyAddedLoading}
                                    className="carousel-col"
                                />
                            </LiveClassRow>
                        </div>
                    </EducatorClassesStyled>
                </GlobalContainerStyle>
            </ClassStyle>
            {data?.course && (
                <RegisterClassStyled>
                    <GlobalContainerStyle>
                        <UpcomingClassCard
                            btnColor={theme.literature.secondary}
                            imgHeight={400}
                            imgWidth={400}
                            course={data.course}
                            loading={loading}
                        >
                            <HtmlContent content={data.course.overview} />
                        </UpcomingClassCard>
                    </GlobalContainerStyle>
                </RegisterClassStyled>
            )}
            <ClassStyle className="pb-0">
                <GlobalContainerStyle>
                    <EducatorClassesStyled>
                        <div className="title">
                            <Title>Our Curator Picks</Title>
                        </div>
                        <div className="cards">
                            <Row gutter={[26, 48]}>
                                <PopularClasses coursesData={data?.courses || []} loading={loading} />
                            </Row>
                        </div>
                    </EducatorClassesStyled>
                </GlobalContainerStyle>
            </ClassStyle>
            <EducatorsStyle>
                <GlobalContainerStyle>
                    <EducatorContainer>
                        <EducatorHeading>Popular Experts and Artists</EducatorHeading>
                        <DistinguishEducator educatorsData={data?.educators || []} loading={loading} />
                    </EducatorContainer>
                </GlobalContainerStyle>
            </EducatorsStyle>
            <ClassStyle className="monthFeature">
                <GlobalContainerStyle>
                    <FeatureCollectionContainer>
                        <Row className="feature-collection-row">
                            {loading ? (
                                <Col lg={24}>
                                    <Skeleton height={18} width={128} />
                                    <Col sm={24} lg={6} md={24} xs={24}>
                                        <Skeleton height={28} />
                                    </Col>

                                    <Col lg={12} md={24} sm={24} xs={12}>
                                        <Skeleton height={58} />
                                    </Col>
                                    <Skeleton width={211} height={48} borderRadius={24} />
                                </Col>
                            ) : (
                                <Col>
                                    <ApplyBannerMonthTitle>
                                        <strong>This Month's Featured Collection</strong> • {CollectionDateDisplay} •{' '}
                                        {''}
                                        {totalCollectionCourses} Courses
                                    </ApplyBannerMonthTitle>
                                    <ApplyBannerFeatureTitle>{collection?.name}</ApplyBannerFeatureTitle>
                                    <ApplyBannerFeatureBody>{collection?.headline}</ApplyBannerFeatureBody>
                                    {collectionCourses.length === 0 ? (
                                        <Button bgcolor={theme.orange.secondary} color="#000000" lg disabled>
                                            Explore Collection
                                        </Button>
                                    ) : (
                                        <Link
                                            href={
                                                collectionCourses.length === 0 ? '' : `/collection/${collection?.slug}`
                                            }
                                            passHref
                                        >
                                            <a>
                                                <Button
                                                    bgcolor={theme.orange.secondary}
                                                    color="#000000"
                                                    lg
                                                    disabled={collectionCourses.length === 0}
                                                >
                                                    Explore Collection
                                                </Button>
                                            </a>
                                        </Link>
                                    )}
                                </Col>
                            )}
                        </Row>
                        <Row gutter={[26, 48]} className="feature-collection-list-row">
                            <PopularClasses coursesData={collectionCourses} loading={loading} />
                        </Row>
                    </FeatureCollectionContainer>
                </GlobalContainerStyle>
            </ClassStyle>
        </>
    );
};

export default CatalogueHome;
