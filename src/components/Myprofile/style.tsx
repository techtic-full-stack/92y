import styled from 'styled-components';
import theme from 'theme';
import { toRem } from '../utils';
import { Row, Col } from 'antd';

type SettingStyleProps = {
    editInfo?: boolean;
};

export const SettingStyle = styled.div<SettingStyleProps>`
    background: ${theme.background.offWhite};
    min-height: 100vh;
    padding: ${toRem(40)} 0;
    .info {
        @media (max-width: 401px) {
            .title {
                padding-bottom: 0 !important;
            }
            span {
                padding-bottom: ${toRem(38)};
            }
        }
        input {
            pointer-events: ${(props) => props.editInfo && 'none'};
        }
        // button {
        //     display: ${(props) => props.editInfo && 'none'};
        // }
    }
    .second-card {
        margin-top: ${toRem(40)};
    }
`;

export const SettingCard = styled.div`
    background: ${theme.background.dark};
    padding: ${toRem(40)} ${toRem(79)} ${toRem(65)};
    @media (max-width: 991px) {
        padding: ${toRem(30)} ${toRem(24)} ${toRem(50)};
    }
    @media (max-width: 450px) {
        padding: ${toRem(40)} ${toRem(20)} ${toRem(65)};
        input {
            width: auto;
            font-size: ${toRem(18)};
        }
    }
    span {
        cursor: pointer;
    }
    .title {
        font-size: ${toRem(34)};
        line-height: ${toRem(38)};
        font-weight: 400;
        display: inline-flex;
        padding-bottom: ${toRem(38)};
        @media (max-width: 450px) {
            font-size: ${toRem(28)};
        }
    }
    .anticon {
        display: inline-flex;
        margin-left: ${toRem(10)};
    }
    .btncheck {
        display: inline-flex;
        flex-flow: wrap;
        span {
            margin: 0 ${toRem(10)} ${toRem(22)} 0;
        }
    }
`;

export const AddPaymentDiv = styled.div`
    button {
        font-size: ${toRem(18)};
        line-height: ${toRem(24)};
        @media (max-width: 450px) {
            font-size: ${toRem(16)};
        }
    }
`;

export const BillingRow = styled(Row)`
    padding: ${toRem(20)} ${toRem(24)} ${toRem(22)} ${toRem(36)};
    margin: ${toRem(15)} 0 ${toRem(53)};
    justify-content: space-between;
    align-items: center;
    row-gap: ${toRem(15)} !important;
    @media (max-width: 1025px) {
        padding: ${toRem(15)};
    }
    border: ${toRem(1)} solid ${theme.black};
    .ant-col {
        .anticon {
            display: contents;
        }
        .delete {
            cursor: pointer;
            font-size: ${toRem(18)};
            line-height: ${toRem(24)};
            font-weight: bold;
        }
        .edit {
            cursor: pointer;
            font-size: ${toRem(18)};
            line-height: ${toRem(24)};
            font-weight: bold;
            margin-right: ${toRem(40)};
        }
        h4 {
            margin: 0;
            font-size: ${toRem(22)};
            font-weight: 400;
            line-height: ${toRem(26)};
            letter-spacing: -0.022em;
            @media (max-width: 1025px) {
                font-size: ${toRem(20)};
            }
        }
    }
`;

export const MembershipTypeStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${toRem(19)};
    @media (max-width: 767px) {
        width: 100%;
        display: block;
    }
    h2 {
        padding-bottom: 0 !important;
        margin-bottom: 0;
        font-size: ${toRem(34)};
        line-height: ${toRem(38)};
        font-weight: 400;
        @media (max-width: 991px) {
            padding-bottom: 0 !important;
        }
        @media (max-width: 767px) {
            width: 100%;
            margin-bottom: ${toRem(10)};
        }
        @media (max-width: 575px) {
            font-size: ${toRem(28)} !important;
            margin-bottom: ${toRem(25)};
        }
    }
    .anticon {
        align-items: center !important;
    }
    span {
        cursor: default;
    }
`;

export const MembershipDetails = styled.div`
    margin-bottom: ${toRem(95)};
    display: flex;
    flex-direction: column;
    width: fit-content;
    @media (max-width: 575px) {
        margin-bottom: ${toRem(50)};
    }
    span {
        font-size: ${toRem(22)};
        line-height: ${toRem(26)};
        letter-spacing: -0.022em;
        margin-bottom: ${toRem(10)};
        cursor: default;
        @media (max-width: 575px) {
            font-size: ${toRem(16)};
            word-break: break-all;
        }
    }
`;

export const MembershipCancelOrPause = styled.div`
    p {
        font-size: ${toRem(22)};
        line-height: ${toRem(26)};
        letter-spacing: -0.022em;
        @media (max-width: 575px) {
            font-size: ${toRem(16)};
            word-break: break-all;
        }
    }
`;
export const OrderHistoryCardRow = styled(Row)`
    background: ${theme.background.dark};
    margin: ${toRem(20)} 0;
    .register-img-col {
        @media (max-width: 767px) {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        display: flex;
        align-items: center;
    }
`;
export const OrderHistoryCardDiv = styled.div`
    padding: ${toRem(30)} ${toRem(36.91)} ${toRem(22)} ${toRem(28)};
    .register-text-row {
        flex-flow: column;
        .timing {
            margin-bottom: ${toRem(14.5)};
            display: flex;
            align-items: center;
            @media (max-width: 767px) {
                display: block;
            }
        }
        .view-link {
            button {
                padding: 0;
                font-size: ${toRem(18)};
                font-weight: bold;
                line-height: ${toRem(24)};
            }
            margin-bottom: ${toRem(32.36)};
        }
        .view-btn {
            button {
                font-size: ${toRem(16)};
                line-height: ${toRem(24)};
                padding-top: ${toRem(8)};
                padding-bottom: ${toRem(8)};
            }
        }
        .register-text-btn-col {
            text-align: end;
            button {
                font-size: ${toRem(18)};
            }
        }
    }
`;

export const OrderHistoryStatusCol = styled(Col)`
    display: block;
    align-items: center;
    font-size: ${toRem(18)};
    span {
        margin-right: ${toRem(8)};
    }
    @media (max-width: 767px) {
        margin-bottom: ${toRem(12)};
    }
    @media (max-width: 450px) {
        margin-bottom: ${toRem(10)};
    }
`;
export const HeadingCol = styled(Col)`
    &.without-subscription {
        margin-bottom: ${toRem(60)};
    }
    .heading-text {
        font-size: ${toRem(34)};
        line-height: ${toRem(38)};
        font-weight: 400;
        margin-bottom: 0;
        min-height: ${toRem(82)};
        @media (max-width: 767px) {
            min-height: inherit;
        }
        @media (max-width: 450px) {
            font-size: ${toRem(28)};
        }
    }
    margin-bottom: ${toRem(28)};
    @media (max-width: 767px) {
        margin-bottom: ${toRem(12)};
    }
`;
export const OrderHistoryTime = styled.div`
    font-size: ${toRem(14)};
    line-height: ${toRem(18)};
    padding-left: ${toRem(14)};
    color: ${theme.black};
    @media (max-width: 767px) {
        padding-left: 0;
        padding-top: ${toRem(14.5)};
    }
`;
export const OrderHistoryTotal = styled.span`
    font-size: ${toRem(18)};
    font-weight: bold;
    font-family: 'roobertbold';
`;

export const OrderHistoryPriceDiv = styled.div`
    display: flex;
    justify-content: space-between;
    span {
        font-family: 'roobertregular';
        font-size: ${toRem(18)};
    }
`;

export const StatusDiv = styled.div`
    button {
        padding: ${toRem(7)} ${toRem(12)} !important;
        font-size: ${toRem(14)} !important;
    }
`;

export const SubscribeSpan = styled.span`
    font-size: ${toRem(22)};
    line-height: ${toRem(32)};
    letter-spacing: -0.022em;
    font-weight: bold;
    font-family: 'roobertbold';
    color: ${theme.black};
`;

export const SubscribeDiv = styled.div`
    display: flex;
    justify-content: space-between;
    span {
        font-size: ${toRem(18)};
        line-height: ${toRem(24)};
        font-family: 'roobertregular';
        color: ${theme.black};
    }
`;
