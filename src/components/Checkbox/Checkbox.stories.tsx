import { Meta, Story } from '@storybook/react';
import Checkbox from './index';
import { CheckboxProps } from './types';

export default {
    component: Checkbox,
    title: 'Checkbox',
    argTypes: {
        label: {
            defaultValue: 'Checkbox',
            control: { type: 'text' },
        },
        name: {
            defaultValue: 'checkbox',
        },
        checkedColor: {
            defaultValue: 'transparent',
            control: { type: 'text' },
        },
        textColor: {
            defaultValue: 'black',
            control: { type: 'text' },
        },
        defaultTextColor: {
            defaultValue: '#E8A175',
            control: { type: 'text' },
        },
    },
} as Meta;

export const Template: Story<CheckboxProps & { text: string }> = ({ text, ...props }) =>
    text ? <Checkbox {...props}>{text}</Checkbox> : <Checkbox {...props} />;
