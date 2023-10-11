/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@components/Button';
import { Course } from '@queries/courses';
import { UserRole } from '@queries/types';
import Link from 'next/link';
import { FC, MouseEventHandler } from 'react';
import useCoursePassDate from '../hooks/useCoursePassDate';
import useSubscription from '../hooks/useSubscription';
import theme from '../theme';

interface Props {
    course: Course;
    onClicked: MouseEventHandler<HTMLElement>;
    buttonColor: string;
    passedButtonColor?: string;
    disabled?: boolean;
}

const CourseRegisterButton: FC<Props> = ({
    course,
    buttonColor,
    onClicked,
    passedButtonColor = theme.yellow.secondary,
    disabled,
}) => {
    const passedDate = useCoursePassDate(course);
    const subscription = useSubscription();
    const shouldBeFree = subscription?.active && course.includeInSubscription;
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    // Course Price return to orignal price after logout.
    const coursePrice = accessToken ? (shouldBeFree ? 0 : course.currentTotalPrice) : course.currentTotalPrice;
    const isAdmin = subscription?.user?.role === UserRole.ADMIN;

    return passedDate ? (
        <Button type="secondary" color={passedButtonColor} bgcolor="transparent">
            This course has passed
        </Button>
    ) : course.enrolled ? (
        <Link href="/my-courses" passHref>
            <a>
                <Button type="secondary" color={passedButtonColor} bgcolor="transparent">
                    Enrolled
                </Button>
            </a>
        </Link>
    ) : (
        <Button
            bgcolor={buttonColor}
            color="#000000"
            onClick={isAdmin ? undefined : onClicked}
            disabled={isAdmin || disabled}
            lg
        >
            Register for{' '}
            <strong className="ps-1">
                $
                {coursePrice - parseInt(coursePrice.toString()) === 0
                    ? coursePrice
                    : parseFloat(coursePrice.toString()).toFixed(2)}
            </strong>
        </Button>
    );
};

export default CourseRegisterButton;
