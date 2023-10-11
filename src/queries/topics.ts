import { gql } from '@apollo/client';

export interface Topic {
    shapeType: string | undefined;
    id: string;
    name: string;
    primaryColor: string;
    secondaryColor: string;
    slug: string;
    class?: string;
    buttonText?: string;
}

export interface GetAllTopicsResponse {
    topics: Topic[];
}

export const GET_ALL_TOPICS = gql`
    query GetTopics {
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
