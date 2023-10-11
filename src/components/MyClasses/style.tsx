import styled from 'styled-components';
import theme from 'theme';
import { toRem } from '../utils';
import { Row, Col } from 'antd';

export const MyClassesStyled = styled.div`
    &.details {
        background: linear-gradient(
            to top,
            ${theme.background.offWhite} 0%,
            ${theme.background.offWhite} 40%,
            ${theme.navy.primary} 40%,
            ${theme.navy.primary} 100%
        );
    }
    &.resources {
        padding-bottom: ${toRem(40)};
        .container {
            .main-heading {
                padding-top: ${toRem(20)};
            }
            .schedule {
                padding-top: ${toRem(80)};
            }
            .header {
                font-size: ${toRem(18)};
                font-weight: 700;
                color: ${theme.black};
                line-height: ${toRem(24)};
                padding: ${toRem(40)} 0;
                text-transform: uppercase;
            }
            .completed {
                border-top: ${toRem(1)} solid ${theme.black};
            }
        }
        .bookResource {
            padding: ${toRem(20)} 0 0 0 !important;
            background: ${theme.background.offWhite};
            .container {
                padding: 0 ${toRem(13)};
            }
        }
    }
    &.inprogress {
        padding-top: ${toRem(90)};
        background: linear-gradient(
            to top,
            ${theme.background.offWhite} 0%,
            ${theme.background.offWhite} 45%,
            ${theme.navy.primary} 45%,
            ${theme.navy.primary} 100%
        );
        .container {
            .ant-row {
                margin-top: 0;
            }
        }
    }
    background: ${theme.background.offWhite};
    .container {
        .main-heading {
            font-family: 'roobertregular';
            font-size: ${toRem(34)};
            line-height: ${toRem(38)};
            padding: ${toRem(40)} 0 ${toRem(20)} 0;
            @media (max-width: 450px) {
                font-size: ${toRem(28)};
            }
        }
        .banner {
            color: ${theme.white};
            cursor: pointer;
            font-size: ${toRem(22)};
            line-height: ${toRem(26)};
            letter-spacing: -0.022em;
            padding: ${toRem(40)} 0 0 0;
        }
    }
`;

export const ClassesCardRow = styled(Row)`
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

export const RegisterCardDiv = styled.div`
    padding: ${toRem(30)} ${toRem(36.91)} ${toRem(22)} ${toRem(28)};
    .register-text-row {
        flex-flow: column;
        .timing {
            margin-bottom: ${toRem(14.5)};
        }
        .title-col {
            max-width: none !important;
            min-height: ${toRem(120)};
            margin-bottom: ${toRem(36)};
        }
        .view-link {
            button {
                padding: 0;
                font-size: ${toRem(18)};
                font-weight: bold;
                line-height: ${toRem(24)};
            }
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

export const RegisterStatusCol = styled(Col)`
    display: inline-flex;
    align-items: center;
    .ant-row {
        row-gap: ${toRem(10)} !important;
    }
    span {
        margin-right: ${toRem(8)};
    }
    @media (max-width: 450px) {
        margin-bottom: ${toRem(10)};
    }
`;

export const HeadingCol = styled(Col)`
    .heading-text {
        font-size: ${toRem(34)};
        line-height: ${toRem(38)};
        font-weight: 400;
        margin-bottom: 0;
        @media (max-width: 450px) {
            font-size: ${toRem(28)};
        }
    }
    margin-bottom: ${toRem(35)};
    max-width: none !important;
`;

export const DownloadStyle = styled.div`
    background: ${theme.background.dark};
    display: flex;
    justify-content: space-between;
    font-size: ${toRem(22)};
    line-height: ${toRem(26)};
    letter-spacing: -0.022em;
    color: ${theme.black};
    padding: ${toRem(27)} ${toRem(50)} ${toRem(27)} ${toRem(45)};
    margin: 0 0 ${toRem(8)} 0;
    @media (max-width: 450px) {
        font-size: ${toRem(20)};
        padding: ${toRem(27)} ${toRem(20)} ${toRem(27)} ${toRem(20)};
    }
    .anticon {
        cursor: pointer;
    }
`;

export const ScheduleRow = styled(Row)`
    padding-bottom: ${toRem(40)};
    justify-content: space-between;
    @media (max-width: 767px) {
        /* gap: ${toRem(15)}; */
        .ant-col {
            margin-bottom: ${toRem(10)};
        }
    }
`;

export const LectureNameCol = styled(Col)`
    font-size: ${toRem(22)};
    line-height: ${toRem(26)};
    letter-spacing: -0.022em;
    color: ${theme.black};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: ${toRem(18)};
    @media (max-width: 625px) {
        font-size: ${toRem(20)};
    }
`;

export const LectureTimeCol = styled(Col)`
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    color: ${theme.black};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media (max-width: 625px) {
        font-size: ${toRem(16)};
    }
    @media (max-width: 576px) {
        justify-content: flex-start;
    }
`;

export const NoClasses = styled.div`
    font-size: ${toRem(28)};
    line-height: ${toRem(26)};
    letter-spacing: -0.022em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: ${toRem(300)};
    background: ${theme.background.dark};
    margin-bottom: ${toRem(40)};
`;
