import { FC } from 'react';
import { CheckboxProps } from './types';
import { CheckInput, CheckLabel, CheckboxContainer } from './styles';

const Checkbox: FC<CheckboxProps> = ({
    label,
    name,
    value,
    onChange,
    checked,
    disabled,
    defaultTextColor,
    ...props
}) => {
    const id = `${name}Checkbox`;
    return (
        <CheckboxContainer>
            <CheckLabel defaultTextColor={defaultTextColor}>
                <CheckInput
                    type="checkbox"
                    value={value}
                    onChange={onChange}
                    checked={checked}
                    disabled={disabled}
                    id={id}
                    {...props}
                />
                <span>{label}</span>
            </CheckLabel>
        </CheckboxContainer>
    );
};

export default Checkbox;
