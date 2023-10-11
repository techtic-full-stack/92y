/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import { FC } from 'react';

type CircleProps = {
    shapeColor?: string;
};

export const Circle: FC<CircleProps> = ({ shapeColor }) => {
    const CircleIcon = () => (
        <svg viewBox="0.1 0.3 316.5 316.5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M158.5 0H0V158.5V317H158.5H317V158.5V0H158.5ZM158.5 0C246.037 0 317 70.9629 317 158.5C317 246.037 246.037 317 158.5 317C70.9629 317 0 246.037 0 158.5C0 70.9629 70.9629 0 158.5 0Z"
                fill={shapeColor || 'white'}
            />
        </svg>
    );

    return <Icon component={CircleIcon} />;
};
