import styled from 'styled-components';
import theme from '../../theme';
import { toRem } from '../utils';
export const TermServiceStyled = styled.div`
    background: linear-gradient(
        to top,
        ${theme.background.dark} 0%,
        ${theme.background.dark} 97%,
        ${theme.literature.primary} 97%,
        ${theme.literature.primary} 100%
    );
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
export const TermsHeading = styled.h4`
    font-family: 'roobertbold';
    font-weight: 700;
    font-size: ${toRem(22)};
    line-height: ${toRem(32)};
    letter-spacing: -0.022em;
    color: ${theme.black};
    @media (max-width: 450px) {
        font-size: ${toRem(18)};
    }
`;
export const TermsSubHeading = styled.h4`
    font-family: 'roobertbold';
    font-weight: 700;
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    letter-spacing: -0.022em;
    color: ${theme.black};
    @media (max-width: 450px) {
        font-size: ${toRem(14)};
    }
`;

export const TermsDescription = styled.p`
    font-family: 'roobertregular';
    font-size: ${toRem(18)};
    line-height: ${toRem(24)};
    color: ${theme.black};
    @media (max-width: 450px) {
        font-size: ${toRem(14)};
    }
`;
