import { StaticImageData } from 'next/image';
import React from 'react';

export enum ShapeType {
    hexagon = 'hexagon',
    cross = 'cross',
    eight = 'eight',
    circle = 'circle',
}

export type ShapeProps = React.ComponentProps<React.FC> & {
    shape?: ShapeType | string;
    image?: StaticImageData | string;
    shapeColor?: string;
    fillColor?: string;
    onLoad?: any;
};
