import styled from 'styled-components';
import { Form } from 'antd';
import { toRem } from '../utils';
import theme from '../../theme';
import { Row, Container } from 'react-bootstrap';
import { BannerContainerStyle, HeaderRightCol } from '@components/Banner/style';

type OnBoardingContainerStyleProps = {
    loading?: string;
};

export const StyledForm = styled(Form)`
    padding-bottom: ${toRem(22)};
`;

export const OnboardRow = styled.div`
    > * {
        padding: ${toRem(30)} 0 0 0;
    }
    font-size: ${toRem(14)};
    line-height: ${toRem(18)};
    margin-bottom: ${toRem(40)};
    .btnCol {
        margin-top: ${toRem(79)};
    }
`;

export const SubHeading = styled.h5`
    font-family: 'roobertregular';
    font-weight: 700;
    font-size: 12px;
    line-height: 32px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #ffffff;
    opacity: 0.5;
    margin-bottom: ${toRem(32)};
`;

export const ErrorMessage = styled.p`
    color: red !important;
    margin-bottom: ${toRem(16)} !important;
    margin-top: 0 !important;
    max-width: ${toRem(374)} !important;
`;

export const CustomLabel = styled.label`
    font-weight: bold;
    font-size: ${toRem(12)};
    line-height: normal;
    letter-spacing: ${toRem(0.32)};
    text-transform: uppercase;
    color: ${theme.white};
    margin-bottom: ${toRem(4)};
    @media (max-width: 768px) {
        display: block;
        width: 100%;
    }
`;

export const FormDiv = styled.div`
    display: table-caption;
    width: 100%;
    margin-top: ${toRem(16)};
    form {
        input {
            margin-bottom: ${toRem(16)};
            border: none;
        }
        .forgot-password {
            font-size: ${toRem(18)};
            display: flex;
            justify-content: flex-end;
        }
    }
    .reset-form {
        margin-top: ${toRem(40)};
    }
    .material-icons-outlined {
        color: black !important;
        float: right;
        margin-right: ${toRem(10)};
        margin-top: -${toRem(52)};
        position: relative;
        cursor: pointer;
        z-index: 2;
    }
    @media (max-width: 768px) {
        display: inline-block;
        width: 100%;
    }
    &.profile-info {
        display: inline-block !important;
        width: 100%;
        input {
            width: 100%;
        }
    }
`;

export const CustomInput = styled.input`
    height: ${toRem(48)};
    width: ${toRem(375)};
    padding: 0 ${toRem(36)} 0 ${toRem(20)};
    color: #555252;
    font-weight: 100;
    font-size: ${toRem(18)};
    text-align: left;
    letter-spacing: -2.2%;
    &.not-allowed-input {
        :hover {
            cursor: not-allowed;
        }
    }
    ::-webkit-input-placeholder {
        color: #555252;
    }
    :focus-visible {
        outline: none;
    }
    :-ms-input-placeholder {
        color: rgba(0, 0, 0, 0.5);
    }
    // @media (max-width: 1000px) {
    //     width: auto;
    // }
    @media (max-width: 768px) {
        width: 100% !important;
    }
`;

export const OnBoardingContainerStyle = styled(BannerContainerStyle)<OnBoardingContainerStyleProps>`
    pointer-events: ${(props) => (props.loading === 'true' ? 'none;' : `inherit;`)} 
    opacity: ${(props) => (props.loading === 'true' ? '0.8;' : `1;`)} 
    min-height: ${toRem(595)};
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 767px) {
        height: auto;
    }
`;

export const OnBoardingSubHeaderRow = styled(Row)`
    align-items: center;
`;

export const OnBoardingHeaderCol = styled(HeaderRightCol)`
    > .onboardingText {
        span {
            color: ${theme.white};
        }
        .sub-header {
            font-size: ${toRem(18)};
            line-height: ${toRem(24)};
        }
        .btnChkBx {
            padding: 0;
            span {
                margin: ${toRem(22)} ${toRem(10)} 0 0;
            }
        }
        .thirdPage {
            margin: ${toRem(24)} 0 ${toRem(16)};
        }
        h3 {
            padding: 0;
            margin: ${toRem(40)} 0 0 0;
            font-size: ${toRem(24)};
            line-height: ${toRem(29)};
            letter-spacing: -0.022em;
        }
    }
    > .onboarding-1 {
        span {
            color: ${theme.white};
        }
        .sub-header {
            font-size: ${toRem(21)};
            line-height: ${toRem(25)};
        }
        .reset-sub-header {
            font-size: ${toRem(21)};
            line-height: ${toRem(23)};
            margin-bottom: ${toRem(40)};
        }
        .forgot-sub-header {
            font-size: ${toRem(21)};
            line-height: ${toRem(25)};
            max-width: ${toRem(375)};
            padding: 0 ${toRem(18)};
            margin-bottom: ${toRem(40)};
        }

        h2 {
            margin-bottom: ${toRem(4)};
        }
    }
    > .onboarding-header-text {
        > .signUpHeading {
            font-family: 'roobertbold';
            font-size: ${toRem(30)};
            font-weight: 700;
            line-height: ${toRem(34)};
            letter-spacing: ${toRem(1)};
            color: ${theme.white};
            margin: 0;
            @media (max-width: 991px) {
                font-size: ${toRem(38)};
                line-height: 110%;
            }
            @media (max-width: 450px) {
                font-size: ${toRem(26)};
            }
        }
        padding: 0 ${toRem(10)} 0 ${toRem(24)};
        @media (max-width: 1199px) {
            padding-left: ${toRem(10)};
        }
        @media (max-width: 768px) {
            padding-top: ${toRem(32)};
        }
        @media (max-width: 444px) {
            input {
                width: inherit;
            }
            padding-top: ${toRem(32)};
        }
        font-family: 'roobertregular';
        h2 {
            font-size: ${toRem(48)};
            font-weight: 400;
            line-height: ${toRem(57.6)};
            letter-spacing: -${toRem(1)};
            color: ${theme.white};
            margin-bottom: ${toRem(9)};
            @media (max-width: 991px) {
                font-size: ${toRem(38)};
                line-height: 110%;
            }
            @media (max-width: 450px) {
                font-size: ${toRem(34)};
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
            margin-top: ${toRem(18)};
            margin-bottom: ${toRem(37)};
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

export const MembershipHeaderCol = styled(OnBoardingHeaderCol)`
    h2,
    span {
        color: ${theme.navy.primary} !important;
    }
`;

export const ContainerStyle = styled(Container)`
    padding: ${toRem(24)};
    font-family: 'roobertregular';
    @media (max-width: 1365px) {
        padding: ${toRem(40)};
    }
    @media (max-width: 1199px) {
        padding: 0 ${toRem(28)};
    }
    @media (max-width: 786px) {
        padding: ${toRem(28)};
    }
    &.forgot {
        padding: ${toRem(64)} ${toRem(24)};
    }
`;

export const MemberShipModalContainer = styled(ContainerStyle)`
    padding: ${toRem(60)};
    text-align: center;
`;

export const OnboardingBannerStyled = styled.div`
    padding-right: ${toRem(12)};
    @media (max-width: 1199px) {
        padding-right: ${toRem(20)};
    }
`;

export const FormFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${toRem(12)};
    font-size: ${toRem(18)};
    @media (max-width: 767px) {
        button {
            display: inline-flex !important;
        }
    }
`;

export const FormFooterDiv = styled.div`
    display: flex;
    flex-direction: column;
    span {
        line-height: ${toRem(24)};
        font-size: ${toRem(18)};
    }
`;

export const LoginFooter = styled(FormFooterDiv)`
    margin-top: ${toRem(43)};
`;
export const Screen2Text = styled.div`
    text-align: justify;
    color: ${theme.white};
    @media (max-width: 450px) {
        font-size: ${toRem(12)};
    }
`;
export const CustomNameLabel = styled(Row)`
    input {
        width: 100% !important;
    }
`;
export const CustomInfoLavel = styled.div`
    font-family: 'roobertregular';
    font-size: ${toRem(12)};
    line-height: ${toRem(16)};
    color: ${theme.white};
    overflow-wrap: break-word;
    margin-top: ${toRem(-10)};
    margin-bottom: ${toRem(12)};
`;
