import styled from 'styled-components';
import theme from '../../theme';
import { toRem } from '../utils';
import { Row, Col, Pagination } from 'antd';

export const ClassStyle = styled.div`
    padding-bottom: ${toRem(40)};
    background-color: ${theme.background.offWhite};
    &.monthFeature {
        padding-bottom: ${toRem(40)};
        .feature-collection-container {
            padding: ${toRem(40)} ${toRem(95)};
            .feature-collection-list-row {
                margin-top: ${toRem(45)};
            }
        }
    }
    &.more-classes {
        padding-bottom: ${toRem(31)};
    }
`;

export const FilterContainerStyle = styled.div`
    padding: ${toRem(25)} 0;
    .ant-select {
        .ant-select-selector {
            border: none;
            background: none;
            padding: 0 ${toRem(11)};
            display: inline-block;
            .ant-select-selection-item,
            .ant-select-selection-placeholder {
                color: ${theme.black};
                font-size: ${toRem(18)};
                line-height: normal;
                padding-right: ${toRem(20)};
            }
        }
    }
    @media (max-width: 767px) {
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        padding: ${toRem(25)} 0 0 0;
    }
    @media (max-width: 450px) {
        display: grid;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        padding: ${toRem(25)} 0 0 0;
    }
`;
export const RegisterClassStyled = styled.div`
    background: ${theme.background.dark};
    padding-top: ${toRem(40)};
    padding-bottom: ${toRem(40)};
`;

export const UpcomingClassCardRow = styled(Row)`
    background: ${theme.background.dark};
    .register-img-col {
        @media (max-width: 767px) {
            width: 100%;
            .register-img {
                padding-bottom: ${toRem(10)};
            }
        }
    }
    .register-text-col {
        padding-right: ${toRem(66)};
        @media (max-width: 767px) {
            width: 100%;
            padding-right: 0;
            margin-bottom: ${toRem(20)};
        }
    }
    @media (max-width: 767px) {
        flex-direction: column-reverse;
    }
`;

export const RegisterText = styled.div`
    max-width: ${toRem(635)};
    @media (max-width: 767px) {
        max-width: 100%;
    }
    .heading {
        font-size: ${toRem(34)};
        font-weight: 400;
        line-height: ${toRem(38)};
        @media (max-width: 991px) {
            line-height: 110%;
        }
    }
    .text {
        white-space: pre-wrap;
        color: ${theme.black};
        @media (max-width: 450px) {
            font-size: ${toRem(16)};
        }
    }
    span {
        padding: 0;
        margin-bottom: ${toRem(24)};
    }
    h3 {
        font-size: ${toRem(36)};
        line-height: ${toRem(38)};
        font-weight: normal;
    }
    p {
        font-size: ${toRem(18)};
        font-weight: normal;
        line-height: ${toRem(24)};
        margin-bottom: ${toRem(24)};
    }
`;

export const RegisterTextTime = styled(Col)`
    @media (max-width: 575px) {
        width: 100%;
    }
    span {
        font-size: ${toRem(14)};
        line-height: ${toRem(24)};
        @media (max-width: 450px) {
            font-size: ${toRem(16)};
        }
    }
`;

export const RegisterTextRow = styled(Row)`
    align-items: center;
    margin-bottom: 0 !important;
    @media (max-width: 500px) {
        row-gap: ${toRem(15)} !important;
    }
    .register-text-time {
        @media (max-width: 467px) {
            margin-bottom: ${toRem(10)};
        }
        .timing {
            line-height: ${toRem(18)};
        }
        span {
            color: ${theme.black};
            font-size: ${toRem(14)};
        }
    }
`;

export const RegisterTextBtnCol = styled(Col)`
    display: inline-grid;
    justify-content: flex-end;
    button {
        width: 100%;
        border-radius: ${toRem(50)};
        display: flex;
        align-items: center;
        span {
            font-weight: bold;
            margin-left: ${toRem(7)};
            margin-bottom: 0 !important;
        }
    }
    @media (max-width: 991px) {
        justify-content: flex-start;
        margin-top: ${toRem(12)};
    }
`;

export const FeatureCollectionRow = styled(Row)`
    margin-bottom: ${toRem(46)};
`;

export const FeatureCollectionContainer = styled.div`
    padding: ${toRem(50.5)} 0;
    .feature-collection-list-row {
        margin-top: ${toRem(45)} !important;
    }
`;

export const PaginationStyle = styled(Pagination)`
    text-align: center;
    margin-top: ${toRem(25)};
    .ant-pagination-item-link {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: ${toRem(5)};
    }
    .ant-pagination-item-link:hover {
        color: ${theme.navy.primary};
        border: ${toRem(1)} solid ${theme.navy.primary};
    }
    .ant-pagination-item {
        border-radius: ${toRem(5)};
    }
    .ant-pagination-item:hover {
        color: ${theme.navy.primary};
        border-color: ${theme.navy.primary};
    }
    .ant-pagination-item-active {
        a {
            color: ${theme.white};
            font-size: ${toRem(18)};
        }
        border: ${toRem(1)} solid ${theme.navy.primary};
        background: ${theme.navy.primary};
        border-radius: ${toRem(5)};
        box-shadow: ${toRem(2)} ${toRem(2)} ${toRem(2)} ${toRem(1)} rgba(0, 0, 0, 0.2);
    }
    .ant-pagination-item-active:hover {
        color: ${theme.white};
    }
`;

export const NoResponse = styled.div`
    font-size: ${toRem(30)};
    line-height: ${toRem(34)};
    letter-spacing: -0.022em;
`;

export const NoResponseText = styled.div`
    word-wrap: break-word;
    max-width: ${toRem(400)};
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    opacity: 0.8;
    margin-top: ${toRem(12)};
    text-align: center;
`;

export const RangeDropdown = styled.div`
    padding: 0 ${toRem(11)};
    font-size: ${toRem(18)};
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .anticon {
        position: relative;
        right: -${toRem(12)};
        @media (max-width: 575px) {
            right: -${toRem(7)};
        }
    }
`;
