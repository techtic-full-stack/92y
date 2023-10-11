import Icon from '@ant-design/icons';
import { FC } from 'react';

type BackArrowType = {
    arrowColor?: string;
};

export const BackArrow: FC<BackArrowType> = ({ arrowColor }) => {
    const ArrowBackOutlined = () => (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8 16L9.41 14.59L3.83 9L16 9L16 7L3.83 7L9.41 1.41L8 6.99382e-07L-6.99382e-07 8L8 16Z"
                fill={arrowColor || `black`}
            />
        </svg>
    );

    return <Icon component={ArrowBackOutlined} />;
};
