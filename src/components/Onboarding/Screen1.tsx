/* eslint-disable jsx-a11y/anchor-is-valid */
import { OnboardingScreens } from '@components/Modal/types';
import React, { FC, useState, useCallback } from 'react';
import { Col } from 'react-bootstrap';
import { Typography } from 'antd';
import screen1 from 'public/onboarding/screen1.svg';
import Image from 'next/image';
import {
    ErrorMessage,
    FormDiv,
    CustomInput,
    OnBoardingSubHeaderRow,
    OnBoardingContainerStyle,
    OnBoardingHeaderCol,
    ContainerStyle,
    OnboardingBannerStyled,
    FormFooter,
    CustomLabel,
    FormFooterDiv,
    SubHeading,
    CustomNameLabel,
    CustomInfoLavel,
} from './style';
import Button from '@components/Button';
import theme from 'theme';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { SIGN_UP, SignUpResults, SignUpVariables } from '@queries/signUp';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import Link from 'next/link';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Please Enter a valid Email').required('Email is required'),
    password: yup
        .string()
        .max(32, 'Password must be less than 32 digit')
        .required('Password is required')
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&.`~^)(_+=}{|:;'"><,/\\[\]-])[A-Za-z\d@$!%*#?&.`~^)(_+=}{|:;'"><,/\\[\]-]{8,}$/,
            "The password entered doesn't meet the requirements",
        ),
});

type Screen1Props = {
    setScreen: (value: OnboardingScreens) => void;
    setFormData: (value: any) => void;
    errorMessage?: any;
    formData?: any;
    setErrorMessage: (value: string) => void;
    setCloseBtn: (value: boolean) => void;
};

const Screen1: FC<Screen1Props> = ({
    setScreen,
    setFormData,
    errorMessage,
    formData,
    setErrorMessage,
    setCloseBtn,
}) => {
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState('false');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const { Title, Text } = Typography;

    const [signUpUser] = useMutation<SignUpResults, SignUpVariables>(SIGN_UP, {
        onCompleted: useCallback(
            async (signupResults) => {
                if (signupResults) {
                    await Auth.signIn(formData.email, formData.password)
                        .then((user) => {
                            setCloseBtn(true);
                            setLoading('false');
                            console.log('✔️✔️✔️', user, formData);
                            localStorage.setItem('accessToken', user.signInUserSession.accessToken.jwtToken);
                            setScreen(OnboardingScreens.SCREEN_2);
                            router.replace(router.asPath);
                            reset();
                        })
                        .catch((error) => {
                            console.log('❌❌❌', error.message);
                            setLoading('false');
                            setCloseBtn(true);
                        });
                    setLoading('false');
                }
            },
            [formData, router, reset, setCloseBtn, setScreen],
        ),
        onError: useCallback(
            (error) => {
                setCloseBtn(true);
                setLoading('false');
                setErrorMessage(error.message);
                console.log('error', error.message);
            },
            [setCloseBtn, setErrorMessage],
        ),
    });

    const onSubmitHandler = (data: any) => {
        setFormData(data);
        setCloseBtn(false);
        setLoading('true');
        // setScreen(OnboardingScreens.SCREEN_2);
        console.log('📌📌📌📌📌📌', errorMessage);

        const { firstName, lastName, email, password } = data;

        const input = {
            firstName,
            lastName,
            email,
            password,
        };
        console.log('input', input);

        return signUpUser({ variables: { input } });
    };

    return (
        <OnBoardingContainerStyle color={theme.navy.primary} loading={loading}>
            <ContainerStyle>
                <OnBoardingSubHeaderRow>
                    <Col md={6}>
                        <OnboardingBannerStyled>
                            <Image src={screen1} alt="card-img" objectFit="contain" priority />
                        </OnboardingBannerStyled>
                    </Col>
                    <OnBoardingHeaderCol md={6}>
                        <div className="onboarding-header-text onboarding-1">
                            <Title level={2} className="signUpHeading">
                                Welcome to Roundtable
                            </Title>
                            <SubHeading>by The 92nd Street Y, New York</SubHeading>
                            <Text className="sub-header">
                                Create an account to register for courses, access course ZOOM links or retrieve course
                                materials
                            </Text>
                            <FormDiv className="form-input">
                                <form onSubmit={handleSubmit(onSubmitHandler)}>
                                    <CustomNameLabel>
                                        <Col md={12} lg={6} xs={12}>
                                            <CustomLabel>First Name</CustomLabel>
                                            <CustomInput
                                                {...register('firstName')}
                                                type="text"
                                                placeholder="First"
                                                // defaultValue={formData && formData.fullName}
                                            />
                                            {errors.firstName && (
                                                <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
                                            )}
                                        </Col>
                                        <Col md={12} lg={6} xs={12}>
                                            <CustomLabel>Last Name</CustomLabel>
                                            <CustomInput
                                                {...register('lastName')}
                                                type="text"
                                                placeholder="Last"
                                                // defaultValue={formData && formData.fullName}
                                            />
                                            {errors.lastName && <ErrorMessage>{errors.lastName?.message}</ErrorMessage>}
                                        </Col>
                                    </CustomNameLabel>

                                    <CustomLabel>email</CustomLabel>
                                    <CustomInput
                                        {...register('email')}
                                        type="text"
                                        placeholder="email@example.com"
                                        // defaultValue={formData && formData.email}
                                    />
                                    {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
                                    <CustomLabel>password</CustomLabel>
                                    <CustomInput
                                        {...register('password')}
                                        type={showPassword ? 'password' : 'text'}
                                        placeholder="Select Password"
                                        // defaultValue={formData && formData.password}
                                    />
                                    <span
                                        className="material-icons-outlined"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                    {errors.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
                                    <CustomInfoLavel>
                                        Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and
                                        one special case Character.
                                    </CustomInfoLavel>
                                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                    <Text>
                                        By signing up you agree to our{' '}
                                        <Link href="/term-of-services" passHref>
                                            <a
                                                className="text-white text-decoration-underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Terms of service
                                            </a>
                                        </Link>
                                    </Text>

                                    <FormFooter>
                                        <FormFooterDiv>
                                            <Text>Already have an account?</Text>
                                            <Text className="text-decoration-underline">
                                                <a
                                                    onClick={() => {
                                                        setScreen(OnboardingScreens.LOGIN);
                                                    }}
                                                >
                                                    Sign in
                                                </a>
                                            </Text>
                                        </FormFooterDiv>

                                        {loading === 'true' ? (
                                            <Button
                                                bgcolor="#F9D8C5"
                                                color="#000000"
                                                className="align-self-end"
                                                disabled={loading === 'true' && true}
                                                lg
                                            >
                                                <span
                                                    className="spinner-border spinner-border-sm text-dark me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                Loading...
                                            </Button>
                                        ) : (
                                            <Button
                                                btnType="submit"
                                                bgcolor="#F9D8C5"
                                                color="#000000"
                                                className="align-self-end"
                                                lg
                                            >
                                                Next
                                            </Button>
                                        )}
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
export default Screen1;
