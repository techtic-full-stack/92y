import { gql } from '@apollo/client';

export interface SignUpResults {
    id: string;
}

interface SignUpInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface SignUpVariables {
    input: SignUpInput;
}
export const SIGN_UP = gql`
    mutation Signup($input: SignupInput!) {
        signUp(input: $input) {
            id
        }
    }
`;
