/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import { FC } from 'react';

type CrossProps = {
    shapeColor?: string;
};

export const Cross: FC<CrossProps> = ({ shapeColor }) => {
    const CrossIcon = () => (
        <svg viewBox="0.2 0.1 185.6 185.6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="186" height="186" fill="none" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M138.638 0H0V186H186V138.799C185.97 150.881 181.346 162.953 172.128 172.171C153.631 190.617 123.643 190.617 105.147 172.121L93.0196 160.001L80.9053 172.122C62.4086 190.618 32.4208 190.618 13.9241 172.122C-4.62293 153.626 -4.62293 123.639 13.8737 105.143L25.9981 93.0188L13.8727 80.9005C-4.62392 62.4044 -4.62392 32.4176 13.8727 13.9216C32.3694 -4.57446 62.3572 -4.57446 80.8539 13.9216L92.9759 26.0432L105.147 13.872C114.396 4.62401 126.517 0 138.638 0ZM186 47.0345C185.918 35.023 181.294 23.0369 172.129 13.872C162.88 4.62401 150.759 0 138.638 0H186V47.0345ZM186 47.6884C185.918 59.6999 181.294 71.6861 172.129 80.8509L159.96 93.0255L172.128 105.192C181.346 114.41 185.97 126.483 186 138.564V47.6884Z"
                fill={shapeColor || 'white'}
            />
        </svg>
    );

    return <Icon component={CrossIcon} />;
};
