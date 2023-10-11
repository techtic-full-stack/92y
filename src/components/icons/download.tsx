/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import { FC } from 'react';

export const Download: FC = () => {
    const DownloadIcon = () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0.714844 15V16.4286C0.714844 17.1863 1.01586 17.9131 1.55168 18.4489C2.0875 18.9847 2.81423 19.2857 3.57199 19.2857H16.4291C17.1869 19.2857 17.9136 18.9847 18.4494 18.4489C18.9853 17.9131 19.2863 17.1863 19.2863 16.4286V15"
                stroke="black"
                strokeWidth="1.42857"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.71484 8.57129L10.0006 13.5713L14.2863 8.57129"
                stroke="black"
                strokeWidth="1.42857"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 13.571V0.713867"
                stroke="black"
                strokeWidth="1.42857"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    return <Icon component={DownloadIcon} />;
};
