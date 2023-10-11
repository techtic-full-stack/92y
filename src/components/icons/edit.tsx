/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import { FC } from 'react';

export const Edit: FC = () => {
    const EditIcon = () => (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3.75 21.5627V26.2502H8.4375L22.2625 12.4252L17.575 7.7377L3.75 21.5627ZM25.8875 8.8002C26.375 8.3127 26.375 7.5252 25.8875 7.0377L22.9625 4.1127C22.475 3.6252 21.6875 3.6252 21.2 4.1127L18.9125 6.4002L23.6 11.0877L25.8875 8.8002Z"
                fill="black"
            />
        </svg>
    );

    return <Icon component={EditIcon} />;
};
