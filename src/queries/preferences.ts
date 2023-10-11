import { gql } from '@apollo/client';

export interface ClassTags {
    value: string;
}

export interface TeachingStyles {
    value: string;
    description: string;
}

export interface GetOnboardingProfileChoicesResponse {
    classTags: ClassTags[];
    teachingStyles: TeachingStyles[];
}

export type UserPreference = {
    preferenceValue: string;
};

export interface GetUserPreferencesResponse {
    classTags: UserPreference[];
    teachingStyles: UserPreference[];
}

export const GET_ONBOARDING_PROFILE_CHOICES = gql`
    query GetOnboardingProfileChoices {
        classTags: class_tags {
            value
        }

        teachingStyles: teaching_styles {
            value
            description
        }
    }
`;

export const GET_USER_PREFERENCES = gql`
    query GetUserPreferences {
        classTags: user_class_preferences {
            preferenceValue
        }

        teachingStyles: user_teaching_style_preferences {
            preferenceValue
        }
    }
`;

export const INSERT_USER_CLASS_PREFERENCES = gql`
    mutation AddClassPreference($objects: [user_class_preferences_insert_input!]!) {
        results: insert_user_class_preferences(objects: $objects) {
            affected_rows
        }
    }
`;

export const INSERT_USER_TEACHING_STYLE_PREFERENCES = gql`
    mutation AddTeachingStylePreference($objects: [user_teaching_style_preferences_insert_input!]!) {
        results: insert_user_teaching_style_preferences(objects: $objects) {
            affected_rows
        }
    }
`;

export const INSERT_USER_PREFERENCES = gql`
    mutation AddPreferences(
        $tags: [user_class_preferences_insert_input!]!
        $teachingStyles: [user_teaching_style_preferences_insert_input!]!
    ) {
        classResults: insert_user_class_preferences(
            objects: $tags
            on_conflict: { constraint: user_class_preferences_pkey, update_columns: [] }
        ) {
            affected_rows
        }

        teacherStylingResults: insert_user_teaching_style_preferences(
            objects: $teachingStyles
            on_conflict: { constraint: user_teaching_style_preferences_pkey, update_columns: [] }
        ) {
            affected_rows
        }
    }
`;

export const DELETE_USER_CLASS_PREFERENCES = gql`
    mutation DeleteClassPreference($preferenceValues: [class_tags_enum!]!) {
        results: delete_user_class_preferences(where: { preferenceValue: { _in: $preferenceValues } }) {
            affected_rows
        }
    }
`;

export const DELETE_USER_TEACHING_STYLE_PREFERENCES = gql`
    mutation DeleteTeachStylePreference($preferenceValues: [teaching_styles_enum!]!) {
        results: delete_user_teaching_style_preferences(where: { preferenceValue: { _in: $preferenceValues } }) {
            affected_rows
        }
    }
`;
