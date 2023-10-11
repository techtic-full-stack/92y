import { Moment, MomentInput } from 'moment';
import moment from 'moment-timezone';
import { useMemo } from 'react';

export interface UseSessionTimeProps {
    date?: Moment;
    startTime: string;
    endTime: string;
    timeZone?: string;
}
export const toAdjustedDateTime = (date: Moment, time: Moment) => {
    return date.clone().set({
        hour: time.get('hour'),
        minute: time.get('minute'),
        second: time.get('second'),
    });
};

export const getDateRange = (startDate: MomentInput, endDate: MomentInput) => {
    if (startDate && endDate) {
        const startMonth = moment(startDate).format('MMMM');
        const endMonth = moment(endDate).format('MMMM');
        const startDay = moment(startDate).format('Do');
        const endDay = moment(endDate).format('Do');
        const isSameMonth = startMonth === endMonth;
        if (isSameMonth) {
            if (startDay === endDay) {
                return `${startMonth} ${startDay}`;
            } else {
                return `${startMonth} ${startDay} - ${endDay} `;
            }
        } else {
            return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
        }
    } else {
        return '';
    }
};

export const getSessionTimeRange = (startTime: MomentInput, endTime: MomentInput) => {
    const adjustedStartTime = moment(startTime);
    const adjustedEndTime = moment(endTime);
    const startMeridiem = adjustedStartTime.format('A');
    const endMeridiem = adjustedEndTime.format('A');
    const isSameMeridiem = startMeridiem === endMeridiem;
    const startFormatTemplate = isSameMeridiem ? 'h:mm' : 'h:mm A';
    const endFormatTemplate = 'h:mm A zz';

    return `${adjustedStartTime.format(startFormatTemplate)} - ${adjustedEndTime.format(endFormatTemplate)}`;
};

const useSessionTime = ({ date, startTime, endTime }: UseSessionTimeProps) => {
    return useMemo(() => {
        if (!date) return null;
        const adjustedStartTime = toAdjustedDateTime(date, moment(startTime, 'HH:mm:ss'));
        const adjustedEndTime = toAdjustedDateTime(date, moment(endTime, 'HH:mm:ss'));

        const formattedDay = date.format('dddd, MMMM Do');
        const timeRange = getSessionTimeRange(adjustedStartTime, adjustedEndTime);
        return {
            display: {
                day: formattedDay,
                timeRange,
            },

            startTime: adjustedStartTime,
            endTime: adjustedEndTime,
        };
    }, [date, startTime, endTime]);
};

export default useSessionTime;
