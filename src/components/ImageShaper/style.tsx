import styled from 'styled-components';
import { toRem } from '../utils';

type MainImageContainerProps = {
    fillColor?: string;
};
export const MainImageContainer = styled.div<MainImageContainerProps>`
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
    width: fit-content;
    display: flex;
    > &:first-child {
        position: absolute !important;
    }
    span {
        img {
            position: relative;
        }
    }
    .Image {
        top: 0 !important;
        left: 0 !important;
    }
    .shapeImage {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;

        width: auto;

        .anticon {
            width: -webkit-fill-available;
            width: -moz-available;
        }
        background: ${(props) => props.fillColor};
    }
    .hexagonShape {
        top: -${toRem(1)} !important;
        left: -${toRem(1)} !important;
        right: -${toRem(1)} !important;
        bottom: -${toRem(1)} !important;
    }
    .eightShape {
        top: -${toRem(1)} !important;
        left: -${toRem(1)} !important;
        right: -${toRem(1.5)} !important;
        bottom: -${toRem(1)} !important;
    }
    .crossShape {
        right: -${toRem(1)} !important;
        top: -${toRem(0.5)} !important;
        bottom: -${toRem(1)} !important;
        left: -${toRem(1)} !important;
    }
    .circleShape {
        top: -${toRem(1)} !important;
        bottom: -${toRem(1)} !important;
        left: -${toRem(1)} !important;
        right: -${toRem(1)};
    }
`;
