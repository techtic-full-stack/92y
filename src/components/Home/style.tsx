import styled from 'styled-components';
import Image from 'next/image';
import theme from '../../theme';
import { toRem } from '../utils';

export const ClassesSectionStyle = styled.div`
    background-color: ${theme.background.offWhite};
`;

export const HomePageStyle = styled.div`
    background: ${theme.background.light};
    .container {
        div {
            &.midsection {
                padding: ${toRem(80)} ${toRem(80)} ${toRem(79)} ${toRem(77)};
                @media (max-width: 769px) {
                    padding: ${toRem(80)} ${toRem(20)};
                }
                @media (max-width: 500px) {
                    padding: ${toRem(80)} 0;
                }
            }
        }
    }
`;

export const EducatorClassesStyled = styled.div`
    padding: ${toRem(40)} 0 ${toRem(31)};
    .title {
        text-align: left;
        margin-bottom: ${toRem(39)};
        h1 {
            font-weight: 400 !important;
            font-size: ${toRem(34)};
            line-height: ${toRem(38)};
            @media (max-width: 991px) {
                line-height: 110%;
            }
        }
    }
    @media (max-width: 769px) {
        padding: ${toRem(25)} 0 ${toRem(50)};
    }
`;

export const ApplyBannerStyle = styled.div`
    background: ${theme.yellow.secondary};
    font-family: 'roobertregular';
    &.monthFeature {
        background: ${theme.background.offWhite};
        padding: ${toRem(50)} 0 ${toRem(90.5)};
        .container {
            .feature-collection-list-row {
                margin-top: ${toRem(45)} !important;
            }
        }
    }
`;

export const TeachWithUsContainer = styled.div`
    padding: ${toRem(64)} 0 ${toRem(9.008)};
    @media (max-width: 850px) {
        padding: ${toRem(9.008)} 0 ${toRem(9.008)};
    }
    .teach-with-us-container {
        @media (max-width: 767px) {
            display: flex;
            flex-direction: column-reverse;
        }
        .teach-with-us-text {
            .BannerTitle {
                padding-top: 0;
            }
            @media (max-width: 767px) {
                margin-bottom: ${toRem(12)};
            }
        }
        .img-container {
            .teach-with-us-img {
                @media (max-width: 767px) {
                    text-align: left;
                }
            }
        }
    }
`;

export const ApplyBannerTitle = styled.h2`
    padding: 0 0 ${toRem(20)};
    text-align: left;
    font-style: normal;
    font-weight: normal;
    font-size: ${toRem(48)};
    line-height: 1.2;
    margin: 0;
    max-width: ${toRem(601)};
    white-space: pre-wrap;
    @media (max-width: 991px) {
        font-size: ${toRem(40)};
        line-height: 110%;
    }
    @media (max-width: 767px) {
        padding-top: 0;
        font-size: ${toRem(35)};
    }
    @media (max-width: 450px) {
        padding-top: 0;
        font-size: ${toRem(30)};
    }
`;

export const ApplyBannerFeatureTitle = styled.h2`
    padding: ${toRem(15)} 0 ${toRem(10)};
    text-align: left;
    font-style: normal;
    font-weight: normal;
    font-size: ${toRem(48)};
    line-height: 1.2;
    margin: 0;
    @media (max-width: 991px) {
        line-height: 110%;
    }
    @media (max-width: 450px) {
        font-size: ${toRem(35)};
    }
`;

export const ApplyBannerText = styled.h6`
    margin-bottom: 0;
    max-width: ${toRem(596)};
    text-align: left;
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    padding-bottom: ${toRem(20)};
    @media (max-width: 767px) {
        font-size: ${toRem(16)};
    }
`;

export const ApplyBannerMonthTitle = styled.h6`
    font-style: normal;
    font-size: ${toRem(14)};
    line-height: ${toRem(18)};
    letter-spacing: 0.02em;
    margin: 0;
`;

export const ApplyBannerFeatureBody = styled.h6`
    font-style: normal;
    font-weight: normal;
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    margin-bottom: ${toRem(31)};
    @media (max-width: 450px) {
        font-size: ${toRem(16)};
    }
`;

export const EducatorsStyle = styled.div`
    background: ${theme.background.dark};
    align-item: center;
`;

export const EducatorContainer = styled.div`
    padding: ${toRem(40)} 0;
`;

export const EducatorHeading = styled.h3`
    font-size: ${toRem(34)};
    line-height: ${toRem(38)};
    margin-bottom: ${toRem(40)};
    text-align: center;
    @media (max-width: 991px) {
        line-height: 110%;
    }
    @media (max-width: 767px) {
        font-size: ${toRem(24)};
    }
    &.col-heading {
        font-size: ${toRem(43)};
        margin-bottom: 4%;
        line-height: 1.2;
        text-align: left;
        @media (max-width: 992px) {
            margin-bottom: ${toRem(35.008)};
        }
        @media (max-width: 767px) {
            font-size: ${toRem(28)};
        }
        @media (max-width: 450px) {
            font-size: ${toRem(25)};
        }
    }
`;

export const ImageDiv = styled.div`
    background: ${theme.background.light};
    text-align: center;
    padding: ${toRem(23)} ${toRem(33)} ${toRem(26)};
    width: 100%;
    height: 100%;
    min-height: ${toRem(325)};
    cursor: pointer;
`;

export const Images = styled(Image)`
    border-radius: 50%;
`;

export const EduInfo = styled.div`
    font-size: ${toRem(18)};
    line-height: ${toRem(20)};
    &.EduName {
        font-style: normal;
        font-weight: 400;
        color: ${theme.black};
        font-size: ${toRem(22)};
        line-height: ${toRem(26)};
        text-align: center;
        letter-spacing: -0.022em;
        margin: ${toRem(4)} 0;
        @media (max-width: 991px) {
            line-height: 110%;
        }
        @media (max-width: 450px) {
            font-size: ${toRem(20)};
        }
    }
    &.EduDetail {
        font-style: normal;
        font-weight: 400;
        color: ${theme.black};
        font-size: ${toRem(14)};
        line-height: ${toRem(18)};
        @media (max-width: 450px) {
            font-size: ${toRem(12)};
        }
    }
`;

export const EducatorText = styled.p`
    font-size: ${toRem(16)};
    line-height: 1.5;
    text-align: justify;
    opacity: 0.8;
    @media (max-width: 450px) {
        font-size: ${toRem(14)};
    }
`;

export const ImageText = styled.span`
    color: ${theme.white};
    font-size: ${toRem(12)};
    font-weight: bold;
    line-height: ${toRem(18)};
    letter-spacing: ${toRem(0.32)};
    text-align: center;
    position: absolute;
    top: ${toRem(76)};
    right: ${toRem(58)};
    &.lower {
        right: ${toRem(67)};
    }
`;
