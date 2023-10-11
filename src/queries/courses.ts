import { gql } from '@apollo/client';
import { Collection } from './collection';
import { CompactEducator, Educator } from './educators';
import { Topic } from './topics';

// import { CountAggregate, CourseType } from './types';

export interface Session {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    meetingLink: string;
    recordingLink: string;
    course: Course;
}
export interface Course {
    collection: Collection[];
    course: Course;
    id: string;
    name: string;
    headline: string;
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    maxSessionStartsAt: string;
    remainingSeats: number;
    maxSeats: number;
    createdAt: string;
    slug: string;
    dayOfWeek: number;
    overview: string;
    currentTotalPrice: number;
    enrolled: boolean;
    includeInSubscription: boolean;
    image: {
        url: string;
    };
    resources: {
        id: string;
        name: string;
        link: string;
        resourceType: string;
        upload: {
            url: string;
        };
    }[];
    educator: Educator;
    courseType: {
        description: string;
    };
    topic: Topic;
    sessions: Session[];
    totalSessions: {
        aggregate: {
            count: number;
        };
    };
    completedSession: {
        aggregate: {
            count: number;
        };
    };
    courseTypeDescriptor: {
        description: string;
    };
    completed?: Session[];
}

export interface GetCoursesByFilterResponse {
    courses: Course[];
    course: Course;
    total: {
        aggregate: {
            count: number;
        };
    };
}

const DETAILED_COURSE_FRAGMENT = gql`
    fragment DetailedCourseParts on courses {
        id
        name
        headline
        startTime: minSessionStartsAt
        endTime: minSessionEndsAt
        startDate: minSessionStartsAt
        endDate: maxSessionEndsAt
        maxSessionStartsAt
        remainingSeats
        maxSeats
        createdAt
        slug
        dayOfWeek
        enrolled
        overview
        currentTotalPrice
        includeInSubscription
        image {
            url
        }
        totalCollections: collections_aggregate {
            aggregate {
                count
            }
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
        collection {
            name
            slug
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
            id
            fullName
            firstName
            lastName
            fullName
            slug
            avatar {
                url
            }
            books(order_by: { order: asc }) {
                name
                link
                year
                cover {
                    url
                }
            }
            profile {
                prefix
                tagline
                bio
            }
        }
        courseType: courseTypeDescriptor {
            description
        }
    }
`;

// to use call useQuery(GET_COURSE_BY_FILTER)
export const GET_COURSES_BY_FILTER = gql`
    ${DETAILED_COURSE_FRAGMENT}
    query GetCoursesByFilter(
        $offset: Int
        $dayOfWeek: [Int!] = [0, 1, 2, 3, 4, 5, 6]
        $courseType: [course_types_enum!] = [live]
        $limit: Int
    ) {
        total: courses_aggregate(where: { courseType: { _in: $courseType }, dayOfWeek: { _in: $dayOfWeek } }) {
            aggregate {
                count
            }
        }
        courses(
            where: { courseType: { _in: $courseType }, dayOfWeek: { _in: $dayOfWeek } }
            offset: $offset
            limit: $limit
        ) {
            ...DetailedCourseParts
        }
    }
`;

export const GET_COURSES_BY_TOPIC_ID = gql`
    ${DETAILED_COURSE_FRAGMENT}
    query GetCoursesByTopicId(
        $courseId: uuid
        $topicId: [uuid!]
        $offset: Int
        $dayOfWeek: [Int!] = [0, 1, 2, 3, 4, 5, 6]
        $courseType: [course_types_enum!] = [live]
        $educatorId: [uuid!]
        $startDate: timestamptz
        $endDate: timestamptz
        $filteredByDate: Boolean = false
    ) {
        total: courses_aggregate(
            where: {
                id: { _neq: $courseId }
                topicId: { _in: $topicId }
                courseType: { _in: $courseType }
                dayOfWeek: { _in: $dayOfWeek }
                educatorId: { _in: $educatorId }
                sessions: { startTime: { _gte: $startDate, _lte: $endDate } }
            }
        ) @include(if: $filteredByDate) {
            aggregate {
                count
            }
        }

        total: courses_aggregate(
            where: {
                id: { _neq: $courseId }
                topicId: { _in: $topicId }
                courseType: { _in: $courseType }
                dayOfWeek: { _in: $dayOfWeek }
                educatorId: { _in: $educatorId }
                maxSessionStartsAt: { _gte: "now" }
            }
        ) @skip(if: $filteredByDate) {
            aggregate {
                count
            }
        }

        courses(
            where: {
                id: { _neq: $courseId }
                topicId: { _in: $topicId }
                courseType: { _in: $courseType }
                dayOfWeek: { _in: $dayOfWeek }
                educatorId: { _in: $educatorId }
                sessions: { startTime: { _gte: $startDate, _lte: $endDate } }
            }
            order_by: { sessions_aggregate: { min: { startTime: asc } } }
            offset: $offset
            limit: 8
        ) @include(if: $filteredByDate) {
            ...DetailedCourseParts
        }

        courses(
            where: {
                id: { _neq: $courseId }
                topicId: { _in: $topicId }
                courseType: { _in: $courseType }
                dayOfWeek: { _in: $dayOfWeek }
                educatorId: { _in: $educatorId }
                maxSessionStartsAt: { _gte: "now" }
            }
            order_by: { sessions_aggregate: { min: { startTime: asc } } }
            offset: $offset
            limit: 8
        ) @skip(if: $filteredByDate) {
            ...DetailedCourseParts
        }
    }
`;

export const GET_LATEST_COURSES_BY_TOPIC_ID = gql`
    ${DETAILED_COURSE_FRAGMENT}
    query GetCoursesByTopicId(
        $topicId: [uuid!]
        $dayOfWeek: [Int!] = [0, 1, 2, 3, 4, 5, 6]
        $courseType: [course_types_enum!] = [live]
        $educatorId: [uuid!]
        $startDate: timestamptz
        $endDate: timestamptz
        $filteredByDate: Boolean = false
    ) {
        total: courses_aggregate(
            where: {
                topicId: { _in: $topicId }
                courseType: { _in: $courseType }
                dayOfWeek: { _in: $dayOfWeek }
                educatorId: { _in: $educatorId }
                sessions: { startTime: { _gte: $startDate, _lte: $endDate } }
            }
        ) @include(if: $filteredByDate) {
            aggregate {
                count
            }
        }

        total: courses_aggregate(
            where: {
                topicId: { _in: $topicId }
                courseType: { _in: $courseType }
                dayOfWeek: { _in: $dayOfWeek }
                educatorId: { _in: $educatorId }
                maxSessionStartsAt: { _gte: "now" }
            }
        ) @skip(if: $filteredByDate) {
            aggregate {
                count
            }
        }

        courses(
            where: {
                topicId: { _in: $topicId }
                courseType: { _in: $courseType }
                dayOfWeek: { _in: $dayOfWeek }
                educatorId: { _in: $educatorId }
                sessions: { startTime: { _gte: $startDate, _lte: $endDate } }
            }
            limit: 4
        ) @include(if: $filteredByDate) {
            ...DetailedCourseParts
        }

        courses(
            where: {
                topicId: { _in: $topicId }
                courseType: { _in: $courseType }
                dayOfWeek: { _in: $dayOfWeek }
                educatorId: { _in: $educatorId }
                maxSessionStartsAt: { _gte: "now" }
            }
            limit: 4
        ) @skip(if: $filteredByDate) {
            ...DetailedCourseParts
        }
    }
`;

export const GET_COURSES_DETAIL_BY_SLUG = gql`
    query GetCourseDetailsBySlug($slug: String!) {
        course: course_by_slug(args: { _slug: $slug }) {
            id
            name
            headline
            startTime: minSessionStartsAt
            endTime: minSessionEndsAt
            startDate: minSessionStartsAt
            endDate: maxSessionEndsAt
            maxSessionStartsAt
            maxSeats
            remainingSeats
            createdAt
            slug
            dayOfWeek
            enrolled
            overview
            currentTotalPrice
            includeInSubscription
            image {
                url
            }
            totalCollections: collections_aggregate {
                aggregate {
                    count
                }
            }
            sessions(order_by: { startTime: asc }) {
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
            collection {
                name
                slug
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
                id
                fullName
                firstName
                lastName
                fullName
                slug
                avatar {
                    url
                }
                books(order_by: { order: asc }) {
                    name
                    link
                    year
                    cover {
                        url
                    }
                }
                profile {
                    prefix
                    tagline
                    bio
                }
            }
            courseType: courseTypeDescriptor {
                description
            }
        }
    }
`;

const LATEST_COURSE_FRAGMENT = gql`
    fragment CourseParts on courses {
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
        includeInSubscription

        image {
            url
        }
        collection {
            name
            slug
        }
        topic {
            id
            name
            primaryColor
            secondaryColor
            slug
            shapeType
        }
        educator {
            id
            fullName
            firstName
            avatar {
                url
            }
            slug
            profile {
                prefix
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
`;
// to get the top educators
export const GET_PICKED_FOR_YOU_DATA = gql`
    ${LATEST_COURSE_FRAGMENT}
    ${DETAILED_COURSE_FRAGMENT}
    query GetPickedForYouData {
        courses: featured_courses(limit: 4) {
            ...CourseParts
        }
        course: featured_course {
            ...DetailedCourseParts
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
                primaryColor
                secondaryColor
                name
                shapeType
            }
            totalCourses: collection_courses_aggregate {
                aggregate {
                    count
                }
            }
            courses: collection_courses(limit: 4, order_by: { order: asc_nulls_first }) {
                course {
                    ...DetailedCourseParts
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
                    name
                    primaryColor
                    secondaryColor
                    shapeType
                }
            }
        }
    }
`;

export const GET_LATEST_CLASSES = gql`
    ${LATEST_COURSE_FRAGMENT}
    query LatestClasses(
        $courseId: uuid
        $topicId: [uuid!]
        $dayOfWeek: [Int!] = [0, 1, 2, 3, 4, 5, 6]
        $courseType: [course_types_enum!] = [live]
        $educatorId: [uuid!]
        $startDate: timestamptz
        $endDate: timestamptz
        $filteredByDate: Boolean = false
    ) {
        courses(
            where: {
                id: { _neq: $courseId }
                topicId: { _in: $topicId }
                courseType: { _in: $courseType }
                dayOfWeek: { _in: $dayOfWeek }
                educatorId: { _in: $educatorId }
                sessions: { startTime: { _gte: $startDate, _lte: $endDate } }
            }
            limit: 4
            order_by: { publishedAt: desc }
        ) @include(if: $filteredByDate) {
            ...CourseParts
        }

        courses(
            where: {
                id: { _neq: $courseId }
                topicId: { _in: $topicId }
                courseType: { _in: $courseType }
                dayOfWeek: { _in: $dayOfWeek }
                educatorId: { _in: $educatorId }
                maxSessionStartsAt: { _gte: "now" }
            }
            limit: 4
            order_by: { publishedAt: desc }
        ) @skip(if: $filteredByDate) {
            ...CourseParts
        }
    }
`;

export interface GetClassCatalogueFilterDataResponse {
    educators: CompactEducator[];
    topics: Topic[];
}
export const GET_CLASS_CATALOGUE_FILTER_DATA = gql`
    query GetClassCatalogueFilterData {
        educators {
            id
            fullName
            slug
        }
        topics(order_by: { order: asc }) {
            id
            name
            slug
            primaryColor
            secondaryColor
            shapeType
        }
    }
`;

export interface RecentlyAddedCourses {
    courses: Course[];
}

//App config
export const GET_APP_CONFIG = gql`
    query GetAppConfig {
        config_values {
            configType
            value
        }
    }
`;

export const GET_MORE_CLASSES = gql`
    ${DETAILED_COURSE_FRAGMENT}
    query MoreClasses($courseId: uuid) {
        courses(
            where: { id: { _neq: $courseId }, sessions: { startTime: { _gt: "now" } } }
            order_by: { sessions_aggregate: { min: { startTime: asc } } }
            limit: 4
        ) {
            ...DetailedCourseParts
        }
    }
`;

export interface GetCourseSlugsByTopicSlug {
    courses: {
        slug: string;
        updatedAt: string;
    }[];
}
export const GET_COURSE_SLUGS_BY_TOPIC_SLUG = gql`
    query GetCourseSlugsByTopicSlug($slug: String!) {
        courses(where: { topic: { slug: { _eq: $slug } } }) {
            slug
            updatedAt
        }
    }
`;
