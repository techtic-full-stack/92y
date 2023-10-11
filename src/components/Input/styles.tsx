import styled from 'styled-components';
// import { Input } from 'antd';
import { toRem } from '../utils';

export const StyledInput = styled.input`
    height: ${toRem(50)};
    width: ${toRem(446)};
    padding-left: ${toRem(20)};
    color: #555252;
    font-weight: 100;
    font-size: ${toRem(21)};
    text-align: left;
    letter-spacing: -2.2%;
    ::-webkit-input-placeholder {
        color: #555252;
    }
    :focus-visible {
        outline: none;
    }
    :-ms-input-placeholder {
        color: #555252;
    }
    @media (max-width: 1000px) {
        width: auto;
    }
`;
