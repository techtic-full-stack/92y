import { useMutation, useQuery } from '@apollo/client';
import Button from '@components/Button';
import { CheckoutDetails } from '@components/Checkout/Checkout';
import { GlobalContainerStyle } from '@components/Global/style';
import CheckoutPopupModal from '@components/Modal/CheckoutPopupModal';
import MemberShipModal from '@components/Modal/MemberShipModal';
import {
    RETRY_PAYMENT,
    RetryPaymentResponse,
    SUBSCRIBE_OVERVIEW,
    SubscribeOverview,
    SUBSCRIPTION_PLAN,
    SubscriptionPlan,
} from '@queries/stripe';
import { Typography } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import useSubscription from '../../hooks/useSubscription';
import theme from '../../theme';
import { MembershipTypeRT } from '../icons/membership-type-rt';
import {
    MembershipCancelOrPause,
    MembershipDetails,
    MembershipTypeStyle,
    SettingCard,
    SettingStyle,
    SubscribeDiv,
    SubscribeSpan,
} from './style';

const { Title } = Typography;

const Membership: FC = () => {
    const subscription = useSubscription();
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const router = useRouter();

    const checkoutDetails: CheckoutDetails = {
        // label: 'label',
        fee: 200,
    };
    const { data: planInfo } = useQuery<SubscriptionPlan>(SUBSCRIPTION_PLAN);
    const { data } = useQuery<SubscribeOverview>(SUBSCRIBE_OVERVIEW);
    const invalidateSubscriptionState = subscription.has && !subscription.active;
    const hasPaymentMethod = !!data?.subscriptionOverview?.paymentMethods?.length;
    const [retryPayment, { loading }] = useMutation<RetryPaymentResponse>(RETRY_PAYMENT, {
        onCompleted: () => {
            if (subscription) {
                return subscription.touchUser();
            }
        },
    });

    const onValidateSubscriptionState = useCallback(() => {
        if (!invalidateSubscriptionState) {
            setVisible(true);
        } else if (!hasPaymentMethod) {
            return router.push('/my-profile/billing');
        } else {
            return retryPayment();
        }
    }, [hasPaymentMethod, invalidateSubscriptionState, setVisible, retryPayment, router]);
    const [purchasePrice, setPurchasePrice] = useState<number>(-1);
    return (
        <>
            <CheckoutPopupModal
                setVisible={setVisible}
                visible={visible}
                details={checkoutDetails}
                onEnrolled={setPurchasePrice}
                setIsModalVisible={setIsModalVisible}
            />
            {purchasePrice !== -1 && (
                <MemberShipModal
                    price={purchasePrice}
                    memberShipModal={isModalVisible}
                    setMemberShipModal={setIsModalVisible}
                />
            )}

            <SettingStyle>
                <GlobalContainerStyle>
                    <SettingCard>
                        <MembershipTypeStyle>
                            <div className="Membership-title">
                                <Title level={2} className="title">
                                    Purchase Type: {subscription.has ? <MembershipTypeRT /> : 'A la carte'}
                                </Title>
                            </div>

                            {(!subscription.has || invalidateSubscriptionState) && (
                                <div className="Membership-button" style={{ width: '50%' }}>
                                    <Button
                                        bgcolor={theme.yellow.secondary}
                                        color="#000000"
                                        disabled={loading}
                                        onClick={onValidateSubscriptionState}
                                    >
                                        {invalidateSubscriptionState ? 'Fix Subscription' : 'Subscribe Here'}
                                    </Button>
                                    {invalidateSubscriptionState &&
                                        (hasPaymentMethod ? (
                                            <small>
                                                <br />
                                                There is a problem with subscription, please press &quot;Fix
                                                Subscription&quot;. If you have removed your CC please make sure you
                                                have added a payment method to your account and then press &quot;Fix
                                                subscription&quot;
                                            </small>
                                        ) : (
                                            <small>
                                                <br />
                                                Sorry, It looks like you are missing a saved payment method. Please
                                                click &quot;Fix Subscription&quot; to be navigated to the billing
                                                section.
                                            </small>
                                        ))}
                                </div>
                            )}
                        </MembershipTypeStyle>
                        <MembershipDetails>
                            {!subscription?.has && (
                                <span>
                                    Participant Since {moment(subscription?.user?.createdAt).format('MMMM DD YYYY')}
                                </span>
                            )}
                            {subscription?.has && (
                                <>
                                    <SubscribeSpan>
                                        Subscriber Since{' '}
                                        {moment(data?.subscriptionOverview?.createdAt).format('MMMM Do YYYY')}
                                    </SubscribeSpan>
                                    <SubscribeDiv className="pb-2">
                                        <span>{planInfo?.plans[0]?.interval === 'mo' ? 'Monthly' : 'Yearly'} due</span>
                                        <span>
                                            ${planInfo?.plans[0]?.price}/
                                            {planInfo?.plans[0]?.interval === 'mo' ? 'month' : 'year'}
                                        </span>
                                    </SubscribeDiv>
                                    <SubscribeDiv>
                                        <span>Due on</span>
                                        <span>
                                            {moment(data?.subscriptionOverview?.createdAt)
                                                .add(1, planInfo?.plans[0]?.interval === 'mo' ? 'month' : 'year')
                                                .format('Do')}{' '}
                                            {planInfo?.plans[0]?.interval === 'yr'
                                                ? moment(data?.subscriptionOverview?.createdAt).format('MMMM')
                                                : ''}{' '}
                                            of each {planInfo?.plans[0]?.interval === 'mo' ? 'Month' : 'Year'}
                                        </span>
                                    </SubscribeDiv>
                                </>
                            )}
                        </MembershipDetails>
                        <MembershipCancelOrPause>
                            <p>To cancel or pause a subscription, please email hello@roundtable.org</p>
                        </MembershipCancelOrPause>
                    </SettingCard>
                </GlobalContainerStyle>
            </SettingStyle>
        </>
    );
};

export default Membership;
