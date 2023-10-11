import { OperationVariables } from '@apollo/client';

export interface IdName {
    id: string | number;
    name: string;
}

export type QueryResult<T, F extends keyof any> = Record<F, T>;

export type CreateVars<T> = {
    object: Omit<T, 'id'>;
};
export type ModifyVars<T> = {
    id: string | number;
    object: T;
};

export interface CountAggregate {
    aggregate: {
        count: number;
    };
}
export enum UserRole {
    LEARNER = 'learner',

    EDUCATOR = 'educator',
    ANONYMOUS = 'anonymous',
    ADMIN = 'dashboard',
}

export interface PaginationVars extends OperationVariables {
    limit: number;
    offset: number;
}

export interface ImageUrl {
    url: string;
}

export enum CourseType {
    LIVE = 'live',
}

export interface Book {
    name: string;
    year: number;
    link: string;
    cover: ImageUrl;
}

export interface Education {
    title: string;
    image: ImageUrl;
}
