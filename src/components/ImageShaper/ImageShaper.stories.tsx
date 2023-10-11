import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ShapeProps, ShapeType } from './types';
import ImageShaper from './ImageShaper';

export default {
    component: ImageShaper,
    title: 'ImageShaper',
    argTypes: {
        shape: {
            options: ShapeType,
            control: { type: 'select' },
        },
        image: {
            control: { type: 'file' },
        },
    },
} as Meta;

const BDTemplate: Story<ShapeProps> = (props: ShapeProps) => <ImageShaper {...props} />;

export const ImageTemplate = BDTemplate.bind({});
