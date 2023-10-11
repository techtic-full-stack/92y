import { AmountWithFees } from '@components/Checkout/common';
import { OtherPrice, PriceDiv, TotalPrice } from '@components/Checkout/styles';
import React, { FC } from 'react';

interface Props {
    amountWithFees: AmountWithFees;
    loading: boolean;
    shouldBeFree: boolean;
    disableButton: boolean;
}

const CheckoutTotals: FC<Props> = ({ amountWithFees, shouldBeFree }) => {
    return (
        <>
            {amountWithFees.seats > 1 && (
                <PriceDiv className="pb-1">
                    <OtherPrice className="fs-6">{amountWithFees.seats} seats</OtherPrice>
                    <OtherPrice className="fs-6">${amountWithFees.display.baseAmount}/ea</OtherPrice>
                </PriceDiv>
            )}
            <PriceDiv className="pb-1">
                <OtherPrice className="fs-6">Subtotal</OtherPrice>
                <OtherPrice className="fs-6">${amountWithFees.display.subtotal}</OtherPrice>
            </PriceDiv>
            {shouldBeFree && (
                <PriceDiv className="pb-1">
                    <OtherPrice className="fs-6">Subscription</OtherPrice>
                    <OtherPrice className="fs-6">-${amountWithFees.display.baseAmount}</OtherPrice>
                </PriceDiv>
            )}
            {!shouldBeFree && amountWithFees.discountAmount > 0 && (
                <PriceDiv className="pb-1">
                    <OtherPrice className="fs-6">Coupon</OtherPrice>
                    <OtherPrice className="fs-6">-${amountWithFees.display.discountAmount}</OtherPrice>
                </PriceDiv>
            )}

            {!shouldBeFree && (
                <PriceDiv className="pb-1">
                    <OtherPrice className="fs-6">Processing fee</OtherPrice>
                    <OtherPrice className="fs-6">${amountWithFees.display.fee}</OtherPrice>
                </PriceDiv>
            )}
            <PriceDiv className="pb-4">
                <TotalPrice>{shouldBeFree ? 'Due now' : 'Total'}</TotalPrice>
                <TotalPrice>${amountWithFees.display.customerTotal}</TotalPrice>
            </PriceDiv>
        </>
    );
};

export default CheckoutTotals;
