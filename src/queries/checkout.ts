import { gql } from '@apollo/client';

export interface EnrolledByCourse {
    enroll: {
        id: string;
    };
}

export enum CouponDiscountType {
    AMOUNT = 'amount',
    PERCENT = 'percent',
}
export interface CouponValidationResult {
    validateCoupon: {
        code: string;
        discount: CouponDiscountType;
        amount: any;
    };
}
export const GET_ENROLLED_BY_COURSE = gql`
    mutation Enroll($courseId: uuid!, $paymentMethodId: String, $promoCode: String, $productId: String, $seats: Int) {
        enroll(
            courseId: $courseId
            seats: $seats
            productId: $productId
            promoCode: $promoCode
            paymentMethodId: $paymentMethodId
        ) {
            id
        }
    }
`;

export const GET_VALIDATION_COUPON = gql`
    query ValidateCoupon($code: String!) {
        validateCoupon(code: $code) {
            code
            discount
            amount
        }
    }
`;
