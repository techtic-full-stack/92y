import React from 'react';

export type InputProps = React.ComponentProps<React.FC> & {
    placeholder: string;
    errorMessage?: string;
    required?: boolean;
    type?: string;
    label?: string;
    fieldValue?: string;
};
