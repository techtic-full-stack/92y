import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { toRem } from '../utils';

export const StyledButton = styled(Button)`
    display: inline-flex;
    font-weight: 400;
    font-size: ${toRem(16)};
    align-items: center;
    justify-content: center;
    border-radius: ${toRem(24)};
    padding: ${toRem(9)} ${toRem(24)};
    border: none;
    line-height: 150%;
    box-shadow: none !important;
    @media not all and (min-resolution: 0.001dpcm) {
        line-height: normal;
        padding: ${toRem(8)} ${toRem(24)} ${toRem(12)};
        display: -webkit-flex !important;
        .anticon {
            position: relative;
            top: ${toRem(2)};
        }
    }
    &.lg {
        padding: ${toRem(12)} ${toRem(24)};
    }
    &.active {
        font-weight: 600;
        font-size: ${toRem(16)};
        padding: ${toRem(14)} ${toRem(24)};
        line-height: ${toRem(18)};
        box-shadow: none !important;
        border-color: inherit;
    }
    &.secondary {
        padding: ${toRem(14)} ${toRem(24)};
        font-size: ${toRem(16)};
        line-height: ${toRem(18)};
        border: ${toRem(1)} solid ${(props: any) => props.color};
    }
`;

export const LeftIconContainer = styled.span`
    margin: 0 ${toRem(8.8)} ${toRem(0)} ${toRem(0)};
    display: inline-flex;
`;

export const RightIconContainer = styled.span`
    margin: 0 ${toRem(0)} ${toRem(0)} ${toRem(8.8)};
    display: inline-flex;
`;
