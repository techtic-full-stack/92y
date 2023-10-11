/* eslint-disable jsx-a11y/anchor-is-valid */
import { CheckoutDetails } from '@components/Checkout/Checkout';
import CourseRegisterButton from '@components/CourseRegisterButton';
import ImageShaper from '@components/ImageShaper';
import CheckoutPopupModal from '@components/Modal/CheckoutPopupModal';
import EnrolledModal from '@components/Modal/EnrolledModal';
import PopupModal from '@components/Modal/PopupModal';
import { OnboardingScreens } from '@components/Modal/types';
import Tag from '@components/Tags';
import { TagType } from '@components/Tags/types';
import { getCourseTimeDisplayComponents, getShapeType } from '@components/utils';
import { Course } from '@queries/courses';
import { Col, Typography } from 'antd';
import Link from 'next/link';
import { FC, ReactNode, useCallback, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import theme from '../../theme';
import { RegisterText, RegisterTextBtnCol, RegisterTextRow, RegisterTextTime, UpcomingClassCardRow } from './style';

export type UpcomingClassCardProps = {
    children: ReactNode;
    btnColor?: string;
    imgHeight?: number;
    imgWidth?: number;
    course: Course;
    loading: boolean;
};
const { Title, Text } = Typography;
const UpcomingClassCard: FC<UpcomingClassCardProps> = ({
    btnColor,
    children,
    imgHeight,
    imgWidth,
    course,
    loading,
}) => {
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEnrollModal, setIsEnrollModal] = useState(false);
    const [loginScreen, setLoginScreen] = useState<OnboardingScreens>();
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    const onRegisterClicked = useCallback(() => {
        if (course.enrolled) return;
        if (!accessToken) {
            setIsModalVisible(true);
            setLoginScreen(OnboardingScreens.SIGNUP);
        } else {
            setVisible(true);
        }
    }, [course, setIsModalVisible, setLoginScreen, accessToken, setVisible]);
    const { dateDisplay, timeDisplay, combinedDisplay } = course
        ? getCourseTimeDisplayComponents(course)
        : { dateDisplay: '', timeDisplay: '', combinedDisplay: '' };

    const checkoutDetails: CheckoutDetails = {
        registrationImage: course.image.url,
        shapes: getShapeType(course.sessions.length),
        fee: course.currentTotalPrice,
        label: course.topic.name,
        title: course.name,
        btnColor,
        classDate: dateDisplay,
        classTime: timeDisplay,
        courseId: course.id,
        originalPrice: course?.currentTotalPrice,
        course,
    };
    const availableSeats = course.maxSeats - (course.remainingSeats || 0);
    const [purchasePrice, setPurchasePrice] = useState<number>(-1);
    const btnDisabled = course?.maxSeats === 0 ? false : availableSeats < 1 ? true : false;

    return (
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
                            isEnrollModalVisible={isEnrollModal}
                            price={purchasePrice}
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
            {loading ? (
                <UpcomingClassCardRow className="align-items-center">
                    <Col md={16} className="register-text-col">
                        <RegisterText>
                            <Skeleton height={13} width={207} />

                            <RegisterTextRow className="justify-content-between">
                                <RegisterTextTime md={14} sm={24} xs={24}>
                                    <Skeleton height={82} />
                                </RegisterTextTime>
                                <RegisterTextTime md={24} sm={24} xs={24}>
                                    <Skeleton height={72} />
                                </RegisterTextTime>
                            </RegisterTextRow>
                            <RegisterTextRow>
                                <RegisterTextTime md={14} sm={24} xs={24}>
                                    <Skeleton width={207} />
                                </RegisterTextTime>
                                <RegisterTextBtnCol md={10} sm={24} xs={24}>
                                    <Skeleton width={211} height={48} borderRadius={24} />
                                </RegisterTextBtnCol>
                            </RegisterTextRow>
                        </RegisterText>
                    </Col>
                    <Col md={8} sm={8} xs={24} className="register-img-col mb-2">
                        <div className="register-img">
                            <svg
                                width="300"
                                height="300"
                                viewBox="0 0 401 400"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0.0625 0H400.062V400H0.0625V0Z" fill="#D4D4D4" />
                                <path d="M0.03125 132.668V0H133.031L0.03125 132.668Z" fill="white" />
                                <path d="M400.031 267.332L400.031 400L267.031 400L400.031 267.332Z" fill="white" />
                            </svg>
                        </div>
                    </Col>
                </UpcomingClassCardRow>
            ) : (
                <UpcomingClassCardRow className="align-items-center">
                    <Col md={16} className="register-text-col">
                        <RegisterText>
                            <Tag
                                variant={TagType.live}
                                label={`${course.courseType.description || course.courseTypeDescriptor.description} |`}
                            />{' '}
                            <Tag variant={course.topic.name} label={course.topic.name} />
                            <Link
                                href={
                                    course.courseType.description
                                        ? `/class/live/${course.slug}`
                                        : `/class/course/${course.slug}`
                                }
                                passHref
                            >
                                <a>
                                    <Title level={3} className="heading">
                                        {course.name}
                                    </Title>
                                </a>
                            </Link>
                            <p className="text">{children}</p>
                            <RegisterTextRow className="justify-content-between">
                                <RegisterTextTime lg={14} md={24} sm={24} xs={24}>
                                    <Text className="timing">{combinedDisplay}</Text>
                                </RegisterTextTime>
                                <RegisterTextBtnCol lg={10} md={24} sm={24} xs={24}>
                                    <CourseRegisterButton
                                        course={course}
                                        onClicked={onRegisterClicked}
                                        buttonColor={btnColor || theme.yellow.primary}
                                        passedButtonColor={theme.navy.primary}
                                        disabled={btnDisabled}
                                    />
                                </RegisterTextBtnCol>
                            </RegisterTextRow>
                        </RegisterText>
                    </Col>
                    <Col md={8} className="register-img-col">
                        <div className="register-img">
                            <Link
                                href={
                                    course.courseType.description
                                        ? `/class/live/${course.slug}`
                                        : `/class/course/${course.slug}`
                                }
                                passHref
                            >
                                <a>
                                    <ImageShaper
                                        image={course.image.url}
                                        imgHeight={imgHeight}
                                        imgWidth={imgWidth}
                                        shape={getShapeType(course.sessions.length)}
                                        shapeColor={btnColor}
                                    />
                                </a>
                            </Link>
                        </div>
                    </Col>
                </UpcomingClassCardRow>
            )}
        </>
    );
};

export default UpcomingClassCard;
