import { gql } from '@apollo/client';
import { CouponDiscountType } from '@queries/checkout';
import { Session, Course } from './courses';
export interface GetUserClassessResponse {
    total: {
        aggregate: {
            count: number;
        };
    };
    classes: {
        id: string;
        enrollmentId: string;
        session: Session;
    }[];
}

export interface GetEnrollClassDetailsResponse {
    enrollment: {
        course: Course;
    };
    upcoming: {
        session: Session;
    }[];
}

export interface Order {
    amount: number;
    seats: number;
    pricePerSeat: number;
    withSubscription: boolean;
    stripeUrl: string;
    promoCode: {
        code: string;
        coupon: {
            amount: number;
            discount: CouponDiscountType;
        };
    } | null;
    enrollment: {
        id: string;
        course: Course;
    };
}
export interface GetOrderHistoryResponse {
    total: {
        aggregate: {
            count: number;
        };
    };
    orders: Order[];
}
export const GET_USER_UPCOMING_CLASSES = gql`
    query GetUserUpcomingClasses($offset: Int, $limit: Int) {
        total: enrollment_sessions_aggregate(where: { session: { startTime: { _gt: "now" } } }) {
            aggregate {
                count
            }
        }
        classes: upcomingClasses(args: { offset: $offset, limit: $limit }) {
            id
            enrollmentId
            session {
                startTime
                endTime
                meetingLink
                course {
                    name
                    startTime: minSessionStartsAt
                    endTime: minSessionEndsAt
                    startDate: minSessionStartsAt
                    endDate: maxSessionEndsAt
                    maxSessionStartsAt
                    image {
                        url
                    }
                    topic {
                        primaryColor
                        secondaryColor
                        shapeType
                    }
                    sessions(where: { startTime: { _gt: "now" } }, order_by: { startTime: asc }) {
                        id
                        endTime
                        startTime
                        title
                    }
                    totalSessions: sessions_aggregate {
                        aggregate {
                            count
                        }
                    }
                    completedSession: sessions_aggregate(where: { endTime: { _lt: "now" } }) {
                        aggregate {
                            count
                        }
                    }
                }
            }
        }
    }
`;

export const GET_USER_PAST_CLASSES = gql`
    query GetUserPastClasses($offset: Int, $limit: Int) {
        total: enrollment_sessions_aggregate(where: { session: { endTime: { _lt: "now" } } }) {
            aggregate {
                count
            }
        }
        classes: pastClasses(args: { offset: $offset, limit: $limit }) {
            id
            enrollmentId
            session {
                startTime
                endTime
                recordingLink
                course {
                    includeInSubscription
                    name
                    startTime: minSessionStartsAt
                    endTime: minSessionEndsAt
                    startDate: minSessionStartsAt
                    endDate: maxSessionEndsAt
                    maxSessionStartsAt
                    image {
                        url
                    }
                    topic {
                        primaryColor
                        secondaryColor
                        shapeType
                    }
                    sessions(where: { startTime: { _gt: "now" } }, order_by: { startTime: asc }) {
                        id
                        endTime
                        startTime
                        title
                    }
                    totalSessions: sessions_aggregate {
                        aggregate {
                            count
                        }
                    }
                    completedSession: sessions_aggregate(where: { endTime: { _lt: "now" } }) {
                        aggregate {
                            count
                        }
                    }
                }
            }
        }
    }
`;

export const GET_ENROLL_CLASS_DETAILS = gql`
    query GetEnrollClassDetails($enrollmentId: uuid!) {
        enrollment(id: $enrollmentId) {
            course {
                name
                startTime: minSessionStartsAt
                endTime: minSessionEndsAt
                startDate: minSessionStartsAt
                endDate: maxSessionEndsAt
                maxSessionStartsAt
                overview
                image {
                    url
                }
                topic {
                    primaryColor
                    secondaryColor
                    shapeType
                }
                resources {
                    id
                    name
                    resourceType
                    link
                    upload {
                        url
                    }
                }
                completed: sessions(where: { startTime: { _lt: "now" } }, order_by: { startTime: asc }) {
                    id
                    title
                    startTime
                    endTime
                    recordingLink
                    course {
                        topic {
                            shapeType
                            secondaryColor
                        }
                    }
                }
                totalSessions: sessions_aggregate {
                    aggregate {
                        count
                    }
                }
                completedSession: sessions_aggregate(where: { startTime: { _lt: "now" } }) {
                    aggregate {
                        count
                    }
                }
            }
        }
        upcoming: enrollment_sessions(
            where: { session: { startTime: { _gte: "now" } }, enrollmentId: { _eq: $enrollmentId } }
            order_by: { session: { startTime: asc } }
        ) {
            session {
                id
                title
                startTime
                endTime
                meetingLink
                course {
                    topic {
                        shapeType
                        secondaryColor
                    }
                }
            }
        }
        completed: enrollment_sessions(
            where: { session: { endTime: { _lt: "now" } }, enrollmentId: { _eq: $enrollmentId } }
            order_by: { session: { endTime: asc } }
        ) {
            session {
                id
                title
                startTime
                endTime
                meetingLink
                course {
                    topic {
                        shapeType
                        secondaryColor
                    }
                }
            }
        }
    }
`;

export const GET_ORDER_HISTORY = gql`
    query GetOrderHistory($offset: Int) {
        total: orders_aggregate {
            aggregate {
                count
            }
        }
        orders(order_by: { createdAt: desc }, offset: $offset, limit: 2) {
            amount
            seats
            pricePerSeat
            withSubscription
            stripeUrl
            promoCode {
                code
                coupon {
                    discount
                    amount
                }
            }
            enrollment {
                id
                course {
                    includeInSubscription
                    currentTotalPrice
                    name
                    slug
                    image {
                        url
                    }
                    topic {
                        secondaryColor
                    }
                    startTime: minSessionStartsAt
                    endTime: minSessionEndsAt
                    startDate: minSessionStartsAt
                    endDate: maxSessionEndsAt
                    maxSessionStartsAt
                    totalSessions: sessions_aggregate {
                        aggregate {
                            count
                        }
                    }
                }
            }
        }
    }
`;
