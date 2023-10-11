/* eslint-disable jsx-a11y/anchor-is-valid */
import CardInfo from '@components/Checkout/CardInfo';
import Checkout, { CheckoutDetails } from '@components/Checkout/Checkout';
import Coupon from '@components/Checkout/Coupon';
import { CheckoutScreens } from '@components/Checkout/types';
import { BackArrow } from '@components/icons/back-arrow';
import { CouponDiscountType } from '@queries/checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FC, useEffect, useState } from 'react';
import { PopupCloseBtn } from '../icons/popup-close-btn';
// import useSubscription from '../../hooks/useSubscription';
import { CardInfoHeader, CardInfoText, CheckoutModal } from './styles';

const stripePromise = loadStripe(process.env.STRIPE_KEY || '');

const initialCardDetails = {
    name: '',
    card: '',
    date: '',
    cvc: '',
    id: '',
};

type CheckoutModalProps = {
    visible: boolean;
    setIsModalVisible: (value: boolean) => void;
    setVisible: (value: boolean) => void;
    details: CheckoutDetails;
    cardInfoScreen?: boolean;
    setCardInfoScreen?: any;
    onEnrolled?: (total: number) => void;
};

type CardInfoExtraProps = {
    setCheckoutScreen: (value: CheckoutScreens) => void;
    checkoutScreen: string;
    cardInfoScreen?: boolean;
    setVisible: (value: boolean) => void;
    setErrMsg: (value: string) => void;
};

const CardInfoExtra: FC<CardInfoExtraProps> = ({
    setCheckoutScreen,
    checkoutScreen,
    cardInfoScreen,
    setVisible,
    setErrMsg,
}) => {
    return (
        <CardInfoHeader>
            {cardInfoScreen ? (
                <a onClick={() => setVisible(false)}>
                    <BackArrow />
                </a>
            ) : (
                <a
                    onClick={() => {
                        setCheckoutScreen(CheckoutScreens.CHECKOUT);
                        setErrMsg('');
                    }}
                >
                    <BackArrow />
                </a>
            )}
            <CardInfoText>{checkoutScreen === 'card-info' ? 'Card Info' : 'Coupon Code'}</CardInfoText>
        </CardInfoHeader>
    );
};

const CheckoutPopupModal: FC<CheckoutModalProps> = ({
    visible,
    setVisible,
    details,
    setIsModalVisible,
    setCardInfoScreen,
    cardInfoScreen,
    onEnrolled,
}) => {
    const { innerWidth: width } = window;
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscount, setCouponDiscount] = useState<CouponDiscountType>();
    const [couponAmount, setCouponAmount] = useState(0);
    const [checkoutScreen, setCheckoutScreen] = useState(CheckoutScreens.CHECKOUT);
    const [cardDetails, setCardDetails] = useState(initialCardDetails);
    const [toggle, setToggle] = useState(false);
    const [paymentType, setPaymentType] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [seat, setSeat] = useState(1);

    const onClose = () => {
        if (cardInfoScreen) {
            setCardInfoScreen(false);
        }
        setVisible(false);
        setErrMsg('');
        setCardDetails(initialCardDetails);
        setCouponCode('');
        setCouponAmount(0);
        setCheckoutScreen(CheckoutScreens.CHECKOUT);
        setPaymentType('');
    };

    useEffect(() => {
        if (cardInfoScreen) {
            console.log('📌📌📌', cardInfoScreen);
            setCheckoutScreen(CheckoutScreens.CARD_INFO);
        }
    }, [cardInfoScreen]);

    let checkoutScreenComponent: JSX.Element;
    switch (checkoutScreen) {
        case CheckoutScreens.CHECKOUT:
            checkoutScreenComponent = (
                <Checkout
                    setCheckoutScreen={setCheckoutScreen}
                    couponCode={couponCode}
                    details={details}
                    setIsModalVisible={setIsModalVisible}
                    setVisible={setVisible}
                    setCouponCode={setCouponCode}
                    setToggle={setToggle}
                    toggle={toggle}
                    setPaymentType={setPaymentType}
                    cardDetails={cardDetails}
                    setErrMsg={setErrMsg}
                    errMsg={errMsg}
                    couponDiscount={couponDiscount}
                    couponAmount={couponAmount}
                    setCouponAmount={setCouponAmount}
                    paymentType={paymentType}
                    setSeat={setSeat}
                    seat={seat}
                    onEnrolled={onEnrolled}
                />
            );
            break;
        case CheckoutScreens.CARD_INFO:
            checkoutScreenComponent = (
                <CardInfo
                    setCheckoutScreen={setCheckoutScreen}
                    setCardDetails={setCardDetails}
                    setVisible={setVisible}
                    paymentType={paymentType}
                    setErrMsg={setErrMsg}
                    errMsg={errMsg}
                />
            );
            break;
        case CheckoutScreens.COUPON_CODE:
            checkoutScreenComponent = (
                <Coupon
                    setCouponCode={setCouponCode}
                    couponCode={couponCode}
                    setCheckoutScreen={setCheckoutScreen}
                    setErrMsg={setErrMsg}
                    errMsg={errMsg}
                    setCouponDiscount={setCouponDiscount}
                    setCouponAmount={setCouponAmount}
                />
            );
            break;
        default:
            checkoutScreenComponent = (
                <Checkout
                    setCheckoutScreen={setCheckoutScreen}
                    couponCode={couponCode}
                    details={details}
                    setIsModalVisible={setIsModalVisible}
                    setVisible={setVisible}
                    setCouponCode={setCouponCode}
                    setToggle={setToggle}
                    toggle={toggle}
                    setPaymentType={setPaymentType}
                    cardDetails={cardDetails}
                    setErrMsg={setErrMsg}
                    errMsg={errMsg}
                    couponDiscount={couponDiscount}
                    couponAmount={couponAmount}
                    setCouponAmount={setCouponAmount}
                    paymentType={paymentType}
                    setSeat={setSeat}
                    seat={seat}
                    onEnrolled={onEnrolled}
                />
            );
    }
    return (
        <CheckoutModal
            placement="right"
            width={width}
            height="100%"
            closable
            onClose={onClose}
            visible={visible}
            closeIcon={<PopupCloseBtn />}
            extra={
                checkoutScreen === CheckoutScreens.CHECKOUT ? (
                    ''
                ) : (
                    <CardInfoExtra
                        cardInfoScreen={cardInfoScreen}
                        setCheckoutScreen={setCheckoutScreen}
                        checkoutScreen={checkoutScreen}
                        setVisible={setVisible}
                        setErrMsg={setErrMsg}
                    />
                )
            }
            className={checkoutScreen === CheckoutScreens.CHECKOUT ? 'checkout-modal' : ''}
        >
            <Elements stripe={stripePromise}>{checkoutScreenComponent}</Elements>
        </CheckoutModal>
    );
};
export default CheckoutPopupModal;
