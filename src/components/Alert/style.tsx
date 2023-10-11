import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { toRem } from '../utils';
type AlertType = {
    isVisible?: boolean;
};

export const StyledAlert = styled.div<AlertType>`
    background: ${(props: any) => props.color};
    display: ${({ isVisible }) => isVisible && 'none'};
`;

export const AlertCol = styled(Col)`
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    img {
        cursor: pointer;
    }
    &.content-wrap {
        white-space: pre-wrap;
    }
    align-items: center !important;
    @media (max-width: 450px) {
        font-size: ${toRem(12)};
    }
    @media (max-width: 350px) {
        &.close-icon {
            padding: 0 !important;
        }
    }
    @media (max-width: 575px) {
        .span-text {
            font-size: ${toRem(18)};
        }
        flex-direction: column;
        justify-content: start !important;
        align-items: start !important;
        &.close-icon {
            align-items: end !important;
            justify-content: center !important;
        }
    }
`;

export const Alertbox = styled(Row)`
    padding: ${toRem(15.5)} 0;
`;
export const AlertMessage = styled.div`
    @media (max-width: 575px) {
        font-size: ${toRem(18)};
        text-overflow: ellipsis;
        overflow: hidden;
        width: ${toRem(208)};
        white-space: nowrap;
    }
`;
export const AlertCollection = styled.div`
    @media (max-width: 575px) {
        display: none;
    }
`;
