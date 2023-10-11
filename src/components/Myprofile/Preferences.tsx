import { useQuery, useMutation } from '@apollo/client';
import Checkbox from '@components/Checkbox';
import { GlobalContainerStyle } from '@components/Global/style';
import { convertToString } from '@components/utils';
import {
    GET_USER_PREFERENCES,
    GET_ONBOARDING_PROFILE_CHOICES,
    INSERT_USER_CLASS_PREFERENCES,
    INSERT_USER_TEACHING_STYLE_PREFERENCES,
    DELETE_USER_CLASS_PREFERENCES,
    DELETE_USER_TEACHING_STYLE_PREFERENCES,
    GetOnboardingProfileChoicesResponse,
    GetUserPreferencesResponse,
} from '@queries/preferences';
import { Typography } from 'antd';
import { FC, useState, useEffect, useCallback } from 'react';
import theme from 'theme';
import { SettingCard, SettingStyle } from './style';

const { Title } = Typography;

const Preferences: FC = () => {
    // Local state
    const [classPreferences, setClassPreferences] = useState<string[]>([]);
    const [teachingStylePreferences, setTeachingStylePreferences] = useState<string[]>([]);

    // Queries
    const { data } = useQuery<GetOnboardingProfileChoicesResponse>(GET_ONBOARDING_PROFILE_CHOICES);
    const { data: preferenceData } = useQuery<GetUserPreferencesResponse>(GET_USER_PREFERENCES);

    // Insert mutations
    const [insertClassPreferences] = useMutation(INSERT_USER_CLASS_PREFERENCES);
    const [insertTeachingStylePreferences] = useMutation(INSERT_USER_TEACHING_STYLE_PREFERENCES);

    // Delete mutations
    const [deleteClassPreferences] = useMutation(DELETE_USER_CLASS_PREFERENCES);
    const [deleteTeachingStylePreferences] = useMutation(DELETE_USER_TEACHING_STYLE_PREFERENCES);

    // Insert or delete class preferences
    const saveClassPreferences = useCallback(
        (tag: string) => () => {
            if (classPreferences.includes(tag)) {
                setClassPreferences((currentPreferences: string[]) =>
                    currentPreferences.filter((item: string) => tag !== item),
                );

                const preferenceValues = [tag];

                deleteClassPreferences({ variables: { preferenceValues } });
            } else {
                setClassPreferences((currentPreferences: string[]) => [...currentPreferences, tag]);

                const objects = [{ preferenceValue: tag }];

                insertClassPreferences({ variables: { objects } });
            }
        },
        [insertClassPreferences, deleteClassPreferences, setClassPreferences, classPreferences],
    );

    // Insert or delete teaching style preferences
    const saveTeachingStylePreferences = useCallback(
        (teachingStyle: string) => () => {
            if (teachingStylePreferences.includes(teachingStyle)) {
                setTeachingStylePreferences((currentPreferences: string[]) =>
                    currentPreferences.filter((item: string) => teachingStyle !== item),
                );

                const preferenceValues = [teachingStyle];

                deleteTeachingStylePreferences({ variables: { preferenceValues } });
            } else {
                setTeachingStylePreferences((currentPreferences: string[]) => [...currentPreferences, teachingStyle]);

                const objects = [{ preferenceValue: teachingStyle }];

                insertTeachingStylePreferences({ variables: { objects } });
            }
        },
        [
            insertTeachingStylePreferences,
            deleteTeachingStylePreferences,
            setTeachingStylePreferences,
            teachingStylePreferences,
        ],
    );

    // Populate state with preferences from server
    useEffect(() => {
        if (preferenceData?.classTags) {
            for (const { preferenceValue } of preferenceData?.classTags) {
                setClassPreferences((currentPreferences: string[]) => {
                    if (!currentPreferences.includes(preferenceValue)) {
                        return [...currentPreferences, preferenceValue];
                    }

                    return currentPreferences;
                });
            }
        }

        if (preferenceData?.teachingStyles) {
            for (const { preferenceValue } of preferenceData?.teachingStyles) {
                setTeachingStylePreferences((currentPreferences: string[]) => {
                    if (!currentPreferences.includes(preferenceValue)) {
                        return [...currentPreferences, preferenceValue];
                    }

                    return currentPreferences;
                });
            }
        }
    }, [preferenceData, setClassPreferences, setTeachingStylePreferences]);

    return (
        <SettingStyle>
            <GlobalContainerStyle>
                <SettingCard>
                    <Title level={2} className="title">
                        Educator Qualities
                    </Title>
                    <div className="btncheck">
                        {data?.teachingStyles?.map((items, index) => {
                            return (
                                <Checkbox
                                    key={index}
                                    checkedColor={theme.navy.primary}
                                    label={convertToString(`${items.value}`)}
                                    name={convertToString(`${items.description}`)}
                                    textColor={theme.white}
                                    defaultTextColor={theme.black}
                                    checked={teachingStylePreferences?.includes(items.value)}
                                    onChange={saveTeachingStylePreferences(items.value)}
                                />
                            );
                        })}
                    </div>
                </SettingCard>
                <SettingCard className="second-card">
                    <Title level={2} className="title">
                        Classroom Qualities
                    </Title>
                    <div className="btncheck">
                        {data?.classTags?.map((tag, index) => {
                            return (
                                <Checkbox
                                    key={index}
                                    value={tag.value}
                                    checkedColor={theme.navy.primary}
                                    label={convertToString(`${tag.value}`)}
                                    name={convertToString(`${tag.value}`)}
                                    textColor={theme.white}
                                    defaultTextColor={theme.black}
                                    checked={classPreferences?.includes(tag.value)}
                                    onChange={saveClassPreferences(tag.value)}
                                />
                            );
                        })}
                    </div>
                </SettingCard>
            </GlobalContainerStyle>
        </SettingStyle>
    );
};

export default Preferences;
