/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@components/Button';
import { PopupCloseBtn } from '@components/icons/popup-close-btn';
import { OnboardingScreens } from '@components/Modal/types';
import OnboardingContext from '@contexts/OnboardingContext';
import { Typography } from 'antd';
import Link from 'next/link';
import { FC, useCallback, useContext } from 'react';
import theme from 'theme';
import { MemberShipModalContainer, OnBoardingContainerStyle } from '../Onboarding/style';
import { MemberShipModalFooter, ModalHeader, ModalSubHeader, OnBoardingModal } from './styles';

type MemberShipModalProps = {
    setMemberShipModal: (value: boolean) => void;
    memberShipModal: boolean;
    price: number;
};

const MemberShipModal: FC<MemberShipModalProps> = ({ memberShipModal, price, setMemberShipModal }) => {
    const { setIsModalVisible, setScreen } = useContext(OnboardingContext);

    const { Text } = Typography;

    const handleOk = () => {
        setMemberShipModal(false);
        setIsModalVisible(false);
    };

    const handleCancel = useCallback(() => {
        setMemberShipModal(false);
        setIsModalVisible(false);
        setScreen(OnboardingScreens.SCREEN_1);
    }, [setIsModalVisible, setMemberShipModal, setScreen]);

    return (
        <OnBoardingModal
            visible={memberShipModal}
            centered
            footer={null}
            width={846}
            onOk={handleOk}
            onCancel={handleCancel}
            closeBtn={true}
            closeIcon={<PopupCloseBtn />}
        >
            <OnBoardingContainerStyle color={theme.background.light}>
                <MemberShipModalContainer>
                    <ModalHeader>You’re in!</ModalHeader>
                    <br />
                    <ModalSubHeader>
                        Look for a confirmation in your email for a link to join the course and your access to the
                        recording after the course. <br />
                        Thank you! <br />
                        <span id="purchase-price">${price}</span>
                    </ModalSubHeader>
                    <MemberShipModalFooter>
                        <div className="mb-3 mt-3">
                            <Link href="/courses">
                                <a>
                                    <Button btnType="submit" bgcolor="#010132" className="align-self-end" lg>
                                        Explore Classes
                                    </Button>
                                </a>
                            </Link>
                        </div>
                        <Text className="text-decoration-underline">
                            <a
                                onClick={() => {
                                    setMemberShipModal(false);
                                    setIsModalVisible(false);
                                    setScreen(OnboardingScreens.SCREEN_1);
                                }}
                            >
                                Dismiss
                            </a>
                        </Text>
                    </MemberShipModalFooter>
                </MemberShipModalContainer>
            </OnBoardingContainerStyle>
        </OnBoardingModal>
    );
};
export default MemberShipModal;
