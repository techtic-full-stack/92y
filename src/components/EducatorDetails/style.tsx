import styled from 'styled-components';
import theme from '../../theme';
import { toRem } from '../utils';
import { Row } from 'antd';

type EducatorProps = {
    lowerBackground?: string;
    upperBackground?: string;
    background?: string;
    textcolor?: string;
};

export const EducatorDetailStyled = styled.div`
    background: ${theme.background.offWhite};
    .container {
        .main-heading {
            font-family: 'roobertregular';
            font-size: ${toRem(34)};
            line-height: ${toRem(38)};
            padding: ${toRem(40)} 0;
            @media (max-width: 767px) {
                padding: ${toRem(20)} 0 ${toRem(20)} 0;
            }
        }
        .ant-row {
            margin-bottom: ${toRem(24)};
            }
            .register-img-col {
                @media (max-width: 769px) {
                    width: 100%;
                }
                .register-img {
                    display: flex;
                    justify-content: end;
                    align-items: center;
                    @media (max-width: 768px) {
                        justify-content: center;
                    }
                    @media (max-width: 767px) {
                        //margin: 0 ${toRem(30)} ${toRem(30)};
                    }
                }
            }
            .register-text-col {
                padding: ${toRem(60)} ${toRem(129.94)} ${toRem(68)} ${toRem(82.88)};
                @media (max-width: 1025px) {
                    width: 100%;
                    padding: ${toRem(58)} ${toRem(25)} ${toRem(56)};
                    margin-bottom: 0;
                }
                @media (max-width: 767px) {
                    padding: ${toRem(30)} ${toRem(25)};
                    margin-bottom: 0;
                }
            }
        }
    }
`;

export const AuthorDetailStyled = styled.div<EducatorProps>`
    padding: ${toRem(40)} 0 0 0;
    @media (max-width: 767px) {
        padding: ${toRem(20)} 0 ${toRem(20)} 0;
    }
    background: linear-gradient(
        to top,
        ${(props) => props.lowerBackground} 0%,
        ${(props) => props.lowerBackground} 20%,
        ${(props) => props.upperBackground} 20%,
        ${(props) => props.upperBackground} 100%
    );
    .container {
        .book-title {
            font-size: ${toRem(18)};
            line-height: ${toRem(24)};
        }
        .book-year {
            font-size: ${toRem(14)};
            line-height: ${toRem(18)};
        }
    }
`;

export const AuthorBoxDiv = styled.div`
    background: ${theme.background.dark};
    padding: 0 ${toRem(58)} 0 ${toRem(82)};
    @media (max-width: 769px) {
        padding: 0 ${toRem(40)} 0;
    }
    @media (max-width: 450px) {
        padding: 0 ${toRem(15)} 0 ${toRem(20)};
    }
    .award-section {
        .awards-text {
            font-weight: 400;
            font-size: ${toRem(30)};
            line-height: ${toRem(34)};
            letter-spacing: ${toRem(-0.352)};
            @media (max-width: 767px) {
                font-size: ${toRem(28)};
                line-height: ${toRem(28)};
                padding-right: ${toRem(4)};
            }
        }
    }
    .book {
        padding: ${toRem(45)} 0;
        @media (max-width: 767px) {
            padding: ${toRem(45)} 0 0;
        }
        a {
            color: inherit;
        }
    }
    .award {
        padding-top: ${toRem(39)};
        padding-bottom: ${toRem(40)};
        @media (max-width: 767px) {
            padding-bottom: 0;
        }
    }
    .education {
        padding: ${toRem(32)} 0;
        img {
            object-fit: cover;
        }
    }
`;

export const AuthorSummaryStyled = styled.div`
    background: ${(props) => props.color || theme.arts.primary};
    padding: ${toRem(80)} 0;
    margin-top: ${toRem(80)};
    .ant-carousel {
        background: ${theme.background.dark};
    }
`;

export const AuthorBox = styled.div`
    background: ${theme.background.dark};
    padding: ${toRem(66.79)} ${toRem(53.27)} ${toRem(74)} ${toRem(118)};
    .desc {
        line-height: ${toRem(34)};
        letter-spacing: -0.022em;
        @media (max-width: 450px) {
            font-size: ${toRem(24)};
        }
    }
    .name {
        letter-spacing: -0.022em;
        @media (max-width: 450px) {
            font-size: ${toRem(18)};
        }
    }
    .title {
        font-style: italic;
        letter-spacing: -0.022em;
        @media (max-width: 450px) {
            font-size: ${toRem(12)};
        }
    }
    @media (max-width: 1025px) {
        padding: ${toRem(66.79)} ${toRem(40)} ${toRem(74)} ${toRem(60)};
    }
    @media (max-width: 450px) {
        padding: ${toRem(25)} ${toRem(20)} ${toRem(40)};
        min-height: ${toRem(230)};
    }
`;

export const AuthorBanner = styled.div``;

export const FeatureText = styled.p`
    white-space: pre-wrap;
`;

export const NoData = styled.div`
    font-size: ${toRem(28)};
    line-height: ${toRem(26)};
    margin-bottom: ${toRem(40)};
    letter-spacing: -0.022em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: ${toRem(400)};
    background: ${theme.background.dark};
`;

export const BookCardRow = styled(Row)`
    cursor: pointer;
`;
