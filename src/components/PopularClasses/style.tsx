import styled from 'styled-components';
import { Row, Col, Card } from 'antd';
import { toRem } from '../../components/utils';
import theme from 'theme';

export const CardListStyle = styled(Card)`
    background-color: ${theme.background.offWhite};
    .ant-card-body {
        padding: 0;
    }
`;

export const CategoryTypeRow = styled(Row)`
    margin-top: ${toRem(3)};
    margin-bottom: ${toRem(9)};
    .category-type-col {
        width: 100%;
        line-height: normal;
        white-space: nowrap;
        display: flex;
        justify-content: space-between;
    }
    span {
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap !important;
    }
    @media (max-width: 767px) {
        justify-content: flex-start;
    }
`;

export const CardHeaderContainer = styled.div`
    cursor: pointer;
    figure {
        width: 100%;
        height: 100%;
        position: relative;
        margin-bottom: 0;
    }
    text-align: left;
    .card-header-title {
        font-weight: bold;
        font-family: 'roobertbold';
        font-size: ${toRem(18)};
        line-height: 125%;
        text-transform: capitalize;
        margin-bottom: ${toRem(17)};
        @media (max-width: 991px) {
            line-height: 110%;
        }
        @media (min-width: 550px) {
            min-height: ${toRem(60)};
        }
        @media (min-width: 990px) {
            min-height: ${toRem(69)};
        }
    }
`;

export const CardBodyStyled = styled.div`
    .author-details {
        padding-bottom: ${toRem(11)};
        border-bottom: ${toRem(1)} solid ${theme.black};
        display: flex;
        align-items: flex-start;
        overflow: hidden;
        min-height: ${toRem(55)};
        &.with-sekeleton {
            border-bottom: 0;
        }
        @media (max-width: 991px) {
            justify-content: flex-start;
        }
        .author-img-div {
            min-width: ${toRem(30)};
            min-height: ${toRem(30)};
            margin-right: ${toRem(8)};
            @media (max-width: 1199px) {
                margin-right: ${toRem(5)};
            }
            span {
                border-radius: 50%;
            }
        }
        .author-text {
            h3 {
                font-size: ${toRem(12)};
                font-weight: normal;
                line-height: ${toRem(14)};
                margin-bottom: 0;
                color: ${theme.black};
            }
            p {
                font-size: ${toRem(12)};
                line-height: ${toRem(14)};
                font-weight: normal;
                color: #555252;
                margin-bottom: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                @media (max-width: 1199px) {
                    font-size: ${toRem(9)};
                }
            }
        }
    }
`;

export const CardBodyTime = styled.div`
    text-align: left;
`;

export const DateCol = styled(Col)`
    white-space: nowrap;
    .date {
        font-size: ${toRem(12)};
        line-height: ${toRem(14)};
    }
`;

export const TimeCol = styled(Col)`
    text-align: right;
    white-space: nowrap;
    .time {
        font-size: ${toRem(12)};
        line-height: ${toRem(14)};
    }
`;

export const CardListCol = styled(Col)`
    @media (max-width: 991px) {
        flex: 0 0 50%;
        max-width: 50%;
        padding-top: ${toRem(14)};
    }
    @media (max-width: 550px) {
        flex: 0 0 100%;
        max-width: 100%;
    }
`;
