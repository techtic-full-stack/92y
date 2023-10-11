import styled from 'styled-components';
import theme from '../../theme';
import { toEm, toRem } from '../utils';

type CheckboxStyledProps = {
    checkedColor?: string;
    textColor?: string;
    defaultTextColor?: string;
};

export const CheckLabel = styled.label<CheckboxStyledProps>`
    float: left;
    line-height: ${toEm(48)};
    font-size: ${toEm(14)};
    color: #4d4d4d;
    cursor: pointer;
    display: block;
    font-weight: 500;
    margin-bottom: ${toEm(3)};
    input + span {
        color: ${(props) => props.defaultTextColor || theme.black};
        font-weight: 400;
        font-size: ${toRem(14)};
        line-height: ${toEm(18)};
        font-family: 'roobertregular';
    }
    span {
        text-align: center;
        padding: ${toRem(14)} ${toRem(24)};
        display: block;
        line-height: normal;
        border-radius: ${toRem(30)};
        border: ${toRem(1)} solid ${(props) => props.defaultTextColor || theme.black};
    }
`;

export const CheckInput = styled.input<CheckboxStyledProps>`
    position: absolute;
    display: none;
    color: ${theme.white};
    ${(props) =>
        !props.disabled &&
        `&:hover {
        border: ${toRem(2)} solid;
        cursor: pointer;
    }`}
    ${(props) =>
        props.disabled &&
        `
        background-color: ${theme.yellow};
         border: ${toRem(2)} solid;
        `}
    &:checked + span {
        background-color: ${(props) => props.checkedColor || theme.white};
        color: ${(props) => props.textColor || theme.black} !important;
        border: ${toRem(1)} solid ${(props) => props.textColor || theme.black} !important;
    }
`;

export const CheckboxContainer = styled.div`
    background-color: transparent;
    border-radius: ${toRem(4)};
    overflow: hidden;
    float: left;
`;
