import { gql } from '@apollo/client';
import { Course } from './courses';
import { Topic } from './topics';
import { Book, CountAggregate, Education } from './types';

export interface Testimonial {
    title: string;
    subTitle: string;
    content: string;
}
export interface Educator {
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    avatar: {
        url: string;
    };
    slug: string;
    profile: {
        bio?: string;
        prefix?: string;
        tagline: string;
        topic?: Topic;
        awardsAndFeatures: string;
    };
    books: Book[];
    educations: Education[];
    testimonials: Testimonial[];
    courses: Course[];
}

export type CompactEducator = Pick<Educator, 'id' | 'fullName'>;

export interface GetAllEducatorResponse {
    total: CountAggregate;
    educators: Educator[];
}

export interface GetEducatorDetailsResponse {
    educator: Educator;
}

const educatorsQuery = `
    id
    fullName
    firstName
    lastName
    avatar {
        url
    }
    slug
    profile {
        prefix
        tagline
        bio
        awardsAndFeatures
        topic {
            id
            name
            primaryColor
            secondaryColor
            slug
            shapeType
        }
    }
`;

// to get the top educators
export const GET_TOP_EDUCATORS = gql`
    query GetTopEducators{
        educators: featured_educators(limit:3) {
            ${educatorsQuery}
        }
    }
`;

// to use call useQuery(GET_ALL_EDUCATORS)
export const GET_ALL_EDUCATOR = gql`
    query GetEducators($offset: Int, $topicIds: [uuid!], $hasTopics: Boolean!) {
        total: educators_aggregate(where: {profile: {primaryTopicId: {_in: $topicIds}}}) {
            aggregate {
                count
            }
        }
        educators(limit: 2, offset: $offset, order_by: {lastName: asc}) @skip(if: $hasTopics) {
            ${educatorsQuery}
        }
        educators(where: { profile: { primaryTopicId: { _in: $topicIds } } }, limit: 2, offset: $offset, order_by: {lastName: asc})
            @include(if: $hasTopics) {
            ${educatorsQuery}
        }
    }
`;

export const GET_EDUCATORS_LIST = gql`
    query educatorsList {
        educators {
            id
            fullName
            slug
        }
    }
`;

export const GET_EDUCATOR_BY_SLUG = gql`
    query GetEducatorBySlug($slug: String!) {
        educator: educator_by_slug(args: {_slug: $slug}) {
            ${educatorsQuery}
            books(order_by:{order:asc}){
                name
                link
                year
                cover{
                  url
                }
            }
            educations{
                title
                image{
                  url
                }
            }
            testimonials(order_by: {order: asc}) {
                title
                subTitle
                content
              }
            courses(where: { sessions: { startTime: { _gte: "now" } } }) {
                id
                name
                slug
                overview
                includeInSubscription
                maxSessionStartsAt
                maxSeats
                remainingSeats
                startTime: minSessionStartsAt
                endTime: minSessionEndsAt
                startDate: minSessionStartsAt
                endDate: maxSessionEndsAt
                enrolled
                currentTotalPrice
                includeInSubscription
                topic {
                  name
                  secondaryColor
                  shapeType
                }
                image {
                  url
                }
                courseType
                courseTypeDescriptor {
                    description
                }
                sessions(where:{startTime:{_gt:"now"}},order_by:{startTime:asc}) {
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
            }
        }
    }
`;
