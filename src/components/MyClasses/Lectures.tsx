import HtmlContent from '@components/HtmlContent';
import { FC, useMemo } from 'react';
import { GlobalContainerStyle } from '@components/Global/style';
import { MyClassesStyled, DownloadStyle } from './style';
import ClassesCard from './ClassesCard';
import { ShapeType } from '@components/ImageShaper/types';
import theme from 'theme';
import foodImg from 'public/classes/food.png';
import Link from 'next/link';
import BookPurchase from '@components/ClassDetails/BookPurchase';
import { Download } from '../icons/download';
import { OverviewCard, OverviewHeading, OverviewDesc } from '@components/ClassDetails/style';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import ScheduleCard from './ScheduleCard';
import { getCourseTimeDisplayComponents, getCourseTimeDisplay, getShapeType } from '../utils';
import { useQuery } from '@apollo/client';
import { GET_ENROLL_CLASS_DETAILS, GetEnrollClassDetailsResponse } from '@queries/myclasses';
import moment from 'moment';

interface DateAndTime {
    dateDisplay: string;
    timeDisplay: string;
}
const Lectures: FC = () => {
    const router = useRouter();
    const enrollmentId = router.query.slug;
    console.log('enrollmentId :>> ', enrollmentId);
    const { data: enrollClass, loading: enrollClassLoading } = useQuery<GetEnrollClassDetailsResponse>(
        GET_ENROLL_CLASS_DETAILS,
        {
            variables: { enrollmentId },
            fetchPolicy: 'network-only',
            skip: !enrollmentId,
        },
    );
    let dateAndTime: DateAndTime = { dateDisplay: '', timeDisplay: '' };
    if (enrollClass) {
        dateAndTime = getCourseTimeDisplayComponents(enrollClass?.enrollment?.course);
    }

    const sessionCount = useMemo(
        () => enrollClass?.enrollment.course.totalSessions.aggregate.count ?? 0,
        [enrollClass],
    );

    const completedSessions = useMemo(() => enrollClass?.enrollment?.course?.completed ?? [], [enrollClass]);

    return (
        <>
            {router.query.slug === 'livelecture' ? (
                <>
                    <MyClassesStyled className="details">
                        <GlobalContainerStyle>
                            <Link href="/my-courses" passHref>
                                <div className="main-heading banner">Back to Classes</div>
                            </Link>
                            <ClassesCard
                                registrationImage={foodImg}
                                totalSessions={3}
                                classTime=" 7:30 - 10:30PM EST"
                                classDate="August 5th - September 6th"
                                title="Bob Dylan: Highway 61 Revisited, Blues, Poetry and Electricity"
                                btnColor={theme.orange.secondary}
                                imgHeight={300}
                                imgWidth={300}
                                shapes={ShapeType.hexagon}
                                linkText="Zoom Link"
                                live
                            />
                        </GlobalContainerStyle>
                    </MyClassesStyled>
                    <MyClassesStyled className="resources">
                        <GlobalContainerStyle>
                            <div className="main-heading">Resources</div>
                            {/* <BookPurchase bgColor={theme.navy.primary} bookDetails={course.educator.books} /> */}
                            <DownloadStyle>
                                Resource Download
                                <Download />
                            </DownloadStyle>
                            <DownloadStyle>
                                Resource Download
                                <Download />
                            </DownloadStyle>
                        </GlobalContainerStyle>
                    </MyClassesStyled>
                </>
            ) : (
                <>
                    {enrollClassLoading ? (
                        ''
                    ) : (
                        <MyClassesStyled className="inprogress">
                            <GlobalContainerStyle>
                                <ClassesCard
                                    status={enrollClass?.enrollment.course.completedSession.aggregate.count}
                                    registrationImage={enrollClass?.enrollment.course.image.url || ''}
                                    totalSessions={enrollClass?.enrollment.course.totalSessions.aggregate.count}
                                    classTime={dateAndTime.timeDisplay}
                                    classDate={dateAndTime.dateDisplay}
                                    title={enrollClass?.enrollment.course.name}
                                    btnColor={enrollClass?.enrollment.course.topic.secondaryColor}
                                    imgHeight={300}
                                    imgWidth={300}
                                    shapes={getShapeType(sessionCount)}
                                    link={
                                        enrollClass?.upcoming.length !== 0
                                            ? enrollClass?.upcoming[0].session.meetingLink
                                            : completedSessions?.[0]?.meetingLink
                                    }
                                    linkText="Zoom Link"
                                />
                            </GlobalContainerStyle>
                        </MyClassesStyled>
                    )}
                    <MyClassesStyled className="resources">
                        <GlobalContainerStyle>
                            <div className="main-heading">Resources</div>
                            {enrollClass && enrollClass.enrollment.course.resources.length > 0 ? (
                                <>
                                    {enrollClass.enrollment.course.resources.map((resource) => {
                                        return (
                                            resource.resourceType === 'LINK' && (
                                                <BookPurchase
                                                    key={resource.id}
                                                    bgColor={theme.navy.primary}
                                                    bookTitle={resource.name}
                                                    bookLink={resource.link}
                                                />
                                            )
                                        );
                                    })}
                                    {enrollClass.enrollment.course.resources.map((resource) => {
                                        return (
                                            resource.resourceType === 'FILE' && (
                                                <DownloadStyle key={resource.id}>
                                                    {resource.name}
                                                    {resource.upload !== null && (
                                                        <a
                                                            href={resource.upload.url}
                                                            className="d-flex"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <Download />
                                                        </a>
                                                    )}
                                                </DownloadStyle>
                                            )
                                        );
                                    })}
                                </>
                            ) : (
                                <div className="text-center fs-5">No Resources are Available for this class</div>
                            )}

                            <div className="main-heading schedule">Schedule and Links</div>

                            {enrollClass && enrollClass.upcoming.length > 0 && (
                                <>
                                    <div className="header">UPCOMING</div>
                                    {enrollClass.upcoming.map((item) => {
                                        const timeDisplay = getCourseTimeDisplay(
                                            item.session.startTime,
                                            item.session.endTime,
                                        );
                                        const dateDisplay = moment(item.session.startTime).format('dddd, MMMM Do');
                                        return (
                                            <ScheduleCard
                                                key={item.session.id}
                                                shape={getShapeType(sessionCount)}
                                                fillColor={enrollClass?.enrollment.course.topic.secondaryColor}
                                                lectureName={item.session.title}
                                                lectureTime={`${dateDisplay}, ${timeDisplay}`}
                                                sessionLink={item.session.meetingLink}
                                                upcoming
                                            />
                                        );
                                    })}
                                </>
                            )}
                            <div
                                className={
                                    enrollClass && enrollClass.upcoming.length > 0 ? `header completed` : `header`
                                }
                            >
                                COMPLETED
                            </div>
                            {completedSessions.length > 0 ? (
                                completedSessions.map((item) => {
                                    const timeDisplay = getCourseTimeDisplay(item.startTime, item.endTime);
                                    const dateDisplay = moment(item.startTime).format('dddd, MMMM Do');
                                    return (
                                        <ScheduleCard
                                            key={item.id}
                                            shape={getShapeType(sessionCount)}
                                            fillColor={enrollClass?.enrollment.course.topic.secondaryColor}
                                            lectureName={item.title}
                                            lectureTime={`${dateDisplay}, ${timeDisplay}`}
                                            sessionLink={item.recordingLink}
                                        />
                                    );
                                })
                            ) : (
                                <div className="text-center fs-5">No Session is Completed yet</div>
                            )}
                        </GlobalContainerStyle>
                    </MyClassesStyled>
                </>
            )}
            <OverviewCard>
                <GlobalContainerStyle>
                    <Row>
                        <Col xs={24} lg={8} md={8} className="mb-4">
                            <OverviewHeading>Course Overview</OverviewHeading>
                        </Col>
                        <Col xs={24} lg={16} md={16}>
                            <OverviewDesc>
                                <HtmlContent content={enrollClass ? enrollClass.enrollment.course.overview : ''} />
                            </OverviewDesc>
                        </Col>
                    </Row>
                </GlobalContainerStyle>
            </OverviewCard>
        </>
    );
};

export default Lectures;
