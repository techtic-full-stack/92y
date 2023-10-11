import CourseRegisterButton from '@components/CourseRegisterButton';
import { GlobalContainerStyle } from '@components/Global/style';
import ImageShaper from '@components/ImageShaper';
import { OnboardingScreens } from '@components/Modal/types';
import { getCourseTimeDisplayComponents, getShapeType } from '@components/utils';
import { Course } from '@queries/courses';
import { Typography } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactNode, useCallback } from 'react';
import theme from 'theme';
import {
    AuthorDetail,
    BannerContainerStyle,
    ClassDetailsRow,
    ClassDetailsStyled,
    ClassImgStyled,
    EnrollDiv,
    LiveClassDetailsCol,
    LiveClassImgCol,
} from './style';

type ClassBannerProps = {
    setVisible: (value: boolean) => void;
    setIsModalVisible: (value: boolean) => void;
    setLoginScreen: (value: OnboardingScreens) => void;
    children: ReactNode;
    course: Course;
};

const { Text, Title } = Typography;

const ClassBanner: FC<ClassBannerProps> = ({
    children,

    setVisible,
    setIsModalVisible,
    setLoginScreen,
    course,
}) => {
    const { educator } = course;
    const buttonColor = course.topic.secondaryColor;
    const authorName = educator?.fullName || '';
    const authorImg = educator?.avatar.url;
    const authorTitle = educator?.profile.tagline;
    const path = educator?.slug || '';
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
    const { combinedDisplay } = getCourseTimeDisplayComponents(course);
    const availableSeats = course.maxSeats - (course.remainingSeats || 0);
    const isPassed = moment().isAfter(course.maxSessionStartsAt);
    const btnDisabled = course.maxSeats === 0 ? false : availableSeats < 1 ? true : false;

    return (
        <BannerContainerStyle color={course.topic.primaryColor}>
            <GlobalContainerStyle>
                <ClassDetailsRow>
                    <LiveClassDetailsCol lg={8}>
                        <ClassDetailsStyled className="pe-5">
                            <Text className="class-category">
                                <strong className="text-uppercase">{course.topic.name} </strong>{' '}
                                {`• ${combinedDisplay} `}
                            </Text>
                            <Title level={2} className="mt-4 mb-4">
                                {course.name}
                            </Title>
                            <AuthorDetail>
                                <Link href={{ pathname: `/educator/${path}` }} passHref>
                                    <div className="author-img">
                                        {authorImg && <Image src={authorImg} alt="img" width="48" height="48" />}
                                    </div>
                                </Link>
                                <div className="author-text">
                                    <Link href={{ pathname: `/educator/${path}` }} passHref>
                                        <Title level={3}>{authorName}</Title>
                                    </Link>
                                    <p>{authorTitle}</p>
                                </div>
                            </AuthorDetail>
                            <p className="mb-4">{children}</p>
                            <EnrollDiv>
                                <CourseRegisterButton
                                    course={course}
                                    onClicked={onRegisterClicked}
                                    buttonColor={buttonColor || theme.yellow.primary}
                                    passedButtonColor={buttonColor}
                                    disabled={btnDisabled}
                                />
                                {course.maxSeats !== 0 && (
                                    <>
                                        {!isPassed &&
                                            (availableSeats < 1 ? (
                                                <span>
                                                    <strong>Sold Out</strong>
                                                </span>
                                            ) : (
                                                <span>
                                                    <strong>{availableSeats} Seats</strong> left
                                                </span>
                                            ))}
                                    </>
                                )}
                            </EnrollDiv>
                        </ClassDetailsStyled>
                    </LiveClassDetailsCol>
                    <LiveClassImgCol lg={4}>
                        <ClassImgStyled>
                            <ImageShaper
                                image={course.image.url}
                                imgHeight={400}
                                imgWidth={400}
                                shape={getShapeType(course.sessions.length)}
                                shapeColor={buttonColor}
                            />
                        </ClassImgStyled>
                    </LiveClassImgCol>
                </ClassDetailsRow>
            </GlobalContainerStyle>
        </BannerContainerStyle>
    );
};

export default ClassBanner;
