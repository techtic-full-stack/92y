import UpcomingClassCard from '@components/ClassCatalogue/UpcomingClassCard';
import EducatorCard from '@components/EducatorCards';
import { GlobalContainerStyle } from '@components/Global/style';
import HtmlContent from '@components/HtmlContent';
import { Educator } from '@queries/educators';
import { FC } from 'react';
import theme from '../../theme';
import AuthorDetail from './AuthorDetail';
import AuthorSummary from './AuthorSummary';
import { AuthorBanner, EducatorDetailStyled, NoData } from './style';

interface EducatorDetailsProps {
    educator?: Educator;
    loading: boolean;
}
const EducatorDetail: FC<EducatorDetailsProps> = ({ educator, loading }) => {
    const upperColor = educator
        ? educator.profile.topic?.primaryColor || theme.navy.primary
        : theme.background.offWhite;
    const upperBackground = educator?.profile.topic?.primaryColor || theme.navy.primary;
    return (
        <>
            <AuthorBanner>
                {loading || !educator ? (
                    ''
                ) : (
                    <EducatorCard
                        educator={educator}
                        color={educator.profile.topic?.secondaryColor}
                        upperBackground={upperBackground}
                        lowerBackground={educator.profile.topic?.primaryColor || theme.navy.primary}
                        background="transparent"
                        textcolor={theme.white}
                        banner={true}
                    >
                        <HtmlContent content={educator.profile?.bio} />
                    </EducatorCard>
                )}
            </AuthorBanner>
            <AuthorDetail
                lowerColor={theme.background.offWhite}
                upperColor={upperColor}
                awards={educator?.profile.awardsAndFeatures}
                educations={educator?.educations}
                books={educator?.books}
            />
            <EducatorDetailStyled>
                <GlobalContainerStyle>
                    {educator && (
                        <div className="main-heading">
                            {educator.fullName[educator.fullName.length - 1] === 's'
                                ? `${educator.fullName}’ Courses`
                                : `${educator.fullName}’s Courses`}
                        </div>
                    )}
                    {educator &&
                        educator.courses.length > 0 &&
                        educator.courses.map((course) => {
                            return (
                                <UpcomingClassCard
                                    key={course.id}
                                    btnColor={course.topic?.secondaryColor}
                                    imgHeight={400}
                                    imgWidth={400}
                                    course={course}
                                    loading={loading}
                                >
                                    <HtmlContent content={course.overview} />
                                </UpcomingClassCard>
                            );
                        })}
                    {educator && educator.courses.length < 1 && (
                        <NoData>No classes found for {educator.fullName}.</NoData>
                    )}
                </GlobalContainerStyle>
            </EducatorDetailStyled>
            {educator && (
                <AuthorSummary bgColor={educator.profile.topic?.primaryColor} testimonials={educator.testimonials} />
            )}
        </>
    );
};
export default EducatorDetail;
