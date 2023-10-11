/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import { FC } from 'react';

export const Menu: FC = () => {
    const MenuIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#ffffff">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
    );

    return <Icon component={MenuIcon} />;
};
