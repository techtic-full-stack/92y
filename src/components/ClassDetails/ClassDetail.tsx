import { useQuery } from '@apollo/client';
import StatusAlert from '@components/Alert/StatusAlert';
import ClassBanner from '@components/Banner/ClassBanner';
import { CheckoutDetails } from '@components/Checkout/Checkout';
import { ClassStyle } from '@components/ClassCatalogue/style';
import CourseRegisterButton from '@components/CourseRegisterButton';
import EducatorCard from '@components/EducatorCards';
import { GlobalContainerStyle } from '@components/Global/style';
import { EducatorClassesStyled } from '@components/Home/style';
import HtmlContent from '@components/HtmlContent';
import CheckoutPopupModal from '@components/Modal/CheckoutPopupModal';
import EnrolledModal from '@components/Modal/EnrolledModal';
import PopupModal from '@components/Modal/PopupModal';
import { OnboardingScreens } from '@components/Modal/types';
import PopularClasses from '@components/PopularClasses';
import { Course, GET_COURSES_DETAIL_BY_SLUG, GetCoursesByFilterResponse } from '@queries/courses';
import { Col, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
// import inProgress from 'public/icons/inProgress.svg';
import books from 'public/icons/blackBooks.svg';
import { FC, useCallback, useEffect, useState } from 'react';
import useSubscription from '../../hooks/useSubscription';
import theme from '../../theme';
import { getCourseTimeDisplayComponents, getShapeType } from '../utils';
// import BookPurchase from './BookPurchase';
import CourseCard from './CourseCard';
import { OverviewCard, OverviewDesc, OverviewHeading } from './style';

type CourseDetailProps = {
    // bookPurchaseColor?: string;
    onNavColorChanged?: any;
    coursesData: Course[];
    loadingCourse?: boolean;
    onTopicChanged?: any;
};

const { Title } = Typography;
const ClassDetail: FC<CourseDetailProps> = ({
    // bookPurchaseColor,
    onNavColorChanged,
    loadingCourse,
    coursesData,
    onTopicChanged,
}) => {
    const router = useRouter();
    const slug = router.query.slug;
    const { data, refetch } = useQuery<GetCoursesByFilterResponse>(GET_COURSES_DETAIL_BY_SLUG, {
        variables: { slug },
        fetchPolicy: 'network-only',
        onCompleted: ({ course }) => {
            if (course) {
                onNavColorChanged(course.topic.primaryColor);
                onTopicChanged(course.id);
            }
        },
    });

    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loginScreen, setLoginScreen] = useState<OnboardingScreens>();
    const [isEnrollModal, setIsEnrollModal] = useState(false);
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    const course = data?.course;
    const onRegisterClicked = useCallback(() => {
        if (course?.enrolled) return;
        if (!accessToken) {
            setIsModalVisible(true);
            setLoginScreen(OnboardingScreens.SIGNUP);
        } else {
            setVisible(true);
        }
    }, [course, setIsModalVisible, setLoginScreen, accessToken, setVisible]);
    useEffect(() => {
        refetch();
    }, [accessToken, refetch]);
    const subscription = useSubscription();
    const checkoutDetails: CheckoutDetails = {
        registrationImage: course?.image.url,
        shapes: course && getShapeType(course?.sessions.length),
        fee: subscription?.active && course?.includeInSubscription ? 0 : course?.currentTotalPrice || 0,
        label: course?.topic.name,
        title: course?.name,
        btnColor: `${course?.topic.secondaryColor}`,
        classDate: course && getCourseTimeDisplayComponents(course).dateDisplay,
        classTime: course && getCourseTimeDisplayComponents(course).timeDisplay,
        courseId: course ? course.id : '',
        originalPrice: course?.currentTotalPrice,
        course,
    };

    const availableSeats = (course && course.maxSeats - (course.remainingSeats || 0)) as number;
    const [purchasePrice, setPurchasePrice] = useState<number>(-1);
    const btnDisabled = course?.maxSeats === 0 ? false : availableSeats < 1 ? true : false;
    return (
        <>
            {!course ? (
                ''
            ) : (
                <>
                    {accessToken && (
                        <>
                            {!course.enrolled && (
                                <CheckoutPopupModal
                                    setVisible={setVisible}
                                    visible={visible}
                                    details={checkoutDetails}
                                    onEnrolled={setPurchasePrice}
                                    setIsModalVisible={setIsEnrollModal}
                                />
                            )}
                            {purchasePrice !== -1 && (
                                <EnrolledModal
                                    price={purchasePrice}
                                    isEnrollModalVisible={isEnrollModal}
                                    setIsEnrollModalVisible={setIsEnrollModal}
                                />
                            )}
                        </>
                    )}

                    <PopupModal
                        isModalVisible={isModalVisible}
                        setIsModalVisible={setIsModalVisible}
                        loginScreen={loginScreen}
                        setLoginScreen={setLoginScreen}
                        setCheckoutVisible={setVisible}
                        checkoutVisible={visible}
                    />

                    {course.collection.map((alert) => {
                        return (
                            alert.slug !== null && (
                                <StatusAlert
                                    key={alert.slug}
                                    bgcolor={theme.literature.secondary}
                                    text={alert.name}
                                    boldText="Part of a Collection:"
                                    status="See Collection"
                                    statusIcon={books}
                                    slug={alert.slug}
                                />
                            )
                        );
                    })}

                    <ClassBanner
                        setVisible={setVisible}
                        setIsModalVisible={setIsModalVisible}
                        setLoginScreen={setLoginScreen}
                        course={course}
                    >
                        {course.headline}
                    </ClassBanner>
                    {course.sessions.length > 0 && (
                        <CourseCard bgcolor={course.topic.primaryColor} sessions={course.sessions} />
                    )}
                    {course.educator ? (
                        <EducatorCard
                            educator={course.educator}
                            color={course.topic.secondaryColor}
                            upperBackground={course.topic.primaryColor}
                            lowerBackground={theme.background.dark}
                            button="See Profile"
                            isClassDetails={true}
                        >
                            <HtmlContent content={course.educator.profile?.bio} />
                        </EducatorCard>
                    ) : null}
                    <OverviewCard>
                        <GlobalContainerStyle>
                            <Row>
                                <Col lg={8} sm={24} xs={24} className="mb-4">
                                    <OverviewHeading>Course Overview</OverviewHeading>
                                </Col>
                                <Col lg={16} sm={24} xs={24}>
                                    <OverviewDesc>
                                        <HtmlContent content={course.overview} />
                                    </OverviewDesc>
                                    <CourseRegisterButton
                                        course={course}
                                        onClicked={onRegisterClicked}
                                        buttonColor="#69DCB5"
                                        passedButtonColor="#000000"
                                        disabled={btnDisabled}
                                    />
                                </Col>
                            </Row>
                        </GlobalContainerStyle>
                    </OverviewCard>
                    {/* {course.educator.books.length > 0 && (
                        <BookPurchase bgColor={bookPurchaseColor} bookDetails={course.educator.books} />
                    )} */}
                    <ClassStyle>
                        <GlobalContainerStyle>
                            <EducatorClassesStyled>
                                <div className="title">
                                    <Title>Happening Soon. Sign Up Now.</Title>
                                </div>
                                <div className="cards">
                                    <Row gutter={[24, 48]}>
                                        <PopularClasses coursesData={coursesData} loading={loadingCourse} />
                                    </Row>
                                </div>
                            </EducatorClassesStyled>
                        </GlobalContainerStyle>
                    </ClassStyle>
                </>
            )}
        </>
    );
};

export default ClassDetail;
