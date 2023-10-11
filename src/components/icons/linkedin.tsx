/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import { FC } from 'react';

export const LinkedIn: FC = () => {
    const LinkedInIcon = () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.47327e-07 1.67091C2.47327e-07 1.22776 0.176042 0.802756 0.489398 0.4894C0.802754 0.176044 1.22776 2.22756e-06 1.67091 2.22756e-06H18.3273C18.5469 -0.000356456 18.7644 0.0426049 18.9674 0.126426C19.1704 0.210248 19.3548 0.333284 19.5102 0.48849C19.6656 0.643696 19.7888 0.828024 19.8729 1.03092C19.9569 1.23382 20.0001 1.4513 20 1.67091V18.3273C20.0002 18.5469 19.9572 18.7645 19.8732 18.9675C19.7893 19.1705 19.6662 19.3549 19.5109 19.5103C19.3556 19.6656 19.1713 19.7889 18.9683 19.8729C18.7654 19.9569 18.5478 20.0001 18.3282 20H1.67091C1.45141 20 1.23405 19.9568 1.03127 19.8727C0.828487 19.7887 0.644247 19.6655 0.489077 19.5103C0.333906 19.355 0.210847 19.1707 0.12693 18.9679C0.0430121 18.7651 -0.000119178 18.5477 2.47327e-07 18.3282V1.67091ZM7.91636 7.62546H10.6245V8.98546C11.0155 8.20364 12.0155 7.5 13.5182 7.5C16.3991 7.5 17.0818 9.05727 17.0818 11.9145V17.2073H14.1664V12.5655C14.1664 10.9382 13.7755 10.02 12.7827 10.02C11.4055 10.02 10.8327 11.01 10.8327 12.5655V17.2073H7.91636V7.62546ZM2.91636 17.0827H5.83273V7.5H2.91636V17.0818V17.0827ZM6.25 4.37455C6.2555 4.62425 6.21107 4.87254 6.11931 5.10483C6.02755 5.33713 5.89032 5.54876 5.71566 5.7273C5.54101 5.90585 5.33245 6.0477 5.10223 6.14455C4.87201 6.2414 4.62476 6.29129 4.375 6.29129C4.12524 6.29129 3.87799 6.2414 3.64777 6.14455C3.41755 6.0477 3.20899 5.90585 3.03433 5.7273C2.85968 5.54876 2.72245 5.33713 2.63069 5.10483C2.53893 4.87254 2.4945 4.62425 2.5 4.37455C2.51079 3.88441 2.71308 3.41799 3.06353 3.07517C3.41399 2.73235 3.88475 2.54038 4.375 2.54038C4.86525 2.54038 5.33601 2.73235 5.68647 3.07517C6.03692 3.41799 6.23921 3.88441 6.25 4.37455Z"
                fill="white"
            />
        </svg>
    );
    return <Icon component={LinkedInIcon} />;
};
