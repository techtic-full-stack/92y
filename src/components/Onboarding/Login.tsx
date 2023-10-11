/* eslint-disable jsx-a11y/anchor-is-valid */
import { OnboardingScreens } from '@components/Modal/types';
import { FC, useState } from 'react';
import { Col } from 'react-bootstrap';
import { Typography } from 'antd';
import {
    ErrorMessage,
    FormDiv,
    CustomInput,
    OnBoardingContainerStyle,
    OnBoardingSubHeaderRow,
    OnBoardingHeaderCol,
    OnboardingBannerStyled,
    ContainerStyle,
    FormFooter,
    CustomLabel,
    LoginFooter,
    SubHeading,
} from './style';
import login from 'public/onboarding/login.svg';
import Image from 'next/image';
import Button from '@components/Button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

const schema = yup.object().shape({
    email: yup.string().email('Please Enter a valid Email').required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be 8 digit atleast')
        .max(32, 'Password must be less than 32 digit')
        .required('Password is required'),
});

type LoginProps = {
    setScreen: (screen: OnboardingScreens) => void;
    setIsModalVisible: (value: boolean) => void;
    setLoginScreen?: (value: OnboardingScreens) => void;
    setCloseBtn: (value: boolean) => void;
    setCheckoutVisible?: any;
};
const defaultValue = {
    email: 'keyston+cw@utilitynyc.com',
    password: 'Devaccount1',
};

const Login: FC<LoginProps> = ({ setScreen, setIsModalVisible, setLoginScreen, setCloseBtn, setCheckoutVisible }) => {
    const [showPassword, setShowPassword] = useState(true);
    const [formData, setFormData] = useState(defaultValue);
    const [loading, setLoading] = useState('false');
    const [loginError, setLoginError] = useState();
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

    const onSubmitHandler = async (data: any) => {
        setLoading('true');
        setCloseBtn(false);
        setFormData(data);
        await Auth.signIn(data.email, data.password)
            .then((user) => {
                try {
                    setCloseBtn(true);
                    setIsModalVisible(false);
                    setLoading('false');
                    console.log('✔️✔️✔️', user, formData);
                    localStorage.setItem('accessToken', user.signInUserSession.accessToken.jwtToken);
                    router.replace(router.asPath);
                    setCheckoutVisible(true);
                    reset();
                } catch (error) {}
            })
            .catch((error) => {
                console.log('❌❌❌', error.message);
                setLoginError(error.message);
                setCloseBtn(true);
                setLoading('false');
            });
    };
    const { Title, Text } = Typography;

    return (
        <OnBoardingContainerStyle loading={loading}>
            <ContainerStyle>
                <OnBoardingSubHeaderRow>
                    <Col md={6}>
                        <OnboardingBannerStyled>
                            <Image src={login} alt="card-img" objectFit="contain" priority />
                        </OnboardingBannerStyled>
                    </Col>
                    <OnBoardingHeaderCol md={6}>
                        <div className="onboarding-header-text onboarding-1">
                            <Title level={2} className="signUpHeading">
                                Welcome back <br />
                                to Roundtable
                            </Title>
                            <SubHeading>by The 92nd Street Y, New York</SubHeading>
                            <Text className="sub-header">
                                Sign in to register for courses or access your ZOOM links and course materials
                            </Text>
                            <FormDiv className="form-input">
                                <form onSubmit={handleSubmit(onSubmitHandler)}>
                                    {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
                                    <CustomLabel>email</CustomLabel>
                                    <CustomInput {...register('email')} placeholder="Email" type="text" />
                                    {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
                                    <CustomLabel>password</CustomLabel>
                                    <CustomInput
                                        {...register('password')}
                                        placeholder="Password"
                                        type={showPassword ? 'password' : 'text'}
                                    />
                                    <span
                                        className="material-icons-outlined"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                    {errors.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
                                    <Text className="forgot-password text-decoration-underline">
                                        <a onClick={() => setScreen(OnboardingScreens.FORGOT_PASSWORD)}>
                                            Forgot Password?
                                        </a>
                                    </Text>
                                    <FormFooter className="align-items-end">
                                        <LoginFooter>
                                            <Text>Don’t have an account?</Text>
                                            <Text className="text-decoration-underline">
                                                <a
                                                    onClick={() => {
                                                        setScreen(OnboardingScreens.SIGNUP);
                                                        setLoginScreen?.(OnboardingScreens.SIGNUP);
                                                    }}
                                                >
                                                    Sign up
                                                </a>
                                            </Text>
                                        </LoginFooter>

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
                                                Login
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
export default Login;
