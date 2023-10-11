/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMutation, useQuery } from '@apollo/client';
import { OnboardingScreens } from '@components/Modal/types';
import {
    GET_ONBOARDING_PROFILE_CHOICES,
    INSERT_USER_PREFERENCES,
    GetOnboardingProfileChoicesResponse,
} from '@queries/preferences';
import { FC, useCallback, useContext } from 'react';
import OnboardingContext from '@contexts/OnboardingContext';
import OnboardingPreferences from './OnboardingPreferences';

const buildPreferenceObject = (preferenceValue: string) => ({ preferenceValue });

const Screen4: FC = () => {
    const { classPreferences, teachingStylePreferences, setTeachingStylePreferences, setScreen, setIsModalVisible } =
        useContext(OnboardingContext);

    const { data } = useQuery<GetOnboardingProfileChoicesResponse>(GET_ONBOARDING_PROFILE_CHOICES);

    const [insertUserPreferences, { loading }] = useMutation(INSERT_USER_PREFERENCES);

    const handleChange = useCallback(
        (e: any) => {
            let updatedList = [...teachingStylePreferences];

            if (e.target.checked) {
                updatedList = [...teachingStylePreferences, e.target.value];
            } else {
                updatedList.splice(teachingStylePreferences.indexOf(e.target.value), 1);
            }

            setTeachingStylePreferences(updatedList);
        },
        [teachingStylePreferences, setTeachingStylePreferences],
    );

    const handleSignUp = useCallback(async () => {
        const tags = classPreferences.map(buildPreferenceObject);

        const teachingStyles = teachingStylePreferences.map(buildPreferenceObject);

        await insertUserPreferences({ variables: { tags, teachingStyles } });

        setIsModalVisible(false);
        setScreen(OnboardingScreens.LOGIN);
    }, [classPreferences, teachingStylePreferences, insertUserPreferences, setIsModalVisible, setScreen]);

    return (
        <OnboardingPreferences
            data={data?.teachingStyles}
            selectedPreferences={teachingStylePreferences}
            onChange={handleChange}
            backButtonLabel="Back"
            backButtonAction={() => setScreen(OnboardingScreens.SCREEN_3)}
            nextButtonLabel="Finish"
            nextButtonAction={handleSignUp}
            isLoading={loading}
            heading="Tell us your preferences: Educator"
            subheading="We’ll help you find the perfect classes"
            description="I’m looking for educators that are"
        />
    );
};

export default Screen4;
