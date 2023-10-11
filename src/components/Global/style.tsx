import styled from 'styled-components';
import { toRem } from '../utils';
import { Container } from 'react-bootstrap';

export const GlobalContainerStyle = styled(Container)`
    padding: 0 ${toRem(96)};
    font-family: 'roobertregular';
    @media (max-width: 1365px) {
        padding: 0 ${toRem(48)};
    }
    @media (max-width: 1199px) {
        padding: 0 ${toRem(24)};
    }
`;
