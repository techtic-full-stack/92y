import { Course } from '@queries/courses';
import moment from 'moment';
import { useMemo } from 'react';

const useCoursePassDate = (course: Course) => {
    return useMemo(() => moment().isAfter(course.maxSessionStartsAt), [course]);
};

export default useCoursePassDate;
