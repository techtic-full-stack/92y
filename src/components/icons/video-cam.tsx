/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import { FC } from 'react';

type VideoCamType = {
    camColor?: string;
};

export const VideoCam: FC<VideoCamType> = ({ camColor }) => {
    const VideoCamIcon = () => (
        <svg width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.5 4.5V1C14.5 0.45 14.05 0 13.5 0H1.5C0.95 0 0.5 0.45 0.5 1V11C0.5 11.55 0.95 12 1.5 12H13.5C14.05 12 14.5 11.55 14.5 11V7.5L18.5 11.5V0.5L14.5 4.5Z"
                fill={camColor || `black`}
            />
        </svg>
    );

    return <Icon component={VideoCamIcon} />;
};
