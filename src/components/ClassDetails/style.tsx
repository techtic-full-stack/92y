import styled from 'styled-components';
import theme from '../../theme';
import { toRem } from '../utils';
import { Row, Col } from 'react-bootstrap';

type ClassDataColProps = {
    checkpastcourse?: boolean;
};

export const OverviewCard = styled.div`
    background: ${theme.background.dark};
    padding: ${toRem(40)} 0;
`;
export const OverviewHeading = styled.div`
    font-size: ${toRem(34)};
    line-height: ${toRem(38)};
    @media (max-width: 450px) {
        font-size: ${toRem(30)};
    }
`;

export const OverviewDesc = styled.div`
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    margin-bottom: ${toRem(26)};
    color: ${theme.black};
    white-space: pre-wrap;
    @media (max-width: 450px) {
        font-size: ${toRem(16)};
    }
`;

export const BookPurchaseCard = styled.div`
    padding: 0 ${toRem(12)};
    background: ${theme.background.dark};
    .container {
        padding: 0;
    }
`;

export const BookRow = styled(Row)`
    background: ${(props) => props.color || theme.arts.primary};
    color: ${theme.white};
    padding: ${toRem(16)} ${toRem(40)};
    a {
        cursor: default;
    }
    @media (max-width: 450px) {
        padding: ${toRem(6)} ${toRem(10)};
    }
`;

export const BookCol = styled(Col)`
    font-size: ${toRem(22)};
    line-height: ${toRem(32)};
    @media (max-width: 450px) {
        font-size: ${toRem(14)};
        line-height: ${toRem(16)};
        margin-bottom: ${toRem(10)};
    }
`;

export const PurchaseBookCol = styled(Col)`
    justify-content: flex-end;
    @media (max-width: 767px) {
        justify-content: center;
    }
`;

export const ClassDataRow = styled(Row)`
    scroll-behavior: smooth;
    row-gap: ${toRem(12)};
    padding-bottom: ${toRem(40)} !important;
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-y: scroll;
    white-space: nowrap;
    display: flex;
    flex-flow: row;
    ::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 1199px) {
        margin-left: -${toRem(24)} !important;
        margin-right: -${toRem(24)} !important;
    }
`;

export const ClassDataCol = styled(Col)<ClassDataColProps>`
    flex-grow: 0;
    .class-data-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: ${toRem(201)};
        height: ${toRem(201)};
        min-height: ${toRem(130)} !important;
        border: ${toRem(1)} solid ${(props) => (props.checkpastcourse ? `rgba(255, 255, 255, 0.25)` : theme.white)};
        padding: ${toRem(12.71)} ${toRem(9)} ${toRem(13.85)} ${toRem(12)};
        background: ${(props) => props.checkpastcourse && 'rgba(0, 0, 0, 0.1)'};
        @media (max-width: 1199px) {
            width: ${toRem(192)};
        }
        .class-date {
            font-size: ${toRem(18)};
            line-height: ${toRem(24)};
            font-weight: 700;
            font-family: 'roobertbold';
            color: ${theme.white};
            opacity: ${(props) => props.checkPastCourse && 0.5};
            margin-bottom: ${toRem(8)};
        }
        .class-title {
            text-overflow: ellipsis;
            font-family: 'roobertregular';
            overflow: hidden;
            font-size: ${toRem(22)};
            line-height: ${toRem(26)};
            letter-spacing: -0.022em;
            color: ${theme.white};
            font-weight: 400;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            white-space: pre-wrap;
        }
        .class-time {
            font-size: ${toRem(14)};
            line-height: ${toRem(18)};
            color: ${theme.white};
            margin-bottom: 0;
            font-family: 'roobertregular';
        }
    }
    @media (max-width: 1199px) {
        :first-child {
            margin-left: ${toRem(24)} !important;
        }
        :last-child {
            margin-right: ${toRem(24)} !important;
        }
    }
    @media (max-width: 768px) {
        margin-bottom: ${toRem(20)};
    }
`;

export const SessionCount = styled.span`
    font-size: ${toRem(12)};
    line-height: ${toRem(20)};
    font-weight: 700;
    font-family: 'roobertbold';
    opacity: 0.5;
    color: ${theme.white};
    letter-spacing: 0.02em;
    text-transform: uppercase;
`;

export const LeftArrowBtn = styled.span`
    width: ${toRem(36)};
    height: ${toRem(36)};
    border-radius: 50%;
    background: ${theme.white};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
export const RightArrowBtn = styled.span`
    width: ${toRem(36)};
    height: ${toRem(36)};
    border-radius: 50%;
    background: ${theme.white};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const SliderBtnDiv = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    bottom: ${toRem(241)};
    @media (max-width: 1199px) {
        display: none;
    }
`;

export const RightArrowDiv = styled.div`
    position: absolute;
    right: -${toRem(5)};
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${toRem(201)};
    width: ${toRem(82)};
    background: linear-gradient(90deg, rgba(100, 72, 58, 0) 0%, ${(props) => props.color || theme.arts.primary} 100%);
`;
export const LeftArrowDiv = styled.div`
    position: absolute;
    left: -${toRem(5)};
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${toRem(201)};
    width: ${toRem(82)};
    background: linear-gradient(-90deg, rgba(100, 72, 58, 0) 0%, ${(props) => props.color || theme.arts.primary} 100%);
`;
