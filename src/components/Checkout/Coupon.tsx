import { CheckoutScreens } from '@components/Checkout/types';
import { FC, useCallback, useState } from 'react';
import { CheckoutBody, CheckoutContainer, CardInput1, CardInputLabel, AddCardButton, CardInfoError } from './styles';
import { Col, Row } from 'antd';
import theme from '../../theme';
import Button from '@components/Button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@components/Onboarding/style';
import { GET_VALIDATION_COUPON, CouponValidationResult } from '@queries/checkout';
import { useQuery } from '@apollo/client';

const schema = yup.object().shape({
    coupon: yup.string().required('Coupon code is required'),
});

export type CouponProps = {
    setCheckoutScreen: (value: CheckoutScreens) => void;
    setCouponCode?: any;
    setCouponDiscount?: any;
    setCouponAmount?: any;
    couponCode?: string;
    errMsg?: string;
    setErrMsg: (value: string) => void;
};

const Coupon: FC<CouponProps> = ({
    setCheckoutScreen,
    setCouponCode,
    setCouponDiscount,
    setCouponAmount,
    couponCode,
    setErrMsg,
    errMsg,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const [disablebtn, setDisablebtn] = useState(false);

    const { data: validationRes, refetch } = useQuery<CouponValidationResult>(GET_VALIDATION_COUPON, {
        variables: { code: couponCode },
        onCompleted: () => {
            if (validationRes !== null) {
                console.log('object :>> ', validationRes);
                setDisablebtn(true);
                setCouponDiscount(validationRes?.validateCoupon.discount);
                setCouponAmount(validationRes?.validateCoupon.amount);
                setCheckoutScreen(CheckoutScreens.CHECKOUT);
                reset();
                setDisablebtn(false);
            }
        },
        skip: !couponCode,
        onError: useCallback(
            (error) => {
                setDisablebtn(true);
                setErrMsg(error.message);
                setCouponCode('');
                setTimeout(() => {
                    setErrMsg('');
                }, 8000);
            },
            [setCouponCode, setErrMsg],
        ),
    });

    const onSubmitHandler = (data: any) => {
        // setDisablebtn(true);
        setCouponCode(data.coupon);
        refetch();
    };

    return (
        <CheckoutContainer>
            <CheckoutBody>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Row>
                        <Col xs={24} md={24} sm={24} className="mb-3">
                            <CardInputLabel>Coupon Code</CardInputLabel>
                            <CardInput1
                                {...register('coupon')}
                                placeholder="Enter coupon code"
                                type="text"
                                defaultValue={couponCode}
                                onChange={() => {
                                    setErrMsg('');
                                    setDisablebtn(false);
                                }}
                            />
                            {errors.coupon && <ErrorMessage>{errors.coupon?.message}</ErrorMessage>}
                        </Col>
                        {errMsg && <CardInfoError>{errMsg}</CardInfoError>}
                    </Row>
                    <AddCardButton>
                        <Button
                            btnType="submit"
                            bgcolor={theme.navy.primary}
                            color={theme.white}
                            disabled={disablebtn}
                            lg
                        >
                            Apply
                        </Button>
                    </AddCardButton>
                </form>
            </CheckoutBody>
        </CheckoutContainer>
    );
};
export default Coupon;
