/* eslint-disable max-len */
import Icon from '@ant-design/icons';
import { FC } from 'react';

type DropDownArrowProps = {
    className?: string;
};

export const DropDownArrow: FC<DropDownArrowProps> = ({ className }) => {
    const DropDown = () => (
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.41 0.294922L6 4.87492L10.59 0.294922L12 1.70492L6 7.70492L0 1.70492L1.41 0.294922Z"
                fill="black"
            />
        </svg>
    );

    return <Icon component={DropDown} className={className} />;
};
