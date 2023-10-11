import { FC, useState } from 'react';
import { GlobalContainerStyle } from '@components/Global/style';
import { SettingStyle, BillingRow, SettingCard, AddPaymentDiv } from '../style';
import { Typography, Col } from 'antd';
import { VisaCard } from '../../icons/visa-card';
import DeleteSavedCardModal from '@components/Modal/DeleteSavedCardModal';
import Button from '@components/Button';
import { CheckoutDetails } from '@components/Checkout/Checkout';
import CheckoutPopupModal from '@components/Modal/CheckoutPopupModal';
import theme from 'theme';
import { ListPaymentInfoResults, LIST_PAYMENT_METHODS } from '@queries/stripe';
import { useQuery } from '@apollo/client';
const { Title } = Typography;

const Billing: FC = () => {
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cardInfoScreen, setCardInfoScreen] = useState(false);

    const showDrawer = () => {
        setVisible(true);
        setCardInfoScreen(true);
    };

    const editCard = () => {
        setVisible(true);
        setCardInfoScreen(true);
    };

    const checkoutDetails: CheckoutDetails = {
        fee: 200,
    };
    const handleDelete = () => {
        setIsModalVisible(true);
    };
    const { data: cardResponse } = useQuery<ListPaymentInfoResults>(LIST_PAYMENT_METHODS);

    return (
        <>
            <DeleteSavedCardModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
            <CheckoutPopupModal
                setVisible={setVisible}
                visible={visible}
                details={checkoutDetails}
                setIsModalVisible={setIsModalVisible}
                cardInfoScreen={cardInfoScreen}
                setCardInfoScreen={setCardInfoScreen}
                // setCardInfo={setCardInfo}
            />
            {cardResponse && cardResponse.listPaymentMethods?.length > 0 ? (
                <SettingStyle>
                    <GlobalContainerStyle>
                        <SettingCard>
                            <Title level={2} className="title">
                                Saved Card
                            </Title>
                            <BillingRow>
                                <Col xl={6} className="d-flex align-items-center">
                                    <VisaCard />
                                    <Title level={4} className="card-details ps-4">
                                        {cardResponse.listPaymentMethods[0]?.card?.cardType} ****
                                        {cardResponse.listPaymentMethods[0]?.card?.last4}
                                    </Title>
                                </Col>
                                <Col xl={12} className="d-flex justify-content-between align-items-center">
                                    <Title level={4} className="card-details">
                                        Expires: {cardResponse?.listPaymentMethods[0]?.card?.expMonth}/
                                        {cardResponse?.listPaymentMethods[0]?.card?.expYear}
                                    </Title>
                                </Col>
                                <Col xl={6} className="d-flex justify-content-end align-items-center">
                                    <Title level={4} className="card-details edit" onClick={editCard}>
                                        Edit
                                    </Title>
                                    <Title level={4} className="card-details delete" onClick={handleDelete}>
                                        Delete Card
                                    </Title>
                                </Col>
                            </BillingRow>
                        </SettingCard>
                    </GlobalContainerStyle>
                </SettingStyle>
            ) : (
                <SettingStyle>
                    <GlobalContainerStyle>
                        <SettingCard>
                            <Title level={2} className="title">
                                Saved Card
                            </Title>
                            <br />
                            <AddPaymentDiv>
                                <Button lg onClick={showDrawer} bgcolor={theme.navy.primary}>
                                    Add a payment method
                                </Button>
                            </AddPaymentDiv>
                        </SettingCard>
                    </GlobalContainerStyle>
                </SettingStyle>
            )}
        </>
    );
};

export default Billing;
