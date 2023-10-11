import { gql } from '@apollo/client';
import { Topic } from './topics';
import { Course } from './courses';

export interface Collection {
    id: string;
    name: string;
    headline: string;
    slug: string;
    image: {
        url: string;
    };
    topic: Topic;
}

export interface CollectionType {
    collection: Collection;
}

export interface CollectionCourse {
    course: Course[];
}

export interface GetCollectionResponse {
    collection: CollectionType;
}

export const GET_COLLECTION_COURSES_BY_SLUG = gql`
    query GetCollectionCoursesBySlug($slug: String!, $offset: Int) {
        total: collection_courses_aggregate(where: { collection: { slug: { _eq: $slug } } }) {
            aggregate {
                count
            }
        }
        courses: collection_courses(
            where: { collection: { slug: { _eq: $slug } } }
            offset: $offset
            order_by: { order: asc_nulls_first }
            limit: 8
        ) {
            course {
                id
                name
                currentTotalPrice
                headline
                includeInSubscription
                startTime: minSessionStartsAt
                endTime: minSessionEndsAt
                startDate: minSessionStartsAt
                endDate: maxSessionEndsAt
                maxSessionStartsAt
                maxSeats
                remainingSeats
                enrolled
                slug
                courseType: courseTypeDescriptor {
                    description
                }
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
                sessions(where: { startTime: { _gt: "now" } }, order_by: { startTime: asc }) {
                    id
                    endTime
                    startTime
                    title
                }
            }
        }
    }
`;

export const GET_COLLECTION_BY_SLUG = gql`
    query GetCollectionBySlug($slug: String!) {
        collection: collection_by_slug(args: { _slug: $slug }) {
            id
            name
            headline
            slug
            image {
                url
            }
            topic {
                id
                name
                primaryColor
                secondaryColor
                slug
                shapeType
            }
        }
    }
`;
