import { ElementType } from 'react';
import { ButtonProps as ReactButtonProps } from 'react-bootstrap';

export type ButtonProps = ReactButtonProps & {
    bgcolor?: string;
    color?: string;
    type?: string;
    btnType?: string;
    active?: boolean;
    rightIconColor?: string;
    lg?: boolean;
    rightIcon?: ElementType | boolean;
    leftIcon?: ElementType;
};
