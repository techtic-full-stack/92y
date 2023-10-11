/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from 'react';
import { Typography } from 'antd';
import {
    ErrorMessage,
    FormDiv,
    CustomInput,
    OnBoardingContainerStyle,
    OnBoardingSubHeaderRow,
    OnBoardingHeaderCol,
    ContainerStyle,
    CustomLabel,
} from './style';
import Button from '@components/Button';
import theme from 'theme';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import { OnboardingScreens } from '@components/Modal/types';

const schema = yup.object().shape({
    password: yup
        .string()
        .min(8, 'Password must be 8 digit atleast')
        .max(32, 'Password must be less than 32 digit')
        .required('Password is required')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
        ),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

type ResetPasswordProps = {
    setFormData?: any;
    formData?: any;
    setScreen: (screen: OnboardingScreens) => void;
    setCloseBtn: (value: boolean) => void;
};

const ResetPassword: FC<ResetPasswordProps> = ({ setFormData, setScreen, setCloseBtn, formData }) => {
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [CodeError, setCodeError] = useState();
    const [loading, setLoading] = useState('false');
    const [EmailID, setEmailID] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        if (formData?.email) {
            setEmailID(formData.email);
        }
    }, [formData]);
    const onSubmitHandler = (data: any) => {
        setCloseBtn(false);
        setLoading('true');
        setFormData(data);
        Auth.forgotPasswordSubmit(EmailID, data.code, data.confirmPassword)
            .then(() => {
                setScreen(OnboardingScreens.LOGIN);
                setCloseBtn(true);
                setLoading('false');
                reset();
            })
            .catch((error) => {
                setCodeError(error.message);
                setCloseBtn(true);
                setLoading('false');
            });
    };
    const { Title, Text } = Typography;
    return (
        <OnBoardingContainerStyle color={theme.navy.primary} loading={loading}>
            <ContainerStyle className="d-flex justify-content-center forgot">
                <OnBoardingSubHeaderRow>
                    <OnBoardingHeaderCol>
                        <motion.div
                            animate={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5 }}
                            className="onboarding-header-text onboarding-1 text-center"
                        >
                            <Title level={2}>Reset Password</Title>
                            <Text className="sub-header">
                                Resetting password for
                                <br />
                                <b>{EmailID}</b>
                            </Text>
                            <FormDiv className="form-input">
                                <form className="reset-form" onSubmit={handleSubmit(onSubmitHandler)}>
                                    <CustomLabel className="d-flex">Verification Code</CustomLabel>
                                    <CustomInput
                                        {...register('code')}
                                        placeholder="Verification Code"
                                        type={'number'}
                                        onCopy={(e) => {
                                            e.preventDefault();
                                            return false;
                                        }}
                                    />
                                    <CustomLabel className="d-flex">New Password</CustomLabel>
                                    <CustomInput
                                        {...register('password')}
                                        placeholder="New Password"
                                        type={showPassword ? 'password' : 'text'}
                                        onCopy={(e) => {
                                            e.preventDefault();
                                            return false;
                                        }}
                                    />
                                    <span
                                        className="material-icons-outlined"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                    {errors.password && (
                                        <ErrorMessage className="d-flex text-left">
                                            {errors.password?.message}
                                        </ErrorMessage>
                                    )}
                                    <CustomLabel className="d-flex">Confirm password</CustomLabel>
                                    <CustomInput
                                        {...register('confirmPassword')}
                                        placeholder="Confirm Password"
                                        type={showConfirmPassword ? 'password' : 'text'}
                                        onPaste={(e) => {
                                            e.preventDefault();
                                            return false;
                                        }}
                                    />
                                    <span
                                        className="material-icons-outlined"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                    {errors.confirmPassword && (
                                        <ErrorMessage className="d-flex text-left">
                                            {errors.confirmPassword?.message}
                                        </ErrorMessage>
                                    )}
                                    {CodeError && <ErrorMessage className="text-left">{CodeError}</ErrorMessage>}
                                    <Button className="mt-2" btnType="submit" bgcolor="#F9D8C5" color="#000000" lg>
                                        Confirm
                                    </Button>
                                </form>
                            </FormDiv>
                        </motion.div>
                    </OnBoardingHeaderCol>
                </OnBoardingSubHeaderRow>
            </ContainerStyle>
        </OnBoardingContainerStyle>
    );
};
export default ResetPassword;
