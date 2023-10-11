import { FC, isValidElement } from 'react';
import { ButtonProps } from './types';
import { StyledButton, LeftIconContainer, RightIconContainer } from './style';
import { RightArrow } from '../icons/right-arrow';

const Button: FC<ButtonProps> = ({
    children,
    bgcolor,
    color,
    type,
    btnType,
    lg,
    active,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    rightIconColor,
    ...props
}) => {
    return (
        <StyledButton
            className={(type === `secondary` && `secondary`) || (active && 'active') || (lg && 'lg')}
            type={btnType ? btnType : 'button'}
            style={{ backgroundColor: bgcolor, color }}
            {...props}
        >
            {!!LeftIcon && (
                <LeftIconContainer>
                    <LeftIcon />
                </LeftIconContainer>
            )}

            {children}

            {!!RightIcon && (
                <RightIconContainer>
                    {isValidElement(RightIcon) ? RightIcon : <RightArrow arrowColor={rightIconColor} />}
                </RightIconContainer>
            )}
        </StyledButton>
    );
};

export default Button;
