import { gql } from '@apollo/client';
import { UserRole } from '@queries/types';

export enum SubscriptionStatus {
    ACTIVE = 'active',
    CANCELLED = 'cancelled',
}

export interface Subscription {
    status: SubscriptionStatus;
    createdAt: string;
}
export interface GetUserDetails {
    userDetails: {
        firstName: string;
        lastName: string;
        fullName: string;
        email: string;
        id: string;
        createdAt: string;
        role: UserRole;
        subscription?: Subscription;
    }[];
}
// export interface GetUserDetails {
//     user: UserDetails[];
// }
export const GET_PROFILE_DETAILS = gql`
    query GetMyProfile {
        userDetails {
            firstName
            lastName
            fullName
            email
            id
            createdAt
            role
            subscription {
                status
                createdAt
            }
        }
    }
`;
interface UpdateUserInput {
    firstName: string;
    lastName: string;
    userId: string;
}
export interface UpdateUserVariables {
    input: UpdateUserInput;
}
export const UpdateUserInfo = gql`
    mutation UpdateMyProfile($userId: uuid!, $firstName: String!, $lastName: String!) {
        update_user(pk_columns: { id: $userId }, _set: { firstName: $firstName, lastName: $lastName }) {
            id
        }
    }
`;
