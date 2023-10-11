import { MomentInput } from 'moment';
import moment from 'moment-timezone';
import stringToJSX from 'react-string-replace';
import { ShapeType } from './ImageShaper/types';

const FONT_BASE_SIZE = 16;
const toSizing = (pixels: number[], sizing: string) => pixels.map((p) => `${p / FONT_BASE_SIZE}${sizing}`).join(' ');

export const toEm = (...pixels: number[]): string => toSizing(pixels, 'em');
export const toRem = (...pixels: number[]): string => toSizing(pixels, 'rem');

export const convertToSlug = (text: string) => {
    return text
        ?.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

export const convertToString = (text: string) => {
    return text
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
};

export interface GetCourseTimeComponentsArgs {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}

export const toMoment = (time: MomentInput, format?: string) => moment(time, format).tz(moment.tz.guess());
export const timeToMoment = (time: string) => {
    if (time.endsWith('+00')) {
        return toMoment(time.replace('+00', ''), 'HH:mm:ss');
    }
    return toMoment(time);
};
export const getCourseTimeDisplay = (startTime: MomentInput, endTime: MomentInput) => {
    const adjustedStartTime = typeof startTime === 'string' ? timeToMoment(startTime) : toMoment(startTime);
    const adjustedEndTime = typeof endTime === 'string' ? timeToMoment(endTime) : toMoment(endTime);
    adjustedEndTime.tz(moment.tz.guess());
    adjustedStartTime.tz(moment.tz.guess());
    const startMeridiem = adjustedStartTime.format('A');
    const endMeridiem = adjustedEndTime.format('A');
    const isSameMeridiem = startMeridiem === endMeridiem;
    const startFormatTemplate = isSameMeridiem ? 'h:mm' : 'h:mm A';
    const endFormatTemplate = 'h:mm A';
    let timezone = adjustedEndTime.format('zz');
    if (!isNaN(parseInt(timezone))) {
        timezone = `GMT${timezone}`;
    }

    return `${adjustedStartTime.format(startFormatTemplate)} - ${adjustedEndTime.format(
        endFormatTemplate,
    )} ${timezone}`;
};

export const getCourseDateDisplay = (startDate: string, endDate: string) => {
    const adjustedStartDate = toMoment(startDate);
    const adjustedEndDate = toMoment(endDate);
    let dateDisplay = adjustedStartDate.format('dddd, Do');
    if (!adjustedStartDate.isSame(adjustedEndDate, 'day')) {
        dateDisplay = adjustedStartDate.format('dddd, MMMM Do - ');
        let format = 'MMMM Do';
        if (adjustedStartDate.isSame(adjustedEndDate, 'month')) {
            format = 'Do';
        }
        dateDisplay = `${dateDisplay}${adjustedEndDate.format(format)}`;
    } else {
        dateDisplay = adjustedStartDate.format('dddd, MMMM Do');
    }
    return dateDisplay;
};
export const getCourseCardDateDisplay = (startDate: string, endDate: string) => {
    const adjustedStartDate = toMoment(startDate);
    const adjustedEndDate = toMoment(endDate);
    let dateDisplay = adjustedStartDate.format('ddd, M/D');
    if (!adjustedStartDate.isSame(adjustedEndDate, 'day')) {
        dateDisplay = adjustedStartDate.format('ddd, M/D-');
        let format = 'M/D';
        if (adjustedStartDate.isSame(adjustedEndDate, 'month')) {
            format = 'M/D';
        }
        dateDisplay = `${dateDisplay}${adjustedEndDate.format(format)}`;
    } else {
        dateDisplay = adjustedStartDate.format('ddd, M/D');
    }
    return dateDisplay;
};
export const getCourseTimeDisplayComponents = (
    { startDate, endDate, startTime, endTime }: GetCourseTimeComponentsArgs,
    cardDate?: string,
) => {
    const timeDisplay = startTime ? getCourseTimeDisplay(startTime, endTime) : '';
    const dateDisplay = startDate
        ? cardDate === 'cardDate'
            ? getCourseCardDateDisplay(startDate, endDate)
            : getCourseDateDisplay(startDate, endDate)
        : '';
    const combinedDisplay = startTime && startDate ? `${dateDisplay}, ${timeDisplay}` : '';
    return { dateDisplay, timeDisplay, combinedDisplay };
};

function clearNumber(value = '') {
    return value.replace(/\D+/g, '');
}

export function formatExpirationDate(value: string) {
    const clearValue = clearNumber(value);

    if (clearValue.length >= 3) {
        return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }

    return clearValue;
}

export function formatCVC(value: string) {
    const clearValue = clearNumber(value);
    const maxLength = 3;

    return clearValue.slice(0, maxLength);
}

export function formatZIP(value: string) {
    const clearValue = clearNumber(value);
    const maxLength = 10;

    return clearValue.slice(0, maxLength);
}

export function formatCreditCardNumber(value: string) {
    if (!value) {
        return value;
    }
    const clearValue = clearNumber(value);
    const nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(
        8,
        12,
    )} ${clearValue.slice(12, 16)}`;

    return nextValue.trim();
}

// add to utils file
export const toJSX = (text: string) => (
    <>
        {stringToJSX(text, /\*(.*)\*/g, (match: string) => (
            <b>{match}</b>
        ))}
    </>
);

export const getShapeType = (session: number) => {
    return session <= 1 ? ShapeType.hexagon : ShapeType.eight;
};

export const priceIntToFloat = (price = 0) => {
    return price.toFixed(2);
};
