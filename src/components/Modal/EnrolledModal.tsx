/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@components/Button';
import { PopupCloseBtn } from '@components/icons/popup-close-btn';
import { Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import enrolled from 'public/onboarding/enrolled.svg';
import { FC, useCallback } from 'react';
import { Col } from 'react-bootstrap';
import theme from 'theme';
import {
    ContainerStyle,
    OnboardingBannerStyled,
    OnBoardingContainerStyle,
    OnBoardingHeaderCol,
    OnBoardingSubHeaderRow,
} from '../Onboarding/style';
import { EnrolledFooter, OnBoardingModal } from './styles';

type EnrolledModalProps = {
    setIsEnrollModalVisible: (value: boolean) => void;
    isEnrollModalVisible: boolean;
    price: number;
};

const EnrolledModal: FC<EnrolledModalProps> = ({ setIsEnrollModalVisible, isEnrollModalVisible, price }) => {
    const { Title, Text } = Typography;

    const handleOk = () => {
        setIsEnrollModalVisible(false);
    };

    const handleCancel = useCallback(() => {
        setIsEnrollModalVisible(false);
    }, [setIsEnrollModalVisible]);

    return (
        <OnBoardingModal
            visible={isEnrollModalVisible}
            centered
            footer={null}
            width={846}
            onOk={handleOk}
            onCancel={handleCancel}
            closeBtn={true}
            closeIcon={<PopupCloseBtn />}
        >
            <OnBoardingContainerStyle color={theme.navy.primary}>
                <ContainerStyle>
                    <OnBoardingSubHeaderRow>
                        <Col md={6}>
                            <OnboardingBannerStyled>
                                <Image
                                    src={enrolled}
                                    alt="card-img"
                                    width="100%"
                                    height="100%"
                                    layout="responsive"
                                    objectFit="contain"
                                    priority
                                />
                            </OnboardingBannerStyled>
                        </Col>
                        <OnBoardingHeaderCol md={6}>
                            <div className="onboarding-header-text onboarding-1">
                                <Title level={2}>You’re Enrolled!</Title>
                                <Text className="sub-header">
                                    Look for a confirmation in your email for a link to join the course and your access
                                    to the recording after the course. <br />
                                    Thank you! <br />
                                    <span id="purchase-price">${price}</span>
                                </Text>
                                <EnrolledFooter>
                                    <div className="mb-3 mt-3">
                                        <Link href="/my-courses">
                                            <a>
                                                <Button
                                                    btnType="submit"
                                                    bgcolor="#F9D8C5"
                                                    color="#000000"
                                                    className="align-self-end"
                                                    lg
                                                >
                                                    View My Courses
                                                </Button>
                                            </a>
                                        </Link>
                                    </div>
                                    <Text className="text-decoration-underline">
                                        <a
                                            onClick={() => {
                                                setIsEnrollModalVisible(false);
                                            }}
                                        >
                                            Dismiss
                                        </a>
                                    </Text>
                                </EnrolledFooter>
                            </div>
                        </OnBoardingHeaderCol>
                    </OnBoardingSubHeaderRow>
                </ContainerStyle>
            </OnBoardingContainerStyle>
        </OnBoardingModal>
    );
};
export default EnrolledModal;
