import React from 'react';
import { theArts, history, foodCooking, literature, currentEvent, status, live, seats, Seatspan } from './styles';
import { TagProps } from './types';

const Tags: React.FC<TagProps> = ({ label, variant, bgColor }: TagProps) => {
    let DefaultTag = theArts;

    switch (variant) {
        case 'the-arts':
            DefaultTag = theArts;
            break;
        case 'history':
            DefaultTag = history;
            break;
        case 'food-cooking-drink':
            DefaultTag = foodCooking;
            break;
        case 'literature':
            DefaultTag = literature;
            break;
        case 'current-events-politics-economics':
            DefaultTag = currentEvent;
            break;
        case 'status':
            DefaultTag = status;
            break;
        case 'live':
            DefaultTag = live;
            break;
        case 'seats':
            DefaultTag = seats;
            break;
        default:
            DefaultTag = theArts;
            break;
    }

    return (
        <DefaultTag className={`badge text-wrap bg-${variant}`} color={bgColor}>
            {label}
            {DefaultTag === seats && label !== 'Sold Out' && <Seatspan>&nbsp;Left</Seatspan>}
        </DefaultTag>
    );
};

export default Tags;
