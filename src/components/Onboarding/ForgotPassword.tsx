/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from 'react';
import { Typography } from 'antd';
import {
    ErrorMessage,
    FormDiv,
    CustomInput,
    OnBoardingContainerStyle,
    OnBoardingSubHeaderRow,
    OnBoardingHeaderCol,
    ContainerStyle,
    FormFooter,
    CustomLabel,
} from './style';
import Button from '@components/Button';
import theme from 'theme';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import { OnboardingScreens } from '@components/Modal/types';

const schema = yup.object().shape({
    email: yup.string().email('Please Enter a valid Email').required('Email is required'),
});

type ForgotPasswordProps = {
    setFormData?: any;
    // setScreen?: any;
    setCloseBtn: (value: boolean) => void;
    setScreen: (value: OnboardingScreens) => void;
};

const ForgotPassword: FC<ForgotPasswordProps> = ({ setFormData, setScreen, setCloseBtn }) => {
    const [EmailError, setEmailError] = useState();
    const [loading, setLoading] = useState('false');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = async (data: any) => {
        setCloseBtn(false);
        setLoading('true');
        Auth.forgotPassword(data.email)
            .then(() => {
                setFormData(data);
                // setScreen('reset-password');
                setScreen(OnboardingScreens.RESET_PASSWORD);
                setCloseBtn(true);
                setLoading('false');
                reset();
            })
            .catch((error) => {
                setEmailError(error.message);
                setLoading('false');
                setCloseBtn(true);
            });
    };
    const { Title, Text } = Typography;

    return (
        <OnBoardingContainerStyle color={theme.navy.primary} loading={loading}>
            <ContainerStyle className="d-flex justify-content-center forgot">
                <OnBoardingSubHeaderRow>
                    <OnBoardingHeaderCol>
                        <div className="onboarding-header-text onboarding-1 text-center d-flex flex-column">
                            <Title level={2}>Forgot Password</Title>
                            <Text className="forgot-sub-header">Enter the email associated with your account.</Text>
                            <FormDiv className="form-input">
                                <form onSubmit={handleSubmit(onSubmitHandler)}>
                                    <CustomLabel className="d-flex">email</CustomLabel>
                                    <CustomInput {...register('email')} placeholder="Enter Email" type="email" />
                                    {errors.email && (
                                        <ErrorMessage className="d-flex text-left">
                                            {errors.email?.message}
                                        </ErrorMessage>
                                    )}
                                    {EmailError && (
                                        <ErrorMessage className="d-flex text-left">{EmailError}</ErrorMessage>
                                    )}
                                    <FormFooter className="mt-1">
                                        <div className="d-flex flex-column text-right">
                                            <Text>Return to</Text>
                                            <Text className="text-decoration-underline text-start">
                                                <a onClick={() => setScreen(OnboardingScreens.LOGIN)}>Sign in</a>
                                            </Text>
                                        </div>

                                        <Button
                                            btnType="submit"
                                            bgcolor="#F9D8C5"
                                            color="#000000"
                                            className="align-self-end"
                                            lg
                                        >
                                            Next
                                        </Button>
                                    </FormFooter>
                                </form>
                            </FormDiv>
                        </div>
                    </OnBoardingHeaderCol>
                </OnBoardingSubHeaderRow>
            </ContainerStyle>
        </OnBoardingContainerStyle>
    );
};
export default ForgotPassword;
