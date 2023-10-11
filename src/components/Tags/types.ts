import React from 'react';

export enum TagType {
    theArts = 'the-arts',
    history = 'history',
    foodCooking = 'food-cooking-drink',
    literature = 'literature',
    currentEvent = 'current-events-politics-economics',
    status = 'status',
    live = 'live',
    seats = 'seats',
}

export type TagProps = React.ComponentProps<React.FC> & {
    variant?: TagType | string;
    label?: string;
    bgColor?: string;
};
