import { OnboardingScreens } from '@components/Modal/types';
import ForgotPassword from '@components/Onboarding/ForgotPassword';
import Login from '@components/Onboarding/Login';
import ResetPassword from '@components/Onboarding/ResetPassword';
import Screen1 from '@components/Onboarding/Screen1';
import Screen2 from '@components/Onboarding/Screen2';
import Screen3 from '@components/Onboarding/Screen3';
import Screen4 from '@components/Onboarding/Screen4';
import { FC, useCallback, useMemo, useState } from 'react';
import { OnBoardingModal } from './styles';
import OnboardingContext from '@contexts/OnboardingContext';
import { PopupCloseBtn } from '@components/icons/popup-close-btn';

type PopupModalProps = {
    isModalVisible: boolean;
    setIsModalVisible: (value: boolean) => void;
    loginScreen?: OnboardingScreens;
    setLoginScreen?: (value: OnboardingScreens) => void;
    setCheckoutVisible?: any;
    checkoutVisible?: boolean;
};

const PopupModal: FC<PopupModalProps> = ({
    isModalVisible,
    setIsModalVisible,
    loginScreen,
    setLoginScreen,
    setCheckoutVisible,
    checkoutVisible,
}) => {
    const [formData, setFormData] = useState<any>();
    const [screen, setScreen] = useState<OnboardingScreens>(OnboardingScreens.SIGNUP);
    const [classPreferences, setClassPreferences] = useState([]);
    const [teachingStylePreferences, setTeachingStylePreferences] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [closeBtn, setCloseBtn] = useState(true);
    const [screen2Enroll, setScreen2Enroll] = useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = useCallback(() => {
        setErrorMessage('');
        setIsModalVisible(false);

        setScreen(OnboardingScreens.SIGNUP);
    }, [setIsModalVisible]);

    const handleScreen = useMemo(() => {
        let popupScreen: OnboardingScreens;
        if (
            (loginScreen === OnboardingScreens.SIGNUP || loginScreen === OnboardingScreens.LOGIN) &&
            screen === OnboardingScreens.SIGNUP
        ) {
            popupScreen = loginScreen;
        } else {
            popupScreen = screen;
        }
        switch (popupScreen) {
            case OnboardingScreens.LOGIN:
                return (
                    <Login
                        setScreen={setScreen}
                        setIsModalVisible={setIsModalVisible}
                        setLoginScreen={setLoginScreen}
                        setCloseBtn={setCloseBtn}
                        setCheckoutVisible={setCheckoutVisible}
                    />
                );
            case OnboardingScreens.SIGNUP:
                return (
                    <Screen1
                        setScreen={setScreen}
                        setFormData={setFormData}
                        errorMessage={errorMessage}
                        formData={formData}
                        setErrorMessage={setErrorMessage}
                        setCloseBtn={setCloseBtn}
                    />
                );
            case OnboardingScreens.SCREEN_2:
                return (
                    <Screen2
                        setScreen={setScreen}
                        formData={formData}
                        setScreen2Modal={setIsModalVisible}
                        setCheckoutVisible={setCheckoutVisible}
                        checkoutVisible={checkoutVisible}
                    />
                );
            case OnboardingScreens.SCREEN_3:
                return <Screen3 />;
            case OnboardingScreens.SCREEN_4:
                return <Screen4 />;
            case OnboardingScreens.FORGOT_PASSWORD:
                return <ForgotPassword setScreen={setScreen} setFormData={setFormData} setCloseBtn={setCloseBtn} />;
            case OnboardingScreens.RESET_PASSWORD:
                return (
                    <ResetPassword
                        setScreen={setScreen}
                        setFormData={setFormData}
                        formData={formData}
                        setCloseBtn={setCloseBtn}
                    />
                );
            default:
                return (
                    <Screen1
                        setScreen={setScreen}
                        setFormData={setFormData}
                        errorMessage={errorMessage}
                        formData={formData}
                        setErrorMessage={setErrorMessage}
                        setCloseBtn={setCloseBtn}
                    />
                );
        }
    }, [
        loginScreen,
        screen,
        setIsModalVisible,
        setLoginScreen,
        setCheckoutVisible,
        checkoutVisible,
        errorMessage,
        formData,
    ]);

    return (
        <OnboardingContext.Provider
            value={{
                formData,
                setFormData,
                screen,
                setScreen,
                classPreferences,
                setClassPreferences,
                teachingStylePreferences,
                setTeachingStylePreferences,
                errorMessage,
                setErrorMessage,
                closeBtn,
                setCloseBtn,
                setIsModalVisible,
                screen2Enroll,
                setScreen2Enroll,
            }}
        >
            <OnBoardingModal
                visible={isModalVisible}
                centered
                footer={null}
                width={846}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                closeBtn={closeBtn}
                closeIcon={<PopupCloseBtn />}
            >
                {handleScreen}
            </OnBoardingModal>
        </OnboardingContext.Provider>
    );
};
export default PopupModal;
