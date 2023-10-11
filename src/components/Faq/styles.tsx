import styled from 'styled-components';
import theme from '../../theme';
import { toRem } from '../utils';

export const FaqHeading = styled.div`
    font-family: 'roobertbold';
    font-weight: 700;
    font-size: ${toRem(22)};
    line-height: ${toRem(32)};
    letter-spacing: -0.022em;
    color: ${theme.black};
    margin-bottom: ${toRem(8)};
    &.round-table {
        display: inline;
        line-height: normal;
    }
    @media (max-width: 450px) {
        font-size: ${toRem(18)};
    }
`;
export const FaqTitle = styled.div`
    font-size: ${toRem(22)};
    margin-bottom: ${toRem(10)};
    @media (max-width: 450px) {
        font-size: ${toRem(18)};
    }
`;
export const TermServiceBoxDiv = styled.div`
    padding: ${toRem(80)} ${toRem(214)};
    background: ${theme.background.light};
    @media (max-width: 1025px) {
        padding: ${toRem(80)} ${toRem(105)};
    }
    @media (max-width: 769px) {
        padding: ${toRem(80)} ${toRem(50)};
    }
    @media (max-width: 450px) {
        padding: ${toRem(80)} ${toRem(25)};
    }
`;
export const FaqDescription = styled.div`
    font-family: 'roobertregular';
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    color: ${theme.black};
    margin-bottom: ${toRem(24)};
    @media (max-width: 450px) {
        font-size: ${toRem(14)};
    }
`;
export const FaqUl = styled.ol``;

export const FaqLi = styled.li``;
