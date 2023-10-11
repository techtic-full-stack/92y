import { CheckoutScreens } from '@components/Checkout/types';
import { FC, useState, useMemo, useCallback } from 'react';
import {
    CheckoutBody,
    CheckoutContainer,
    CardInput1,
    CardInputLabel,
    AddCardButton,
    StyledCardNumberElement,
    StyledCardCvcElement,
    StyledCardExpiryElement,
    CardInfoError,
    CheckBoxCustom,
} from './styles';
import { Checkbox, Col, Row } from 'antd';
import theme from '../../theme';
import Button from '@components/Button';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@components/Onboarding/style';
import { useRouter } from 'next/router';
import useResponsiveFontSize from 'hooks/useResponsiveFontSize';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import {
    LIST_PAYMENT_METHODS,
    UPDATE_PAYMENT_INFO,
    UpdatePaymentInfoResults,
    UpdatePaymentVariables,
} from '@queries/stripe';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROFILE_DETAILS, GetUserDetails } from '@queries/user';
export interface CardDetailsType {
    name?: string;
    card?: string;
    date?: string;
    cvc?: string;
    zip?: string;
    id?: string;
}

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: theme.black,
                    lineHeight: '24px',
                    letterSpacing: '0.025em',
                    fontFamily: 'roobertregular, Source Code Pro, monospace',
                    '::placeholder': {
                        color: 'rgba(0, 0, 0, 0.5)',
                    },
                },
                invalid: {
                    color: theme.error,
                },
            },
        }),
        [fontSize],
    );

    return options;
};
export type CardInfoProps = {
    setCheckoutScreen: (value: CheckoutScreens) => void;
    setCardDetails?: any;
    checkoutScreen?: string;
    setVisible: (value: boolean) => void;
    paymentType?: string;
    errMsg?: string;
    setErrMsg: (value: any) => void;
};

const CardInfo: FC<CardInfoProps> = ({
    setCheckoutScreen,
    setCardDetails,
    setVisible,
    paymentType,
    setErrMsg,
    errMsg,
}) => {
    const router = useRouter();
    const slug = router.query.slug;
    const [name, setName] = useState('');
    const [disablebtn, setDisablebtn] = useState(false);
    const [zipcode, setZipcode] = useState('');
    const [numberError, setNumberError] = useState('');
    const [zipcodeError, setZipcodeError] = useState('');
    const [nameErrorToggle, setNameErrorToggle] = useState(false);
    const [nameFormateErrorToggle, setNameFormateErrorToggle] = useState(false);

    const [expireError, setExpireError] = useState('');
    const [cvvError, setCvvError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
    const { register } = useForm({ mode: 'onChange' });
    const [saveCard, setSaveCard] = useState(true);
    const [loading, setLoading] = useState('false');

    const [updatePayment] = useMutation<UpdatePaymentInfoResults, UpdatePaymentVariables>(UPDATE_PAYMENT_INFO, {
        refetchQueries: [{ query: LIST_PAYMENT_METHODS }],
        onCompleted: () => {
            setDisablebtn(false);
            if (slug === 'billing') {
                setVisible(false);
            } else {
                setCheckoutScreen(CheckoutScreens.CHECKOUT);
            }
            setLoading('false');
        },
        onError: useCallback(
            (error) => {
                setLoading('false');
                setErrMsg(error.message);
                setTimeout(() => {
                    setErrMsg('');
                    setDisablebtn(false);
                }, 8000);
            },
            [setErrMsg],
        ),
    });
    const { data: userData } = useQuery<GetUserDetails>(GET_PROFILE_DETAILS, {
        fetchPolicy: 'network-only',
    });
    const handleSubmit = useCallback(
        async (event: any) => {
            event.preventDefault();

            const card: any = elements?.getElement(CardNumberElement);
            const exp: any = elements?.getElement(CardExpiryElement);
            const cvc: any = elements?.getElement(CardCvcElement);

            const cardValid = !card._empty && !card._invalid;
            const expirationValid = !exp._empty && !exp._invalid;
            const cvcValid = !cvc._empty && !cvc._invalid;

            const nameError = name.length !== 0 ? false : true;
            setNameErrorToggle(nameError);
            const regex = new RegExp('[A-Za-z]');
            const nameFormateCheck = regex.test(name) ? false : true;

            if (name.length !== 0) {
                setNameFormateErrorToggle(nameFormateCheck);
            }
            setNumberError(!cardValid ? 'Enter card number' : '');
            setExpireError(!expirationValid ? 'Enter expiration' : '');
            setCvvError(!cvcValid ? 'Enter CVC' : '');

            const zipCode = zipcode.replace(/[^\d]+/g, '');
            const zipcodeValid = !!zipCode && zipCode.length === 5;
            setZipcodeError(!zipcodeValid ? 'Enter valid Zipcode' : '');
            if (zipcodeValid && !numberError && !nameError && !expireError && !cvvError && !nameFormateCheck) {
                setLoading('true');
                const response = await stripe?.createPaymentMethod({
                    type: 'card',
                    card,
                    // metadata: {
                    //     single_use: !checked ? 'true' : 'false',
                    // },
                    billing_details: {
                        name: name,
                        email: userData?.userDetails[0]?.email,
                        address: {
                            postal_code: zipcode,
                        },
                    },
                });
                if (response?.error) {
                    setLoading('false');
                    //error part
                    // console.log('object error +:>> ', response.error);
                } else {
                    //true part
                    if (paymentType === 'othercard') {
                        if (slug === 'billing') {
                            updatePayment({ variables: { paymentMethodId: response?.paymentMethod?.id } });
                        } else if (saveCard) {
                            setDisablebtn(true);
                            updatePayment({ variables: { paymentMethodId: response?.paymentMethod?.id } });
                        } else {
                            setCardDetails({
                                name: response?.paymentMethod.billing_details.name,
                                zip: response?.paymentMethod.billing_details.address?.postal_code,
                                id: response?.paymentMethod?.id,
                                card: response?.paymentMethod.card?.last4,
                            });
                            setCheckoutScreen(CheckoutScreens.CHECKOUT);
                        }
                    } else {
                        setDisablebtn(true);
                        updatePayment({ variables: { paymentMethodId: response?.paymentMethod?.id } });
                    }
                    card.clear();
                    exp.clear();
                    cvc.clear();
                    setName('');
                    setZipcode('');
                }
            }
        },
        [
            elements,
            name,
            zipcode,
            numberError,
            expireError,
            cvvError,
            stripe,
            userData?.userDetails,
            paymentType,
            setCardDetails,
            slug,
            saveCard,
            setCheckoutScreen,
            updatePayment,
        ],
    );
    const handleSaveCard = (e: any) => {
        setSaveCard(e.target.checked);
    };
    const handleCardChange = (e: any) => {
        setErrMsg('');
        setDisablebtn(false);
        if (e?.target.name === 'name') {
            setNameErrorToggle(false);
            setNameFormateErrorToggle(false);
        }
        if (e?.target.name === 'zipcode') setZipcodeError('');
    };
    return (
        <CheckoutContainer>
            <CheckoutBody>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={24} sm={24} xs={24} className="mb-3">
                            <CardInputLabel>Name On Card</CardInputLabel>
                            <CardInput1
                                {...register('name')}
                                placeholder="First Last"
                                type="name"
                                name="name"
                                value={name}
                                onChange={(e) => {
                                    const letters = /^[A-Za-z._ ]+$/;
                                    if (e.target.value.match(letters) || e.target.value === '') {
                                        setName(e.target.value);
                                        handleCardChange(e);
                                        return true;
                                    }
                                }}
                            />
                            {nameErrorToggle && <ErrorMessage>Enter Name</ErrorMessage>}
                            {nameFormateErrorToggle && <ErrorMessage>Please Enter Character</ErrorMessage>}
                        </Col>
                        <Col md={24} sm={24} xs={24} className="mb-3">
                            <CardInputLabel>Credit / Debit card number</CardInputLabel>
                            <StyledCardNumberElement
                                options={options}
                                onChange={() => {
                                    setNumberError('');
                                }}
                            />
                            {numberError && <ErrorMessage>{numberError}</ErrorMessage>}
                        </Col>
                        <Col md={12} sm={12} xs={12} className="mb-3" style={{ paddingRight: '15.5px' }}>
                            <CardInputLabel>Exp Date</CardInputLabel>
                            <StyledCardExpiryElement
                                options={options}
                                onChange={() => {
                                    setExpireError('');
                                }}
                            />
                            {expireError && <ErrorMessage>{expireError}</ErrorMessage>}
                        </Col>
                        <Col md={12} sm={12} xs={12} className="mb-3">
                            <CardInputLabel>CVC</CardInputLabel>
                            <StyledCardCvcElement
                                options={options}
                                onChange={() => {
                                    setCvvError('');
                                }}
                            />
                            {cvvError && <ErrorMessage>{cvvError}</ErrorMessage>}
                        </Col>
                        <Col md={24} sm={24} xs={24} className="mb-3">
                            <CardInputLabel>Zip Code</CardInputLabel>
                            <CardInput1
                                {...register('zip')}
                                placeholder="-----"
                                type="text"
                                name="zipcode"
                                value={zipcode}
                                onChange={(e) => {
                                    const letters = /^[0-9._\b]+$/;
                                    if (e.target.value.match(letters) || e.target.value === '') {
                                        setZipcode(e.target.value);
                                        handleCardChange(e);
                                        return true;
                                    }
                                }}
                            />
                            {zipcodeError && <ErrorMessage>{zipcodeError}</ErrorMessage>}
                        </Col>
                        {errMsg && <CardInfoError>{errMsg}</CardInfoError>}
                        {slug !== 'billing' && paymentType === 'othercard' && (
                            <CheckBoxCustom>
                                <Checkbox
                                    onChange={(e) => {
                                        handleSaveCard(e);
                                    }}
                                    defaultChecked
                                >
                                    Save Card
                                </Checkbox>
                            </CheckBoxCustom>
                        )}
                    </Row>
                    <AddCardButton>
                        {loading === 'true' ? (
                            <Button
                                bgcolor="#c4c4c4"
                                color="#000000"
                                className="align-self-end"
                                disabled={loading === 'true' && true}
                                lg
                            >
                                <span
                                    className="spinner-border spinner-border-sm text-dark me-2"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Loading...
                            </Button>
                        ) : (
                            <Button
                                btnType="submit"
                                bgcolor={theme.navy.primary}
                                color={theme.white}
                                disabled={disablebtn}
                                lg
                            >
                                Add Card
                            </Button>
                        )}
                    </AddCardButton>
                </form>
            </CheckoutBody>
        </CheckoutContainer>
    );
};
export default CardInfo;
