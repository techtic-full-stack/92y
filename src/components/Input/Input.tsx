import { FC } from 'react';
import { StyledInput } from './styles';
import { InputProps } from './types';

const Input: FC<InputProps> = ({ placeholder, fieldValue, type }) => {
    return <StyledInput placeholder={placeholder} value={fieldValue} type={type} />;
};

export default Input;
