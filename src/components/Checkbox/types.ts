import { ComponentPropsWithoutRef } from 'react';

export type CheckboxProps = ComponentPropsWithoutRef<'input'> & {
    name?: string;
    label: string;
    value?: string;
    disabled?: boolean;
    checked?: boolean;
    checkedColor?: string;
    textColor?: string;
    defaultTextColor?: string;
};
