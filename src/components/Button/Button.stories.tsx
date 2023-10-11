import { Meta, Story } from '@storybook/react';
import { ButtonProps } from './types';
import Button from './Button';

export default {
    component: Button,
    title: 'Button',
    argTypes: {
        text: {
            defaultValue: 'Button',
            control: { type: 'text' },
        },
        bgcolor: { control: 'color' },
        color: { control: 'color' },
        type: {
            defaultValue: 'primary',
            options: ['primary', 'secondary'],
            control: { type: 'select' },
        },
        active: {
            defaultValue: false,
        },
        leftIcon: {
            defaultValue: false,
        },
        rightIcon: {
            defaultValue: false,
        },
    },
} as Meta;

export const Template: Story<ButtonProps & { text: string }> = ({ text, ...props }) =>
    text ? <Button {...props}>{text}</Button> : <Button {...props} />;
