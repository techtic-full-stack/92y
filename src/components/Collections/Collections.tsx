import CollectionBanner from '@components/Banner/CollectionBanner';
import { ClassStyle } from '@components/ClassCatalogue/style';
import UpcomingClassCard from '@components/ClassCatalogue/UpcomingClassCard';
import { EducatorDetailStyled } from '@components/EducatorDetails/style';
import { GlobalContainerStyle } from '@components/Global/style';
import { EducatorClassesStyled } from '@components/Home/style';
import PopularClasses from '@components/PopularClasses';
import { CollectionType } from '@queries/collection';
import { Course } from '@queries/courses';
import { Row, Typography } from 'antd';
import { FC } from 'react';

const { Title } = Typography;

type CollectionsProps = {
    courses: Course[];
    loading: boolean;
    collectionCourses?: Course[];
    collection?: CollectionType;
};

const Collections: FC<CollectionsProps> = ({ courses, loading, collectionCourses, collection }) => {
    const totalCollectionCourses = collectionCourses?.length || 0;

    return (
        <>
            {collection && (
                <CollectionBanner
                    heading={collection?.collection?.name}
                    parts={totalCollectionCourses}
                    bgcolor={collection?.collection.topic?.primaryColor}
                    bannerImg={collection?.collection.image?.url}
                    shapeColor={collection?.collection.topic?.secondaryColor}
                >
                    {collection?.collection.headline}
                </CollectionBanner>
            )}

            <EducatorDetailStyled>
                <GlobalContainerStyle>
                    {collectionCourses?.map((course) => {
                        return (
                            course.course !== null && (
                                <UpcomingClassCard
                                    key={course.course?.id}
                                    btnColor={course.course?.topic?.secondaryColor}
                                    imgHeight={400}
                                    imgWidth={400}
                                    course={course.course}
                                    loading={loading}
                                >
                                    {course.course?.headline}
                                </UpcomingClassCard>
                            )
                        );
                    })}
                </GlobalContainerStyle>
            </EducatorDetailStyled>
            <ClassStyle>
                <GlobalContainerStyle>
                    <EducatorClassesStyled>
                        <div className="title">
                            <Title>Latest Classes</Title>
                        </div>
                        <div className="cards">
                            <Row gutter={[24, 48]}>
                                <PopularClasses coursesData={courses} loading={loading} />
                            </Row>
                        </div>
                    </EducatorClassesStyled>
                </GlobalContainerStyle>
            </ClassStyle>
        </>
    );
};

export default Collections;
