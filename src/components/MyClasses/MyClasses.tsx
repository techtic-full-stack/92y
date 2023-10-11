import { FC } from 'react';
import { GlobalContainerStyle } from '@components/Global/style';
import { MyClassesStyled, NoClasses } from './style';
import ClassesCard from './ClassesCard';
import { useQuery } from '@apollo/client';
import { GET_USER_UPCOMING_CLASSES, GetUserClassessResponse, GET_USER_PAST_CLASSES } from '@queries/myclasses';
import { getCourseTimeDisplayComponents, getShapeType } from '../utils';

const MyClasses: FC = () => {
    const { data: upcomingClasses, loading: upcomingLoading } = useQuery<GetUserClassessResponse>(
        GET_USER_UPCOMING_CLASSES,
        {
            fetchPolicy: 'network-only',
        },
    );
    const { data: pastClasses, loading: pastLoading } = useQuery<GetUserClassessResponse>(GET_USER_PAST_CLASSES, {
        fetchPolicy: 'network-only',
    });
    return (
        <MyClassesStyled>
            <GlobalContainerStyle>
                <div className="main-heading">My Upcoming Courses</div>
                {upcomingLoading ? (
                    ''
                ) : upcomingClasses && upcomingClasses.classes.length > 0 ? (
                    upcomingClasses.classes.map((item) => {
                        const { timeDisplay, dateDisplay } = getCourseTimeDisplayComponents(item.session.course);
                        return (
                            <ClassesCard
                                key={item.id}
                                id={item.enrollmentId}
                                status={item.session.course.completedSession.aggregate.count}
                                registrationImage={item.session.course.image.url}
                                classTime={timeDisplay}
                                classDate={dateDisplay}
                                title={item.session.course.name}
                                btnColor={item.session.course.topic.secondaryColor}
                                imgHeight={300}
                                imgWidth={300}
                                shapes={getShapeType(item.session.course.sessions.length)}
                                link={item.session.meetingLink}
                                linkText="Zoom Link"
                                classDetailButton={true}
                                totalSessions={item.session.course.totalSessions.aggregate.count}
                            />
                        );
                    })
                ) : (
                    <NoClasses>You have no upcoming courses.</NoClasses>
                )}
                <div className="main-heading">My Past Classes</div>
                {pastLoading ? (
                    ''
                ) : pastClasses && pastClasses.classes.length > 0 ? (
                    pastClasses.classes.map((item) => {
                        const { timeDisplay, dateDisplay } = getCourseTimeDisplayComponents(item.session.course);
                        return (
                            <ClassesCard
                                key={item.id}
                                id={item.enrollmentId}
                                status={item.session.course.completedSession.aggregate.count}
                                registrationImage={item.session.course.image.url}
                                classTime={timeDisplay}
                                classDate={dateDisplay}
                                title={item.session.course.name}
                                btnColor={item.session.course.topic.secondaryColor}
                                imgHeight={300}
                                imgWidth={300}
                                shapes={getShapeType(item.session.course.sessions.length)}
                                classDetailButton={true}
                                totalSessions={item.session.course.totalSessions.aggregate.count}
                            />
                        );
                    })
                ) : (
                    <NoClasses>You have no past classes.</NoClasses>
                )}
            </GlobalContainerStyle>
        </MyClassesStyled>
    );
};

export default MyClasses;
