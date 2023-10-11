import { CouponDiscountType } from '@queries/checkout';

interface CurrencyFeeType {
    Percent: number;
    Fixed: number;
}
const STRIP_FEES: Record<string, CurrencyFeeType> = {
    USD: { Percent: 2.9, Fixed: 0.3 },
    GBP: { Percent: 2.4, Fixed: 0.2 },
    EUR: { Percent: 2.4, Fixed: 0.24 },
    CAD: { Percent: 2.9, Fixed: 0.3 },
    AUD: { Percent: 2.9, Fixed: 0.3 },
    NOK: { Percent: 2.9, Fixed: 2 },
    DKK: { Percent: 2.9, Fixed: 1.8 },
    SEK: { Percent: 2.9, Fixed: 1.8 },
    JPY: { Percent: 3.6, Fixed: 0 },
    MXN: { Percent: 3.6, Fixed: 3 },
};
type CompactCoupon = {
    discount: CouponDiscountType;
    amount: number;
} | null;
interface CalculateWithFeesArgs {
    amount: number;
    seats: number;
    shouldBeFree: boolean;
    coupon?: CompactCoupon | null;
    currency?: string;
}
const clampAmount = (amount: number) => {
    return parseFloat(amount.toFixed(2));
};
const calculateCouponDiscount = (amount: number, coupon?: CompactCoupon | null) => {
    return coupon
        ? coupon.discount === CouponDiscountType.PERCENT
            ? (coupon.amount / 100) * amount
            : coupon.amount > amount
            ? amount
            : coupon.amount
        : 0;
};

const calculateTotalAndFee = (subtotal: number, fee: CurrencyFeeType, coupon?: CompactCoupon | null) => {
    const discountAmount = calculateCouponDiscount(subtotal, coupon);

    const amountWithCoupon = Math.min(Math.max(subtotal - discountAmount, 0), subtotal);

    const total = clampAmount(amountWithCoupon ? (amountWithCoupon + fee.Fixed) / (1 - fee.Percent / 100) : 0);

    return {
        total,
        discountAmount,
        customerTotal: total,
        fee: clampAmount(total - amountWithCoupon),
    };
};
export const calculateAmountWithFees = ({
    amount,
    seats,
    shouldBeFree,
    coupon,
    currency = 'USD',
}: CalculateWithFeesArgs) => {
    const currencyFee = STRIP_FEES[currency];

    const subtotal = shouldBeFree ? 0 : amount * seats;

    const totalAndFees = calculateTotalAndFee(subtotal, currencyFee, coupon);
    let { total } = totalAndFees;
    const { fee, customerTotal, discountAmount } = totalAndFees;

    if (coupon) {
        if (coupon.discount === CouponDiscountType.PERCENT) {
            // add back discounted rate
            total = total / (1 - coupon.amount / 100);
        } else {
            total += coupon.amount;
        }
    }
    const totalWithDiscount = coupon ? calculateCouponDiscount(total, coupon) : 0;
    const net = clampAmount(total - fee - totalWithDiscount);

    return {
        baseAmount: amount,
        subtotal,
        fee: clampAmount(fee),
        total: clampAmount(total),
        net,
        discountAmount: clampAmount(discountAmount),
        seats,
        customerTotal,
        display: {
            customerTotal: customerTotal.toFixed(2),
            discountAmount: discountAmount.toFixed(2),
            baseAmount: amount.toFixed(2),
            net: net.toFixed(2),
            subtotal: subtotal.toFixed(2),
            total: total.toFixed(2),
            fee: fee.toFixed(2),
        },
    };
};
export type AmountWithFees = ReturnType<typeof calculateAmountWithFees>;
