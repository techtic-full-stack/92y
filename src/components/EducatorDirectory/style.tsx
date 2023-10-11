import styled from 'styled-components';
import theme from '../../theme';
import { toRem } from '../utils';

export const DirectoryPage = styled.div`
    background: ${theme.background.dark};
    padding: ${toRem(40)} 0;
    .row {
        padding: 0 ${toRem(14)} ${toRem(24)} ${toRem(14)};
    }
    overflow-y: hidden;
`;
export const InfiniteScrollButton = styled.div`
    text-align: center !important;
    button {
        font-size: ${toRem(18)} !important;
        margin-top: ${toRem(26)};
        :hover {
            background: ${theme.navy.primary} !important;
            color: ${theme.white} !important;
            opacity: 0.7;
        }
        @media (max-width: 450px) {
            font-size: ${toRem(16)} !important;
        }
    }
`;
