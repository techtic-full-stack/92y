import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';
import { Typography } from 'antd';
import { toRem } from '../utils';
import theme from '../../theme';

export const BannerContainerStyle = styled.div`
    background: ${(props: any) => props.color || theme.navy.primary};
    &.class-catalog {
        padding: ${toRem(20)} 0 ${toRem(32)} 0;
        .catalog-btn {
            -ms-overflow-style: none;
            scrollbar-width: none;
            overflow-y: scroll;
            white-space: nowrap;
            display: flex;
            flex-flow: row;
            ::-webkit-scrollbar {
                display: none;
            }
            @media (max-width: 1245px) {
                padding-left: ${toRem(45)};
            }
            @media (max-width: 1199px) {
                padding-left: ${toRem(24)};
            }
        }
    }
`;

export const BannerStyled = styled.div`
    padding-right: ${toRem(48)};
    @media (max-width: 1199px) {
        padding-right: ${toRem(20)};
    }
`;

export const HeaderRightCol = styled(Col)`
    padding: 0;
    @media (max-width: 1199px) {
        padding: 0 ${toRem(12)};
    }
    > .header-text {
        padding: 0 ${toRem(10)} 0 ${toRem(48)};
        @media (max-width: 1199px) {
            padding-left: ${toRem(10)};
        }
        @media (max-width: 767px) {
            padding-top: ${toRem(32)};
        }
        font-family: 'roobertregular';
        h2 {
            font-size: ${toRem(56)};
            font-weight: 400;
            line-height: ${toRem(60)};
            color: ${theme.white};
            @media (max-width: 991px) {
                font-size: ${toRem(48)};
                line-height: 110%;
            }
            @media (max-width: 450px) {
                font-size: ${toRem(36)};
            }
        }
        h3 {
            font-size: ${toRem(24)};
            font-weight: 400;
            line-height: ${toRem(29)};
            letter-spacing: -0.022em;
            color: ${theme.white};
            @media (max-width: 991px) {
                font-size: ${toRem(48)};
            }
            @media (max-width: 450px) {
                font-size: ${toRem(36)};
            }
        }
        p {
            font-size: ${toRem(18)};
            line-height: ${toRem(24)};
            color: ${theme.white};
            margin-bottom: ${toRem(24)};
            max-width: ${toRem(611)};
            @media (max-width: 450px) {
                font-size: ${toRem(14)};
            }
        }
        button {
            a {
                color: inherit;
                text-decoration: none;
            }
        }
    }
`;

export const SubHeaderRow = styled(Row)`
    padding: ${toRem(80)} 0 ${toRem(81)} 0;
    @media (max-width: 767px) {
        padding: ${toRem(24)} 0 ${toRem(64)} 0;
    }
`;

export const BannerHeading = styled.h3`
    font-size: ${toRem(48)};
    line-height: 1.2;
    color: ${theme.white};
    font-style: normal;
    font-weight: normal;
    margin-bottom: 0;
    &.educator-heading {
        font-size: ${toRem(42)};
        font-weight: 500;
    }
    @media (max-width: 991px) {
        line-height: 110%;
    }
    @media (max-width: 450px) {
        font-size: ${toRem(35)};
    }
`;

export const BannerParaText = styled.p`
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    color: ${theme.white};
    opacity: 0.8;
    margin: ${toRem(16)} 0;
    @media (max-width: 450px) {
        font-size: ${toRem(16)};
    }
`;

export const CatalogueButtons = styled(Col)`
    display: contents;
    button {
        margin: 0 ${toRem(10)} ${toRem(8)} 0;
    }
`;

export const ClassDetailsStyled = styled.div`
    padding-right: ${toRem(23)};
    margin-right: ${toRem(50)};
    @media (max-width: 767px) {
        padding-right: 0 !important;
        margin-right: 0 !important;
    }
    .class-category {
        display: block;
        font-size: ${toRem(18)};
        line-height: ${toRem(24)};
        color: ${theme.white};
        margin-bottom: ${toRem(20)};
        @media (max-width: 450px) {
            font-size: ${toRem(16)};
        }
    }
    p {
        font-size: ${toRem(18)};
        line-height: ${toRem(24)};
        font-weight: 400;
        color: ${theme.white};
        @media (max-width: 450px) {
            font-size: ${toRem(16)};
        }
    }
    h2 {
        font-size: ${toRem(48)};
        font-weight: normal;
        line-height: ${toRem(57.6)};
        color: ${theme.white};
        margin-bottom: ${toRem(20)};
        @media (max-width: 1199px) {
            font-size: ${toRem(32)};
            line-height: ${toRem(32)};
        }
        @media (max-width: 450px) {
            font-size: ${toRem(38)};
            line-height: ${toRem(38)};
        }
    }
`;
export const LiveClassDetailsCol = styled(Col)`
    @media (max-width: 768px) {
        margin-bottom: ${toRem(25)};
    }
`;
export const ClassDetailsRow = styled(Row)`
    padding: ${toRem(40)} 0;
    .live-class-loading-col {
        .live-class-img,
        .live-class-img > span {
            width: 100%;
        }
    }
`;

export const AuthorDetail = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${toRem(20)};
    .author-img {
        width: ${toRem(48)};
        height: ${toRem(48)};
        span {
            border-radius: 50%;
        }
    }
    .author-text {
        margin-left: ${toRem(13)};
        h3 {
            margin-bottom: 0;
            font-weight: 700;
            font-size: ${toRem(18)};
            line-height: ${toRem(24)};
            color: ${theme.white};
            @media (max-width: 450px) {
                font-size: ${toRem(16)};
            }
        }
        p {
            margin-bottom: 0;
            font-size: ${toRem(14)};
            line-height: ${toRem(18)};
            color: ${theme.white};
            @media (max-width: 450px) {
                font-size: ${toRem(12)};
            }
        }
    }
`;

export const CollectionBannerStyle = styled.div`
    background: ${(props: any) => props.color || theme.navy.primary};
    padding: 0 0 ${toRem(34)} 0;
    margin-bottom: ${toRem(40)};
`;

export const ClassImgStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    > span {
        width: 100%;
    }
`;
export const LiveClassImgCol = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const CollectionRow = styled(Row)`
    padding: ${toRem(50)} 0 ${toRem(40)} 0;
`;

export const BannerBtnContainer = styled(Container)`
    font-family: 'roobertregular';
    padding: 0 ${toRem(96)} 0 ${toRem(96)};
    @media (max-width: 1365px) {
        padding: 0 ${toRem(48)};
    }
    @media (max-width: 1245px) {
        padding: 0;
    }
`;

export const HomeBannerTitle = styled(Typography.Title)`
    white-space: pre;
    margin-bottom: ${toRem(24)} !important;
`;

export const EnrollDiv = styled.div`
    display: flex;
    align-items: center;
    > span {
        margin-left: ${toRem(16)};
        font-size: ${toRem(14)};
        color: ${theme.white};
    }
`;
