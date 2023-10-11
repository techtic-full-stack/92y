/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMutation, useQuery } from '@apollo/client';
import Button from '@components/Button';
import CheckoutTotals from '@components/Checkout/CheckoutTotals';
import { calculateAmountWithFees } from '@components/Checkout/common';
import { CheckoutScreens } from '@components/Checkout/types';

import ImageShaper from '@components/ImageShaper';
import OnboardingContext from '@contexts/OnboardingContext';
import { CouponDiscountType, EnrolledByCourse, GET_ENROLLED_BY_COURSE } from '@queries/checkout';
import { GET_COLLECTION_COURSES_BY_SLUG } from '@queries/collection';
import { Course, GET_COURSES_DETAIL_BY_SLUG, GET_PICKED_FOR_YOU_DATA } from '@queries/courses';
import { GET_EDUCATOR_BY_SLUG } from '@queries/educators';
// import { Subscription } from '@queries/user';
import {
    LIST_PAYMENT_METHODS,
    ListPaymentInfoResults,
    PURCHASE_PLAN,
    PurchasePlanVariables,
    SUBSCRIBE_OVERVIEW,
    SUBSCRIPTION_PLAN,
    SubscriptionPlan,
} from '@queries/stripe';
import { GET_PROFILE_DETAILS } from '@queries/user';
import { Typography } from 'antd';
import useSubscription from 'hooks/useSubscription';
import moment from 'moment';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import theme from '../../theme';
import { priceIntToFloat } from '../utils';
// import { SubscriptionLogo } from '../icons/subscriptionLogo';
import { CardDetailsType } from './CardInfo';
import {
    CheckoutBody,
    CheckoutContainer,
    CheckoutError,
    CheckoutFooter,
    CheckoutFooterPrice,
    Coupon,
    CouponDiv,
    CourseName,
    CustomCard,
    CustomCardBody,
    CustomCardHeader,
    Discount,
    OtherPrice,
    PaymentDiv,
    PaymentHeader,
    PriceDiv,
    PriceSpan,
    RadioField,
    RadioFieldInput,
    SaveTag,
    SeatCustomButton,
    SeatLabel,
    TimingDiv,
    ToggleDiv,
    ToggleItem,
    TopicName,
    TotalPrice,
} from './styles';

export interface CheckoutDetails {
    registrationImage?: StaticImageData | string;
    label?: string;
    fee: number;
    title?: string;
    shapes?: string;
    btnColor?: string;
    classDate?: string;
    classTime?: string;
    courseId?: string;
    originalPrice?: number;
    course?: Course;
}
type CheckoutProps = {
    setCheckoutScreen: (value: CheckoutScreens) => void;
    couponCode?: string;
    details: CheckoutDetails;
    setIsModalVisible: (value: boolean) => void;
    setVisible: (value: boolean) => void;
    setCouponCode: (value: string) => void;
    toggle?: boolean;
    setToggle: (value: boolean) => void;
    setPaymentType: (value: string) => void;
    cardDetails: CardDetailsType;
    errMsg?: string;
    setErrMsg: (value: string) => void;
    couponDiscount?: CouponDiscountType;
    couponAmount?: number;
    setCouponAmount: (value: number) => void;
    paymentType: string;
    setSeat: (value: number) => void;
    seat: number;
    onEnrolled?: (price: number) => void;
};
const { Text } = Typography;
const Checkout: FC<CheckoutProps> = ({
    setCheckoutScreen,
    couponCode,
    details,
    setIsModalVisible,
    setVisible,
    setCouponCode,
    toggle,
    setToggle,
    setPaymentType,
    cardDetails,
    setErrMsg,
    errMsg,
    couponDiscount,
    couponAmount,
    setCouponAmount,
    paymentType,
    setSeat,
    seat,
    onEnrolled,
}) => {
    const { screen2Enroll } = useContext(OnboardingContext);
    const [formValue, setFormValue] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [seat, setSeat] = useState(1);
    const router = useRouter();
    const subscription = useSubscription();
    const slug = router.query.slug;
    const id = router.query.id;

    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
            setIsMac(true);
        }
    }, []);
    useEffect(() => {
        if (slug === 'purchase-details' || screen2Enroll) {
            setToggle(true);
        }
    }, [screen2Enroll, setToggle, slug]);

    const shouldBeFree = (details.course?.includeInSubscription && subscription?.active) || false;
    const amountWithFees = calculateAmountWithFees({
        amount: details.fee,
        seats: seat,
        shouldBeFree,
        coupon:
            couponAmount && couponDiscount
                ? {
                      discount: couponDiscount,
                      amount: couponAmount,
                  }
                : null,
    });

    const { data: cardResponse, loading: cardLoad } = useQuery<ListPaymentInfoResults>(LIST_PAYMENT_METHODS);
    const { data: planInfo } = useQuery<SubscriptionPlan>(SUBSCRIPTION_PLAN);
    const [enrollCourse, { data }] = useMutation<EnrolledByCourse>(GET_ENROLLED_BY_COURSE, {
        refetchQueries: [
            { query: GET_COURSES_DETAIL_BY_SLUG, variables: { slug } },
            { query: GET_COLLECTION_COURSES_BY_SLUG, variables: { slug } },
            { query: GET_EDUCATOR_BY_SLUG, variables: { id } },
            { query: GET_PICKED_FOR_YOU_DATA },
        ],
        onCompleted: useCallback(() => {
            setFormValue('');
            setLoading(false);
            // TODO: change this so enrollCourse passes `planId`
            const planPrice = planInfo?.plans[0]?.price;
            if (onEnrolled) {
                onEnrolled((toggle && planPrice) || amountWithFees.customerTotal);
            }
        }, [setFormValue, setLoading, onEnrolled, amountWithFees, planInfo, toggle]),
        onError: useCallback(
            (error) => {
                setLoading(false);
                setDisableButton(false);
                setErrMsg(error.message);
                setTimeout(() => {
                    setErrMsg('');
                    setFormValue('');
                }, 8000);
            },
            [setErrMsg, setFormValue, setLoading],
        ),
    });
    const [purchasePlan] = useMutation<PurchasePlanVariables>(PURCHASE_PLAN, {
        refetchQueries: [{ query: SUBSCRIBE_OVERVIEW }, { query: GET_PROFILE_DETAILS }],
        onCompleted: useCallback(() => {
            if (details.courseId) {
                // TODO : purchasing a subscription doesn't need to be done in a 2 mutation process.
                // the enrollCourse supports purchasing a subscription+enrolling at the same time by passing
                // `planId`
                enrollCourse({
                    variables: {
                        courseId: details.courseId,
                        seats: toggle ? 1 : seat,
                    },
                });
                setVisible(false);
                setIsModalVisible(true); //Enroll modal
                setLoading(false);
            } else {
                setVisible(false);
                setIsModalVisible(true); //Enroll modal
                setLoading(false);
            }
        }, [details.courseId, enrollCourse, toggle, seat, setVisible, setIsModalVisible]),
        onError: useCallback(
            (error) => {
                setErrMsg(error.message);
                setLoading(false);
                setTimeout(() => {
                    setErrMsg('');
                }, 8000);
            },
            [setErrMsg, setLoading],
        ),
    });
    const handlePayment = useCallback(() => {
        setLoading(true);
        if (toggle || slug === 'purchase-details') {
            // subscribe plan
            purchasePlan({ variables: { planId: planInfo?.plans[0].id } });
        } else {
            // withour subscribe purchase course
            if (screen2Enroll) {
                setVisible(false);
                setIsModalVisible(true); //Enroll modal
            } else {
                const courseId = details.courseId;
                setDisableButton(true);
                if (formValue === 'othercard') {
                    //  debit and credit card
                    return enrollCourse({
                        variables: {
                            courseId,
                            seats: seat,
                            paymentMethodId: cardDetails?.id,
                            promoCode: couponCode,
                        },
                    });
                } else if (formValue === 'savedcard') {
                    // my saved card
                    return enrollCourse({
                        variables: {
                            courseId,
                            seats: seat,
                            promoCode: couponCode,
                        },
                    });
                } else {
                    // unsaved card
                    return enrollCourse({
                        variables: {
                            courseId,
                            paymentMethodId: cardDetails?.id,
                            seats: seat,
                            promoCode: couponCode,
                        },
                    });
                }
            }
        }
    }, [
        toggle,
        slug,
        purchasePlan,
        planInfo?.plans,
        couponCode,
        screen2Enroll,
        setVisible,
        setIsModalVisible,
        details.courseId,
        formValue,
        enrollCourse,
        seat,
        cardDetails?.id,
    ]);
    useEffect(() => {
        if (data?.enroll.id) {
            setVisible(false);
            setIsModalVisible(true);
        }
    }, [data, setVisible, setIsModalVisible, cardDetails, setPaymentType, paymentType, cardResponse]);
    useEffect(() => {
        if (toggle) {
            if (cardResponse?.listPaymentMethods.length !== 0 && cardResponse !== undefined) {
                setDisableButton(false);
            } else {
                setDisableButton(true);
            }
        } else {
            if (
                (cardResponse?.listPaymentMethods.length !== 0 && cardResponse !== undefined) ||
                cardDetails.card !== ''
            ) {
                setPaymentType('othercard');
                setDisableButton(false);
            } else {
                setDisableButton(true);
            }
        }
    }, [cardDetails, cardResponse, setPaymentType, toggle]);

    return (
        <CheckoutContainer>
            <CheckoutBody>
                {details.registrationImage && (
                    <div className="pb-4">
                        <ImageShaper
                            image={details.registrationImage}
                            imgHeight={160}
                            imgWidth={160}
                            shape={details.shapes}
                            shapeColor={details.btnColor}
                        />
                    </div>
                )}
                <TopicName>{details.label}</TopicName>
                <CourseName>{details.title}</CourseName>
                <TimingDiv>{details.classDate}</TimingDiv>
                <TimingDiv>{details.classTime}</TimingDiv>
                {!shouldBeFree && (
                    <PaymentDiv>
                        {details.course?.includeInSubscription === true && (
                            <>
                                {slug !== 'purchase-details' && !screen2Enroll && (
                                    <ToggleDiv>
                                        <ToggleItem
                                            onClick={() => {
                                                setToggle(false);
                                            }}
                                            className={!toggle ? 'active-state' : ''}
                                        >
                                            Pay as you go
                                        </ToggleItem>
                                        <ToggleItem
                                            onClick={() => setToggle(true)}
                                            className={toggle ? 'active-state' : ''}
                                        >
                                            Subscription{' '}
                                            <SaveTag className={toggle ? 'active-span' : ''}>Unlimited Access</SaveTag>
                                        </ToggleItem>
                                    </ToggleDiv>
                                )}
                            </>
                        )}
                        {toggle && (
                            <CustomCard>
                                <CustomCardHeader>
                                    {/* <SubscriptionLogo /> */}
                                    <PriceSpan>
                                        ${planInfo?.plans[0]?.price} per{' '}
                                        {planInfo?.plans[0]?.interval === 'mo' ? 'month' : 'year'}
                                    </PriceSpan>
                                </CustomCardHeader>
                                <CustomCardBody>
                                    Subscriptions are $250 for a 30-day period, beginning from the date of purchase,
                                    giving you unlimited access to any of our live course sessions and recordings within
                                    that 30-day period. When that 30-day period has expired, the subscription ends: live
                                    course sessions and recordings will no longer be accessible unless the subscription
                                    is renewed. Please note that any courses that have live sessions extending beyond
                                    the 30-day subscription period will not be accessible unless the subscription is
                                    renewed. (So, for example, if you purchase a subscription on June 1, it will give
                                    you access until midnight on June 30: if a course starts in June but has one or more
                                    sessions in July, you will have to renew your subscription to access any sessions
                                    after June 30.) All courses priced at or above $320 are excluded from subscriptions.
                                </CustomCardBody>
                            </CustomCard>
                        )}
                        {slug !== 'membership-details' && !toggle && (
                            <div className="d-flex justify-content-between my-4">
                                <PaymentHeader className="text-start my-0">Seats</PaymentHeader>
                                <div className="d-flex align-items-center">
                                    <SeatCustomButton
                                        onClick={() => {
                                            if (seat > 1) {
                                                setSeat(seat - 1);
                                            }
                                        }}
                                        className={`${seat > 1 ? 'pe-auto' : 'pe-none'}`}
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M9 11H15.57V12.26H9V11Z" fill="black" />
                                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="black" />
                                        </svg>
                                    </SeatCustomButton>
                                    <SeatLabel>{seat}</SeatLabel>
                                    <SeatCustomButton
                                        onClick={() => {
                                            setSeat(seat + 1);
                                        }}
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8 11.51H11.51V8H12.77V11.51H16.28V12.77H12.77V16.28H11.51V12.77H8V11.51Z"
                                                fill="black"
                                            />
                                            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="black" />
                                        </svg>
                                    </SeatCustomButton>
                                </div>
                            </div>
                        )}
                        <PaymentHeader>Select Payment Option</PaymentHeader>
                        <form>
                            {slug !== 'membership-details' && !toggle ? (
                                cardLoad ? (
                                    <>
                                        <Skeleton width={342} height={43} />
                                        <Skeleton width={342} height={43} />
                                    </>
                                ) : cardResponse?.listPaymentMethods.length !== 0 ? (
                                    <>
                                        <RadioField className={isMac ? 'mac-radio-btn' : ''}>
                                            <RadioFieldInput className={isMac ? 'mac-radio-btn' : ''}>
                                                <input
                                                    type="radio"
                                                    id={`savedcard_${details.courseId}`}
                                                    name="payment_option"
                                                    value="savedcard"
                                                    defaultChecked={
                                                        cardResponse?.listPaymentMethods.length !== 0 &&
                                                        cardDetails.card === ''
                                                            ? true
                                                            : false
                                                    }
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                        setFormValue(e.target.value)
                                                    }
                                                />
                                                <label htmlFor={`savedcard_${details.courseId}`}>
                                                    Saved Card Ending in{' '}
                                                    {cardResponse?.listPaymentMethods[0]?.card?.last4}
                                                </label>
                                            </RadioFieldInput>
                                            <span
                                                onClick={() => {
                                                    setFormValue('savedcard');
                                                    setCheckoutScreen(CheckoutScreens.CARD_INFO);
                                                    setErrMsg('');
                                                    setPaymentType('savedcard');
                                                }}
                                            >
                                                Edit
                                            </span>
                                        </RadioField>
                                        {cardDetails.card ? (
                                            <RadioField className={isMac ? 'mac-radio-btn' : ''}>
                                                <RadioFieldInput className={isMac ? 'mac-radio-btn' : ''}>
                                                    <input
                                                        type="radio"
                                                        id={`othercard_${details.courseId}`}
                                                        name="payment_option"
                                                        value="othercard"
                                                        defaultChecked
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            setFormValue(e.target.value);
                                                            // setCheckoutScreen(CheckoutScreens.CARD_INFO);
                                                        }}
                                                    />
                                                    <label htmlFor={`othercard_${details.courseId}`}>
                                                        Card Ending in {cardDetails.card}
                                                    </label>
                                                </RadioFieldInput>
                                                <span
                                                    onClick={() => {
                                                        setCheckoutScreen(CheckoutScreens.CARD_INFO);
                                                        setErrMsg('');
                                                        setPaymentType('othercard');
                                                        setFormValue('othercard');
                                                    }}
                                                >
                                                    Edit
                                                </span>
                                            </RadioField>
                                        ) : (
                                            <RadioField
                                                className={isMac ? 'mac-radio-btn' : ''}
                                                onClick={() => {
                                                    setFormValue('othercard');
                                                    setCheckoutScreen(CheckoutScreens.CARD_INFO);
                                                    setPaymentType('othercard');
                                                }}
                                            >
                                                <RadioFieldInput className={isMac ? 'mac-radio-btn' : ''}>
                                                    <input
                                                        type="radio"
                                                        id={`othercard_${details.courseId}`}
                                                        name="payment_option"
                                                        value="othercard"
                                                        checked={false}
                                                    />
                                                    <label htmlFor={`othercard_${details.courseId}`}>
                                                        Other Debit / Credit Card
                                                    </label>
                                                </RadioFieldInput>
                                            </RadioField>
                                        )}
                                    </>
                                ) : cardDetails.card ? (
                                    <RadioField className={isMac ? 'mac-radio-btn' : ''}>
                                        <RadioFieldInput className={isMac ? 'mac-radio-btn' : ''}>
                                            <input
                                                type="radio"
                                                id={`othercard_${details.courseId}`}
                                                name="payment_option"
                                                value="othercard"
                                                checked={cardDetails.card !== '' ? true : false}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    setFormValue(e.target.value);
                                                    // setCheckoutScreen(CheckoutScreens.CARD_INFO);
                                                }}
                                                defaultChecked
                                            />
                                            <label htmlFor={`othercard_${details.courseId}`}>
                                                Card Ending in {cardDetails.card}
                                            </label>
                                        </RadioFieldInput>
                                        <span
                                            onClick={() => {
                                                setCheckoutScreen(CheckoutScreens.CARD_INFO);
                                                setErrMsg('');
                                                setPaymentType('othercard');
                                                setFormValue('othercard');
                                            }}
                                        >
                                            Edit
                                        </span>
                                    </RadioField>
                                ) : (
                                    <RadioField
                                        className={isMac ? 'mac-radio-btn' : ''}
                                        onClick={() => {
                                            setFormValue('othercard');
                                            setCheckoutScreen(CheckoutScreens.CARD_INFO);
                                            setPaymentType('othercard');
                                        }}
                                    >
                                        <RadioFieldInput className={isMac ? 'mac-radio-btn' : ''}>
                                            <input
                                                type="radio"
                                                id={`othercard_${details.courseId}`}
                                                name="payment_option"
                                                value="othercard"
                                                checked={formValue === 'othercard'}
                                            />
                                            <label htmlFor={`othercard_${details.courseId}`}>Debit / Credit Card</label>
                                        </RadioFieldInput>
                                    </RadioField>
                                )
                            ) : cardResponse?.listPaymentMethods.length !== 0 ? (
                                <RadioField className={isMac ? 'mac-radio-btn' : ''}>
                                    <RadioFieldInput className={isMac ? 'mac-radio-btn' : ''}>
                                        <input
                                            type="radio"
                                            id={`savedcard_${details.courseId}`}
                                            name="payment_option"
                                            value="savedcard"
                                            checked
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setFormValue(e.target.value)
                                            }
                                        />
                                        <label htmlFor={`savedcard_${details.courseId}`}>
                                            Saved Card Ending in {cardResponse?.listPaymentMethods[0]?.card?.last4}
                                        </label>
                                    </RadioFieldInput>
                                    <span
                                        onClick={() => {
                                            setCheckoutScreen(CheckoutScreens.CARD_INFO);
                                            setErrMsg('');
                                            setPaymentType('savedcard');
                                            setFormValue('savedcard');
                                        }}
                                    >
                                        Edit
                                    </span>
                                </RadioField>
                            ) : (
                                <RadioField
                                    className={isMac ? 'mac-radio-btn' : ''}
                                    onClick={() => {
                                        setFormValue('savedcard');
                                        setCheckoutScreen(CheckoutScreens.CARD_INFO);
                                        setPaymentType('savedcard');
                                    }}
                                >
                                    <RadioFieldInput className={isMac ? 'mac-radio-btn' : ''}>
                                        <input
                                            type="radio"
                                            id={`savedcard_${details.courseId}`}
                                            name="payment_option"
                                            value="savedcard"
                                            checked={false}
                                        />
                                        <label htmlFor={`savedcard_${details.courseId}`}>Add a Card</label>
                                    </RadioFieldInput>
                                </RadioField>
                            )}
                        </form>
                        {slug !== 'membership-details' &&
                            !toggle &&
                            (couponCode ? (
                                <CouponDiv>
                                    <Coupon>
                                        {couponDiscount === 'percent' ? (
                                            <Discount>{couponAmount}% off</Discount>
                                        ) : (
                                            <Discount>${couponAmount} off</Discount>
                                        )}

                                        <span>{couponCode}</span>
                                    </Coupon>
                                    <a
                                        onClick={() => {
                                            setCouponCode('');
                                            setCouponAmount(0);
                                            setCheckoutScreen(CheckoutScreens.COUPON_CODE);
                                        }}
                                    >
                                        Replace
                                    </a>
                                </CouponDiv>
                            ) : (
                                <Button
                                    onClick={() => setCheckoutScreen(CheckoutScreens.COUPON_CODE)}
                                    type="secondary"
                                    bgcolor={theme.white}
                                    color={theme.black}
                                >
                                    Add a Coupon
                                </Button>
                            ))}
                    </PaymentDiv>
                )}
            </CheckoutBody>
            <CheckoutFooter>
                {errMsg && <CheckoutError>{errMsg}</CheckoutError>}

                <CheckoutFooterPrice>
                    {toggle ? (
                        <>
                            <PriceDiv className="pb-1">
                                <OtherPrice>
                                    {planInfo?.plans[0]?.interval === 'mo' ? 'Monthly' : 'Yearly'} due
                                </OtherPrice>
                                <OtherPrice>
                                    ${priceIntToFloat(planInfo?.plans[0]?.price as number)}/
                                    {planInfo?.plans[0]?.interval}
                                </OtherPrice>
                            </PriceDiv>
                            <PriceDiv className="pb-1">
                                <OtherPrice>Due on</OtherPrice>
                                <OtherPrice>
                                    {moment()
                                        .add(1, planInfo?.plans[0]?.interval === 'mo' ? 'month' : 'year')
                                        .format('Do')}{' '}
                                    of each {planInfo?.plans[0]?.interval === 'mo' ? 'Month' : 'Year'}
                                </OtherPrice>
                            </PriceDiv>
                            <PriceDiv className="pb-3">
                                <TotalPrice>Due now</TotalPrice>
                                <TotalPrice>${priceIntToFloat(planInfo?.plans[0]?.price as number)}</TotalPrice>
                            </PriceDiv>
                        </>
                    ) : (
                        <CheckoutTotals
                            disableButton={disableButton}
                            amountWithFees={amountWithFees}
                            loading={loading}
                            shouldBeFree={shouldBeFree}
                        />
                    )}
                    {loading ? (
                        <Button bgcolor="#c4c4c4" color="#000000" className="align-self-end" lg>
                            <span
                                className="spinner-border spinner-border-sm text-dark me-2"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </Button>
                    ) : (
                        <Button
                            bgcolor={theme.navy.primary}
                            color={theme.white}
                            onClick={handlePayment}
                            lg
                            disabled={disableButton}
                        >
                            {shouldBeFree ? 'Due Now' : 'Submit payment'}
                        </Button>
                    )}
                    <div className="d-flex justify-content-center text-center mt-2">
                        <Text>
                            By registering you agree to our{' '}
                            <Link href="/term-of-services" passHref>
                                <a
                                    className="text-dark text-decoration-underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Terms of service
                                </a>
                            </Link>
                            <br /> and{' '}
                            <Link href="/term-of-services/#refund_policy" passHref>
                                <a
                                    className="text-dark text-decoration-underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Refund Policy
                                </a>
                            </Link>
                        </Text>
                    </div>
                </CheckoutFooterPrice>
            </CheckoutFooter>
        </CheckoutContainer>
    );
};
export default Checkout;
