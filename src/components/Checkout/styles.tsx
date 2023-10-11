import styled from 'styled-components';
import theme from '../../theme';
import { toRem } from '../utils';
import { CustomInput } from '../Onboarding/style';
import { CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';

export const CustomCard = styled.div`
    margin: ${toRem(20)} 0 0 0;
`;

export const CustomCardHeader = styled.div`
    border: ${toRem(1)} solid ${theme.background.grey};
    border-top-left-radius: ${toRem(14)};
    border-top-right-radius: ${toRem(14)};
    padding: ${toRem(16)};
`;

export const PriceSpan = styled.span`
    font-family: 'roobertbold';
    font-size: ${toRem(30)};
    font-weight: 700;
    color: ${theme.black};
    line-height: ${toRem(34)};
    letter-spacing: -0.022em;
`;

export const CustomCardBody = styled.div`
    border-bottom-left-radius: ${toRem(14)};
    border-bottom-right-radius: ${toRem(14)};
    background: ${theme.background.grey};
    padding: ${toRem(24)} 0 ${toRem(16)} ${toRem(16)};
    border: ${toRem(1)} solid ${theme.background.grey};
    bottom: ${toRem(30)};
    ul {
        margin: 0;

        li {
            font-size: ${toRem(14)};
        }
    }
`;

export const CheckoutContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const CheckoutBody = styled.div`
    padding: ${toRem(8)} ${toRem(24)};
    @media (max-width: 389px) {
        padding: ${toRem(0)} ${toRem(14)};
    }
`;

export const CheckoutFooterPrice = styled.div`
    padding: ${toRem(24)};
    background: ${theme.background.light} !important;
    border-top: ${toRem(1)} solid #c4c4c4;
    button {
        width: -webkit-fill-available;
        width: -moz-available;
        font-size: ${toRem(18)};
        line-height: ${toRem(24)};
        @media (max-width: 450px) {
            font-size: ${toRem(16)};
        }
    }
`;
export const CheckoutFooter = styled.div`
    border-top: ${toRem(1)} solid #c4c4c4;
    position: sticky;
    bottom: 0;
    z-index: 11;
    background: ${theme.white};
`;

export const TopicName = styled.span`
    font-family: 'roobertbold';
    font-size: ${toRem(14)};
    font-weight: bold;
    line-height: ${toRem(18)};
    color: ${theme.black};
    letter-spacing: 0.02em;
    @media (max-width: 450px) {
        font-size: ${toRem(12)};
        line-height: ${toRem(16)};
    }
`;

export const CourseName = styled.h2`
    font-family: 'roobertbold';
    font-size: ${toRem(30)};
    font-weight: bold;
    line-height: ${toRem(34)};
    color: ${theme.black};
    letter-spacing: -0.02em;
    padding: ${toRem(12)} 0 ${toRem(4)} 0;
    margin: 0;
    @media (max-width: 450px) {
        font-size: ${toRem(24)};
        line-height: ${toRem(28)};
    }
`;

export const TimingDiv = styled.div`
    font-family: 'roobertregular';
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    color: ${theme.black};
    @media (max-width: 450px) {
        font-size: ${toRem(14)};
        line-height: ${toRem(18)};
    }
`;

export const PaymentHeader = styled.div`
    font-family: 'roobertbold';
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    font-weight: bold;
    color: ${theme.black};
    margin-bottom: ${toRem(12)};
    margin-top: ${toRem(24)};
`;

export const PaymentDiv = styled.div`
    padding-top: ${toRem(40)};
    button {
        width: -webkit-fill-available;
        width: -moz-available;
        font-size: ${toRem(18)} !important;
        line-height: ${toRem(24)};
        margin-top: ${toRem(26)};
        :hover {
            background: ${theme.navy.primary} !important;
            color: ${theme.white} !important;
        }
        @media (max-width: 450px) {
            font-size: ${toRem(16)} !important;
        }
    }
`;

export const OtherPrice = styled.span`
    font-family: 'roobertregular';
    font-size: ${toRem(18)};
    line-height: 1.6;
    color: ${theme.black};
`;

export const TotalPrice = styled(OtherPrice)`
    font-family: 'roobertbold';
    font-weight: bold;
`;

export const RadioField = styled.div`
    font-family: 'roobertregular';
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    color: ${theme.black};
    display: flex;
    &.mac-radio-btn {
        display: -webkit-box;
    }
    justify-content: space-between;
    padding: ${toRem(10)} ${toRem(20)};
    border: ${toRem(1)} solid ${theme.black};
    border-radius: ${toRem(24)};
    margin-bottom: ${toRem(14)};
    span {
        font-family: 'roobertbold';
        font-weight: bold;
        cursor: pointer;
    }
    label {
        margin-left: ${toRem(8)};
        cursor: pointer;
    }
    input {
        width: ${toRem(16)};
        height: ${toRem(16)};
        appearance: none;
        border-radius: 50%;
        border: ${toRem(1)} solid ${theme.black};
        cursor: pointer;
    }
    input[type='radio']:checked {
        background: ${theme.black};
    }
    @media (max-width: 450px) {
        font-size: ${toRem(16)};
    }
`;

export const RadioFieldInput = styled.div`
    display: flex;
    &.mac-radio-btn {
        display: -webkit-box;
    }
    align-items: center;
`;

export const PriceDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const CardInput = styled(CustomInput)`
    width: 100%;
    border-radius: 0;
`;

export const CardInput1 = styled.input`
    font-family: 'roobertregular';
    width: 100%;
    border-radius: 0;
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    padding: ${toRem(12)} ${toRem(16)};
    border: ${toRem(1)} solid #000000;
    outline: none;
`;

export const StyledCardNumberElement = styled(CardNumberElement)`
    width: 100%;
    font-family: 'roobertregular';
    border-radius: 0;
    font-size: ${toRem(18)};
    padding: ${toRem(12)} ${toRem(16)};
    border: ${toRem(1)} solid #000000;
    outline: none;
`;

export const StyledCardCvcElement = styled(CardCvcElement)`
    width: 100%;
    font-family: 'roobertregular';
    border-radius: 0;
    font-size: ${toRem(18)};
    padding: ${toRem(12)} ${toRem(16)};
    border: ${toRem(1)} solid #000000;
    outline: none;
`;

export const StyledCardExpiryElement = styled(CardExpiryElement)`
    width: 100%;
    font-family: 'roobertregular';
    border-radius: 0;
    font-size: ${toRem(18)};
    padding: ${toRem(12)} ${toRem(16)};
    border: ${toRem(1)} solid #000000;
    outline: none;
`;

export const CardInputLabel = styled.label`
    font-family: 'roobertbold';
    font-weight: bold;
    font-size: ${toRem(12)};
    line-height: ${toRem(18)};
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: ${theme.black};
    margin-bottom: ${toRem(4)};
`;

export const AddCardButton = styled.div`
    margin-top: ${toRem(24)};
    button {
        width: -webkit-fill-available;
        width: -moz-available;
        font-size: ${toRem(18)};
        line-height: ${toRem(24)};
        @media (max-width: 450px) {
            font-size: ${toRem(16)} !important;
        }
    }
`;

export const PasswordEye = styled.span`
    position: absolute;
    top: ${toRem(38)};
    right: ${toRem(8)};
    cursor: pointer;
`;

export const Coupon = styled.div`
    font-family: 'roobertregular';
    padding: ${toRem(9)} ${toRem(26)};
    background: ${theme.black};
    color: ${theme.white};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: ${toRem(26)};
    border-radius: ${toRem(24)};
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    @media (max-width: 450px) {
        line-height: ${toRem(20)};
        font-size: ${toRem(16)};
    }
`;

export const Discount = styled.span`
    letter-spacing: -0.022em;
    font-family: 'roobertbold';
    font-weight: bold;
    font-size: ${toRem(30)};
    line-height: ${toRem(34)};
    @media (max-width: 450px) {
        line-height: ${toRem(24)};
        font-size: ${toRem(22)};
    }
`;

export const CouponDiv = styled.div`
    a {
        margin-top: ${toRem(16)};
        font-family: 'roobertregular';
        display: flex;
        justify-content: center;
        text-decoration: underline !important;
        font-size: ${toRem(18)};
        line-height: ${toRem(24)};
        color: ${theme.black};
    }
`;

export const ToggleDiv = styled.div`
    background: ${theme.background.grey};
    display: flex;
    align-items: center;
    padding: ${toRem(4)};
    border-radius: ${toRem(100)};
    cursor: pointer;
    width: 105%;
    position: relative;
    right: ${toRem(8)};
`;

export const ToggleItem = styled.div`
    text-align: center;
    padding: 0 ${toRem(34)};
    font-weight: 500;
    font-family: 'roobertbold';
    display: inline-grid;
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    color: ${theme.black};
    position: relative;
    @media (max-width: 450px) {
        font-size: ${toRem(16)};
        line-height: ${toRem(18)};
        padding: 0 ${toRem(20)};
        width: 100%;
    }
    &.active-state {
        padding: ${toRem(10)} ${toRem(32)};
        background: ${theme.white};
        border-radius: ${toRem(100)};
        border: ${toRem(1)} solid ${theme.black};
        white-space: nowrap;
        text-align: center;
        @media (max-width: 450px) {
            padding: ${toRem(10)} ${toRem(20)};
        }
    }
`;

export const SaveTag = styled.span`
    background: ${theme.blue.primary};
    color: ${theme.white};
    font-size: ${toRem(12)};
    line-height: ${toRem(14)};
    border-radius: ${toRem(100)};
    padding: ${toRem(4)} ${toRem(8)};
    position: absolute;
    right: ${toRem(34)};
    bottom: ${toRem(32)};
    @media (max-width: 450px) {
        right: ${toRem(31)};
        bottom: ${toRem(20)};
    }
    @media (max-width: 360px) {
        right: ${toRem(20)};
        bottom: ${toRem(20)};
    }
    &.active-span {
        right: ${toRem(34)};
        bottom: ${toRem(42)};
        @media (max-width: 450px) {
            right: ${toRem(31)};
            bottom: ${toRem(30)};
        }
        @media (max-width: 360px) {
            right: ${toRem(20)};
            bottom: ${toRem(30)};
        }
    }
`;

export const CheckoutError = styled.div`
    font-family: 'roobertregular';
    padding: ${toRem(11)} ${toRem(16)};
    background: ${theme.error};
    color: ${theme.white};
    text-align: center;
    font-size: ${toRem(14)};
    line-height: ${toRem(18)};
    width: 100%;
`;

export const CardInfoError = styled.div`
    font-family: 'roobertregular';
    padding: ${toRem(11)} ${toRem(16)};
    background: ${theme.error};
    color: ${theme.white};
    text-align: center;
    font-size: ${toRem(14)};
    line-height: ${toRem(18)};
    width: 100%;
`;
export const CheckBoxCustom = styled.div`
    line-height: 0 !important;
    .ant-checkbox-wrapper {
        align-items: center !important;
        top: 0 !important;
    }
    .ant-checkbox-checked::after {
        border: none !important;
    }
    .ant-checkbox {
        line-height: 0 !important;
    }
    .ant-checkbox-checked .ant-checkbox-inner {
        background: #010132;
    }
    .ant-checkbox {
        top: -${toRem(1)} !important;
    }
`;
export const SeatLabel = styled.span`
    margin-left: ${toRem(16)};
    margin-right: ${toRem(16)};
    font-family: 'roobertregular';
    font-weight: 400;
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    display: flex;
    align-items: center;
`;
export const SeatCustomButton = styled.span`
    cursor: pointer;
`;
