import { useQuery } from '@apollo/client';
import { OnboardingScreens } from '@components/Modal/types';
import { GET_ONBOARDING_PROFILE_CHOICES, GetOnboardingProfileChoicesResponse } from '@queries/preferences';
import { FC, useCallback, useContext } from 'react';
import OnboardingContext from '@contexts/OnboardingContext';
import OnboardingPreferences from './OnboardingPreferences';

const Screen3: FC = () => {
    const { classPreferences, setClassPreferences, setScreen } = useContext(OnboardingContext);

    const { data } = useQuery<GetOnboardingProfileChoicesResponse>(GET_ONBOARDING_PROFILE_CHOICES);

    const handleChange = useCallback(
        (e: any) => {
            let updatedList = [...classPreferences];

            if (e.target.checked) {
                updatedList = [...classPreferences, e.target.value.toLowerCase()];
            } else {
                updatedList.splice(classPreferences.indexOf(e.target.value), 1);
            }

            setClassPreferences(updatedList);
        },
        [classPreferences, setClassPreferences],
    );

    return (
        <OnboardingPreferences
            data={data?.classTags}
            selectedPreferences={classPreferences}
            onChange={handleChange}
            nextButtonLabel="Next"
            nextButtonAction={() => setScreen(OnboardingScreens.SCREEN_4)}
            heading="Tell us your preferences: Classes"
            subheading="We’ll help you find the perfect classes"
            description="I’m looking for classes that are"
        />
    );
};

export default Screen3;
