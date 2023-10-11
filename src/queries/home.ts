import { gql } from '@apollo/client';
import { Educator } from './educators';
import { Course } from './courses';
import { Topic } from './topics';

export interface GetHomeDataResponse {
    courses: Course[];
    collection: {
        name: string;
        headline: string;
        slug: string;
        image: {
            url: string;
        };
        topic: Topic;
        courses: Course[];
    };
    educators: Educator[];
}

export const GET_HOME_DATA = gql`
    query GetHomeData {
        courses(where: { maxSessionStartsAt: { _gte: "now" } }, order_by: { publishedAt: desc }, limit: 4) {
            id
            name
            slug
            startTime: minSessionStartsAt
            endTime: minSessionEndsAt
            startDate: minSessionStartsAt
            endDate: maxSessionEndsAt
            maxSessionStartsAt
            maxSeats
            remainingSeats
            headline
            image {
                url
            }
            collection {
                name
            }
            topic {
                id
                slug
                primaryColor
                secondaryColor
                name
                shapeType
            }
            sessions(where: { startTime: { _gt: "now" } }, order_by: { startTime: asc }) {
                id
                endTime
                startTime
                title
            }
            educator {
                fullName
                firstName
                avatar {
                    url
                }
                id
                slug
                profile {
                    tagline
                }
            }
        }
        collection: featured_collection {
            name
            headline
            slug
            image {
                url
            }
            topic {
                id
                slug
                primaryColor
                secondaryColor
                name
                shapeType
            }
            courses: collection_courses(limit: 4, order_by: { order: asc_nulls_first }) {
                course {
                    id
                    name
                    slug
                    startTime: minSessionStartsAt
                    endTime: minSessionEndsAt
                    startDate: minSessionStartsAt
                    endDate: maxSessionEndsAt
                    maxSessionStartsAt
                    maxSeats
                    remainingSeats
                    headline
                    image {
                        url
                    }
                    collection {
                        name
                    }
                    topic {
                        id
                        slug
                        primaryColor
                        secondaryColor
                        name
                        shapeType
                    }
                    educator {
                        fullName
                        firstName
                        avatar {
                            url
                        }
                        id
                        slug
                        profile {
                            tagline
                        }
                    }
                    sessions(where: { startTime: { _gt: "now" } }, order_by: { startTime: asc }) {
                        id
                        endTime
                        startTime
                        title
                    }
                }
            }
        }

        educators: featured_educators {
            id
            firstName
            lastName
            fullName
            slug
            avatar {
                url
            }
            profile {
                tagline
                prefix
                topic {
                    id
                    slug
                    name
                    primaryColor
                    secondaryColor
                    shapeType
                }
            }
        }
    }
`;
