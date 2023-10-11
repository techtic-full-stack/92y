import { Modal, Drawer, Typography } from 'antd';
import styled from 'styled-components';
import { Logo } from '../icons/logo';
import { Close } from '../icons/close';
import theme from '../../theme';
import { toRem } from '../utils';

const { Title } = Typography;

export const DeleteCardHeader = styled(Title)`
    font-size: ${toRem(48)} !important;
    color: ${theme.white} !important;
    line-height: ${toRem(57)} !important;
    margin: 0 !important;
    text-align: center !important;
`;
export const DeleteCardText = styled.p`
    font-size: ${toRem(21)};
    line-height: ${toRem(23)};
    letter-spacing: -0.022em;
    text-align: center;
    color: ${theme.white};
    margin: ${toRem(12)} 0 ${toRem(40)} 0;
`;
export const CardRowContainer = styled.div`
    max-width: ${toRem(373)};
`;

export const EnrolledFooter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: ${toRem(27)};
    font-size: ${toRem(18)};
    @media (max-width: 767px) {
        button {
            display: inline-flex !important;
        }
    }
`;

export const MemberShipModalFooter = styled(EnrolledFooter)`
    align-items: center;
    margin-top: ${toRem(40)};
`;

export const ModalHeader = styled.span`
    font-family: 'roobertregular';
    font-size: ${toRem(48)};
    line-height: 120%;
    color: #010132;
`;

export const ModalSubHeader = styled.span`
    font-family: 'roobertregular';
    padding-top: ${toRem(9)};
    font-size: ${toRem(21)};
    line-height: ${toRem(23)};
    letter-spacing: -0.022em;
    color: #010132;
`;

type OnBoardingModalProp = {
    closeBtn?: boolean;
};

export const OnBoardingModal = styled(Modal)<OnBoardingModalProp>`
    .ant-modal-body {
        padding: 0;
    }
    .ant-modal-close {
        display: ${(props) => (props.closeBtn ? `inherit;` : 'none;')};
        background: ${theme.white};
        border-radius: 50%;
        color: ${theme.black};
        top: -${toRem(23)};
        right: -${toRem(23)};
        position: absolute;
        width: ${toRem(48)};
        height: ${toRem(48)};
        span {
            display: contents;
            font-size: ${toRem(17)};
        }
        @media (max-width: 942px) {
            top: -${toRem(20)};
            right: 0;
        }
        @media (max-width: 768px) {
            top: ${toRem(10)};
            right: ${toRem(10)};
        }
    }
`;

export const CheckoutModal = styled(Drawer)`
    border: 0;
    &.checkout-modal {
        .ant-drawer-close {
            position: absolute !important;
            margin-right: ${toRem(12)} !important;
            padding-right: ${toRem(6)} !important;
            top: ${toRem(24)};
            right: ${toRem(4)};
        }
    }
    .ant-drawer-close {
        z-index: 11;
        position: relative;
        right: -${toRem(4)};
        margin-right: 0;
        padding-right: 0;
    }
    .ant-drawer-body {
        padding: 0 !important;
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .ant-drawer-header {
        .ant-drawer-header-title {
            order: 2;
        }
    }
    .ant-drawer-content-wrapper {
        max-width: ${toRem(390)} !important;
        @media (min-width: 768px) {
            min-width: ${toRem(390)} !important;
        }
    }
    top: 0 !important;
`;

export const CardInfoText = styled.span`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
`;

export const CardInfoHeader = styled.div`
    display: flex;
    align-items: center;
    // padding: ${toRem(12)} 0;
    // margin-bottom: ${toRem(28)};
`;
export const Styled92UModal = styled(Modal)`
    .ant-modal-content {
        background-color: ${theme.yellow.secondary};
    }

    .ant-modal-body {
        text-align: center;
        font-family: 'roobertregular';
        padding: ${toRem(164)} ${toRem(128)};

        &,
        h3,
        h5 {
            color: ${theme.navy.primary};
        }

        @media (max-width: ${(props) => props.theme.breakpoints.md}) {
            padding: ${toRem(82)} ${toRem(64)};
        }

        @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
            padding: ${toRem(41)} ${toRem(32)};
        }
    }
`;
export const Styled92UHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
`;
export const Styled92UTitle = styled.h3`
    font-weight: 700;
    margin-bottom: 0 !important;
    letter-spacing: -0.022em;
    font-size: ${toRem(30)} !important;
`;
export const Styled92UContent = styled.div`
    font-size: ${toRem(21)};
    line-height: 1.1;
    letter-spacing: -0.022em;
`;

export const Styled92UCloseIcon = styled(Close)`
    color: black;
    background-color: white;
    border-radius: 100%;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(50%) translateY(-50%);
    width: ${toRem(48)};
    height: ${toRem(48)};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: ${toRem(14)};
        height: ${toRem(14)};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        transform: translateX(25%) translateY(-25%);
        width: ${toRem(40)};
        height: ${toRem(40)};

        svg {
            width: ${toRem(12)};
            height: ${toRem(12)};
        }
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        transform: translateX(25%) translateY(-25%);
        width: ${toRem(32)};
        height: ${toRem(32)};

        svg {
            width: ${toRem(10)};
            height: ${toRem(10)};
        }
    }
`;

export const Styled92ULogo = styled(Logo)`
    margin-bottom: ${toRem(34)};

    svg {
        width: ${toRem(230)} !important;
    }
`;
