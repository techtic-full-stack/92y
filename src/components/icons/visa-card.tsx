/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import { FC } from 'react';

export const VisaCard: FC = () => {
    const VisaCardIcon = () => (
        <svg width="34" height="23" viewBox="0 0 34 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2.53067 0H31.3803C32.7974 0 33.9109 1.11349 33.9109 2.53067V20.2453C33.9109 21.6625 32.7974 22.776 31.3803 22.776H2.53067C1.11349 22.776 0 21.6625 0 20.2453V2.53067C0 1.11349 1.11349 0 2.53067 0ZM1.82208 5.56747H32.0889V2.53067C32.0889 2.12576 31.7852 1.82208 31.3803 1.82208H2.53067C2.12576 1.82208 1.82208 2.12576 1.82208 2.53067V5.56747ZM32.0889 7.38955H1.82208V20.2453C1.82208 20.6502 2.12576 20.9539 2.53067 20.9539H31.3803C31.7852 20.9539 32.0889 20.6502 32.0889 20.2453V7.38955Z"
                fill="black"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.57901 11.2363H13.5636C14.7784 11.2363 14.7784 13.0584 13.5636 13.0584H6.57901C5.36429 13.0584 5.36429 11.2363 6.57901 11.2363Z"
                fill="black"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.57901 14.9814H13.5636C14.7784 14.9814 14.7784 16.8035 13.5636 16.8035H6.57901C5.36429 16.8035 5.36429 14.9814 6.57901 14.9814Z"
                fill="black"
            />
        </svg>
    );

    return <Icon component={VisaCardIcon} />;
};
