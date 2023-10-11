/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import React, { FC } from 'react';

export const Close: FC<React.HTMLAttributes<HTMLElement>> = (props) => {
    const CloseIcon = () => (
        <svg width="25" height="25" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14 1.30929L12.59 0L7 5.19071L1.41 0L0 1.30929L5.59 6.5L0 11.6907L1.41 13L7 7.80929L12.59 13L14 11.6907L8.41 6.5L14 1.30929Z"
                fill="currentColor"
            />
        </svg>
    );

    return <Icon {...props} component={CloseIcon} />;
};
