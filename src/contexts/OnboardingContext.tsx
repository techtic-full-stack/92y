import React from 'react';

type OnboardingContextProps = {
    formData: any;
    setFormData: (value: any) => void;
    screen: any;
    setScreen: (value: any) => void;
    classPreferences: string[];
    setClassPreferences: (value: any) => void;
    teachingStylePreferences: string[];
    setTeachingStylePreferences: (value: any) => void;
    errorMessage: any;
    setErrorMessage: (value: any) => void;
    closeBtn: any;
    setCloseBtn: (value: any) => void;
    setIsModalVisible: (value: any) => void;
    screen2Enroll: boolean;

    setScreen2Enroll: (value: boolean) => void;
};

const OnboardingContext = React.createContext<OnboardingContextProps>({
    formData: null,
    setFormData: () => {},
    screen: null,
    setScreen: () => {},
    classPreferences: [],
    setClassPreferences: () => {},
    teachingStylePreferences: [],
    setTeachingStylePreferences: () => {},
    errorMessage: null,
    setErrorMessage: () => {},
    closeBtn: null,
    setCloseBtn: () => {},
    setIsModalVisible: () => {},
    setScreen2Enroll: () => {},
    screen2Enroll: false,
});

export default OnboardingContext;
