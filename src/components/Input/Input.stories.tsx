import React from 'react';
import { Story, Meta } from '@storybook/react';
import { InputProps } from './types';
import Input from './Input';

export default {
    component: Input,
    title: 'Input',
    argTypes: {
        placeholder: {
            defaultValue: 'Enter Name',
            control: { type: 'text' },
        },
        type: {
            defaultValue: 'text',
            control: { type: 'text' },
        },
    },
} as Meta;

const BDTemplate: Story<InputProps> = (props: InputProps) => <Input {...props} />;

export const TagTemplate = BDTemplate.bind({});
