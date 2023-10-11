import { gql } from '@apollo/client';
export interface UpdatePaymentVariables {
    paymentMethodId?: string | undefined;
    remove?: boolean;
}
export interface PurchasePlanVariables {
    planId?: string | undefined;
    promoCode?: string | undefined;
}
export interface PurchasePlanResults {
    purchasePlan: string;
}
export interface PaymentInfoResults {
    id: string;
    saved: boolean;
    details: {
        name: string;
        address: {
            city: string;
            country: string;
            line1: string;
            line2: string;
            postalCode: string;
            state: string;
        };
    };
    card: {
        last4: string;
        expMonth: number;
        expYear: number;
        cardType: string;
    };
}
export interface UpdatePaymentInfoResults {
    updatePaymentInfo: PaymentInfoResults;
}
export interface ListPaymentInfoResults {
    listPaymentMethods: PaymentInfoResults[];
}

export const UPDATE_PAYMENT_INFO = gql`
    mutation UpdatePaymentInfo($paymentMethodId: String, $remove: Boolean) {
        updatePaymentInfo(paymentMethodId: $paymentMethodId, remove: $remove) {
            id
            saved
            details {
                name
                address {
                    city
                    country
                    line1
                    line2
                    postalCode
                    state
                }
            }
            card {
                last4
            }
        }
    }
`;

export const LIST_PAYMENT_METHODS = gql`
    query ListPaymentMethods {
        listPaymentMethods {
            id
            saved
            details {
                name
                address {
                    city
                    country
                    line1
                    line2
                    postalCode
                    state
                }
            }
            card {
                last4
                expMonth
                expYear
                cardType
            }
        }
    }
`;
export interface SubscribeOverview {
    subscriptionOverview: {
        createdAt: string;
        expiresOn: string;
        invoiceAmount: number;
        pastDueAmount: number;
        proratedAmount: number;
        paymentMethods: { id: string }[];
    };
}

export const SUBSCRIBE_OVERVIEW = gql`
    query SubscriptionOverview {
        subscriptionOverview {
            createdAt
            expiresOn
            invoiceAmount
            pastDueAmount
            proratedAmount
            paymentMethods {
                id
            }
        }
    }
`;
export interface SubscriptionPlan {
    plans: {
        id: string;
        name: string;
        price: number;
        interval: string;
        isSubscription: boolean;
    }[];
}
export const SUBSCRIPTION_PLAN = gql`
    query GetSubscriptionPlans {
        plans {
            id
            name
            price
            interval
            isSubscription
        }
    }
`;

export const PURCHASE_PLAN = gql`
    mutation PurchasePlan($planId: String!, $promoCode: String) {
        purchasePlan(planId: $planId, promoCode: $promoCode)
    }
`;

export interface RetryPaymentResponse {
    retryPayment: {
        ok: boolean;
    };
}

export const RETRY_PAYMENT = gql`
    mutation RetryPayment {
        retryPayment {
            ok
        }
    }
`;
