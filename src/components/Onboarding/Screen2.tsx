/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@components/Button';
import { CheckoutDetails } from '@components/Checkout/Checkout';
import CheckoutPopupModal from '@components/Modal/CheckoutPopupModal';
import MemberShipModal from '@components/Modal/MemberShipModal';
import { OnboardingScreens } from '@components/Modal/types';
import OnboardingContext from '@contexts/OnboardingContext';
import { Typography } from 'antd';
import Image from 'next/image';
// import { GlobalContainerStyle } from '@components/Global/style';
import screen2 from 'public/onboarding/screen2.svg';
import { FC, useContext, useState } from 'react';
import { Col } from 'react-bootstrap';
import theme from 'theme';
import {
    ContainerStyle,
    OnboardingBannerStyled,
    OnBoardingContainerStyle,
    OnBoardingHeaderCol,
    OnBoardingSubHeaderRow,
    OnboardRow,
    Screen2Text,
} from './style';

type Screen2Props = {
    setScreen: (value: OnboardingScreens) => void;
    setScreen2Modal: (value: boolean) => void;
    formData: any;
    setCheckoutVisible?: any;
    checkoutVisible?: boolean;
};

const Screen2: FC<Screen2Props> = ({ setScreen2Modal, setScreen, setCheckoutVisible, checkoutVisible }) => {
    const { Title, Text } = Typography;
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { setScreen2Enroll } = useContext(OnboardingContext);

    const checkoutDetails: CheckoutDetails = {
        // label: 'label',
        fee: 200,
    };

    const showDrawer = () => {
        setScreen2Enroll(true);
        setVisible(true);
    };

    const closeDrawer = () => {
        setScreen2Modal(false);
        setScreen(OnboardingScreens.SCREEN_1);
        if (checkoutVisible) {
            setCheckoutVisible(true);
        }
    };
    const [purchasePrice, setPurchasePrice] = useState<number>();

    return (
        <>
            <CheckoutPopupModal
                setVisible={setVisible}
                visible={visible}
                details={checkoutDetails}
                onEnrolled={setPurchasePrice}
                setIsModalVisible={setIsModalVisible}
            />
            {purchasePrice && (
                <MemberShipModal
                    memberShipModal={isModalVisible}
                    setMemberShipModal={setIsModalVisible}
                    price={purchasePrice}
                />
            )}
            <OnBoardingContainerStyle color={theme.navy.primary}>
                <ContainerStyle>
                    <OnBoardingSubHeaderRow>
                        <Col md={6}>
                            <OnboardingBannerStyled>
                                <Image src={screen2} alt="card-img" objectFit="contain" priority />
                            </OnboardingBannerStyled>
                        </Col>
                        <OnBoardingHeaderCol md={6}>
                            <div className="onboarding-header-text onboardingText">
                                <Title level={2} className="signUpHeading mb-2">
                                    Thanks for joining our Roundtable experience
                                </Title>
                                <Text className="sub-header">
                                    Purchase courses or sign up for a monthly subscription
                                </Text>
                                <OnboardRow>
                                    <Screen2Text className="text-justify">
                                        <div>Choose courses individually</div>
                                        <br />
                                        <div>Or unlimited access for each month you are subscribed</div>
                                        <br />
                                        <div>Diverse topics across the Arts, Culture and Humanities</div>
                                        <br />
                                        <div>World renowned experts, artists and creators</div>
                                        <br />
                                        <div>Live, in the moment discussions</div>
                                    </Screen2Text>
                                    <div className="screen2btn">
                                        <Button onClick={showDrawer} bgcolor="#F9D8C5" color="#000000" lg>
                                            Subscribe
                                        </Button>
                                    </div>
                                    <div className="pt-3">
                                        <Button
                                            type="secondary"
                                            onClick={closeDrawer}
                                            bgcolor="transparent"
                                            color="#F9D8C5"
                                        >
                                            Individual Purchases
                                        </Button>
                                    </div>
                                </OnboardRow>
                            </div>
                        </OnBoardingHeaderCol>
                    </OnBoardingSubHeaderRow>
                </ContainerStyle>
            </OnBoardingContainerStyle>
        </>
    );
};

export default Screen2;
