/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import { FC } from 'react';

export const PopupCloseBtn: FC = () => {
    const PopupCloseBtnIcon = () => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" fill="white" />
            <path
                d="M31 18.41L29.59 17L24 22.59L18.41 17L17 18.41L22.59 24L17 29.59L18.41 31L24 25.41L29.59 31L31 29.59L25.41 24L31 18.41Z"
                fill="black"
            />
            <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="black" />
        </svg>
    );

    return <Icon component={PopupCloseBtnIcon} />;
};
