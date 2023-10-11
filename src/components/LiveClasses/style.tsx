import styled from 'styled-components';
import theme from 'theme';
import { toRem } from '../utils';
import { Row } from 'antd';
import { Container } from 'react-bootstrap';

export const LiveClassStyle = styled.div`
    background: linear-gradient(to top, #f3f3f3 0%, #f3f3f3 70%, ${theme.navy.primary} 70%, ${theme.navy.primary} 100%);
    font-family: 'roobertregular';
    padding: ${toRem(40)} 0 ${toRem(80)};
    @media (max-width: 450px) {
        padding: ${toRem(10)} 0 ${toRem(40)};
    }
`;

export const LiveClassRow = styled(Row)`
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-x: scroll;
    display: flex;
    flex-flow: row;
    ::-webkit-scrollbar {
        display: none;
    }
    .ant-card {
        background: transparent !important;
    }
    .card-header-title {
        @media (max-width: 550px) {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
    .carousel-col {
        @media (max-width: 991px) {
            flex: 0 0 35%;
            max-width: 35%;
        }
        @media (max-width: 800px) {
            flex: 0 0 45%;
            max-width: 45%;
        }
        @media (max-width: 635px) {
            flex: 0 0 65%;
            max-width: 65%;
        }
        @media (max-width: 550px) {
            flex: 0 0 90%;
            max-width: 90%;
        }
        @media (max-width: 549px) {
            flex: 0 0 70%;
            max-width: 70%;
        }
        @media (max-width: 420px) {
            flex: 0 0 90%;
            max-width: 90%;
        }
        @media (max-width: 991px) {
            :first-child {
                margin-left: ${toRem(11)} !important;
            }
            :last-child {
                margin-right: ${toRem(11)} !important;
            }
        }
    }
    @media (max-width: 991px) {
        margin-left: -${toRem(24)} !important;
        margin-right: -${toRem(24)} !important;
    }
`;

export const HeadingText = styled.div`
    font-family: 'roobertregular';
    font-size: ${toRem(34)};
    line-height: ${toRem(38)};
    text-align: left;
    color: ${theme.white};
    @media (max-width: 991px) {
        line-height: 110%;
    }
    @media (max-width: 450px) {
        margin-bottom: ${toRem(10)};
    }
`;
export const HeadingDiv = styled.div`
    margin: 0 0 ${toRem(40)};
    display: flex;
    justify-content: space-between;
    @media (max-width: 450px) {
        flex-direction: column;
        margin: 0 0 ${toRem(16)};
    }
`;

export const MaxDiv = styled.div`
    @media (max-width: 550px) {
        display: none;
    }
`;
export const MinDiv = styled.div`
    margin-top: ${toRem(24)};
    @media (min-width: 550px) {
        display: none;
    }
`;

export const CarouselContainer = styled(Container)`
    padding: 0 ${toRem(96)} 0 ${toRem(96)};
    @media (max-width: 1365px) {
        padding: 0 ${toRem(48)};
    }
    @media (max-width: 1199px) {
        padding: 0 ${toRem(24)};
    }
`;
