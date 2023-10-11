/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import { FC } from 'react';

type EightProps = {
    shapeColor?: string;
};

export const Eight: FC<EightProps> = ({ shapeColor }) => {
    const EightIcon = () => (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M100.2 0H0V100.267V299.732V400H400V299.732V100.267V0H299.8C355.139 0 400 44.928 400 100.267C400 152.093 360.654 194.788 310.203 199.999C360.654 205.211 400 247.906 400 299.732C400 355.07 355.139 399.998 299.8 399.998H100.2C44.8609 399.998 0 355.07 0 299.732C0 247.906 39.3464 205.211 89.7969 199.999C39.3464 194.788 0 152.093 0 100.267C0 44.928 44.8609 0 100.2 0Z"
                fill={shapeColor || 'white'}
            />
        </svg>
    );

    return <Icon component={EightIcon} />;
};
