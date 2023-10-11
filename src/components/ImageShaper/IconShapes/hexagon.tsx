/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import { FC } from 'react';

type HexaProps = {
    shapeColor?: string;
};

export const Hexa: FC<HexaProps> = ({ shapeColor }) => {
    const HexaIcon = () => (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 132.668V0H133L0 132.668Z" fill={shapeColor || 'white'} />
            <path d="M400 267.332L400 400L267 400L400 267.332Z" fill={shapeColor || 'white'} />
        </svg>
    );

    return <Icon component={HexaIcon} />;
};
