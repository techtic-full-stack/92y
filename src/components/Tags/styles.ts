import styled from 'styled-components';
import theme from '../../theme';
import { toRem } from '../utils';

export const StyledTag = styled.span`
    font-style: normal;
    font-weight: 700;
    font-family: 'roobertbold';
    font-size: ${toRem(12)};
    line-height: ${toRem(20)};
    text-transform: uppercase;
    padding: 0 !important;
    border-radius: unset;
`;

export const theArts = styled(StyledTag)`
    color: ${theme.arts.primary} !important;
`;

export const history = styled(StyledTag)`
    color: ${theme.history.primary} !important;
`;

export const foodCooking = styled(StyledTag)`
    color: ${theme.foodCooking.primary} !important;
`;

export const literature = styled(StyledTag)`
    color: ${theme.literature.primary} !important;
`;

export const currentEvent = styled(StyledTag)`
    color: ${theme.blue.primary} !important;
`;
export const live = styled(StyledTag)`
    color: #555252 !important;
`;

export const status = styled(StyledTag)`
    background: ${(props) => props.color || theme.arts.primary} !important;
    display: inline-flex;
    padding: 0 ${toRem(4)} !important;
    color: ${theme.white};
    margin-right: ${toRem(6)};
`;

export const seats = styled(StyledTag)`
    background: ${(props) => props.color || theme.literature.secondary} !important;
    display: inline-flex;
    padding: 0 ${toRem(4)} !important;
    color: ${theme.black};
`;

export const Seatspan = styled.span`
    font-weight: 400;
    text-transform: capitalize;
    font-family: 'roobertregular';
`;
