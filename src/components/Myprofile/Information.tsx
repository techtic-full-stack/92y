import { FC, useCallback, useEffect, useState } from 'react';
import { GlobalContainerStyle } from '@components/Global/style';
import { SettingStyle, SettingCard } from './style';
import { Col, Row, Typography } from 'antd';
import { Edit } from '../icons/edit';
import Button from '@components/Button';
import theme from 'theme';
import { ErrorMessage, FormDiv, CustomInput, CustomNameLabel } from '@components/Onboarding/style';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROFILE_DETAILS, GetUserDetails, UpdateUserInfo, UpdateUserVariables } from '@queries/user';
const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
});
const { Title } = Typography;
const Information: FC = () => {
    const [editInfo, setEditInfo] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });
    const [updateUserData] = useMutation<UpdateUserVariables>(UpdateUserInfo, {
        onError: useCallback(
            (error) => {
                setErrorMessage(error.message);
                console.log('error', error.message);
            },
            [setErrorMessage],
        ),
    });
    const { data: userData } = useQuery<GetUserDetails>(GET_PROFILE_DETAILS, {
        fetchPolicy: 'network-only',
    });
    useEffect(() => {
        reset(userData);
    }, [reset, userData]);
    const onSubmitHandler = (profileData: any) => {
        const firstName = profileData.firstName;
        const lastName = profileData.lastName;
        updateUserData({
            variables: {
                firstName,
                lastName,
                userId: userData?.userDetails[0].id,
            },
        });
        setEditInfo(true);
    };
    return (
        <SettingStyle editInfo={editInfo}>
            <GlobalContainerStyle>
                <SettingCard className="info">
                    <Title level={2} className="title">
                        Profile
                    </Title>
                    <span onClick={() => setEditInfo(false)}>
                        <Edit />
                    </span>
                    <FormDiv className="form-input profile-info">
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <CustomNameLabel>
                                <Col xs={24} lg={12} md={12}>
                                    <CustomInput
                                        {...register('firstName')}
                                        type="name"
                                        defaultValue={userData?.userDetails[0]?.firstName}
                                        placeholder="Enter First Name"
                                        // required
                                    />
                                    {errors.firstName && <ErrorMessage>{errors.firstName?.message}</ErrorMessage>}
                                </Col>
                                <Col xs={24} lg={12} md={12}>
                                    <CustomInput
                                        {...register('lastName')}
                                        type="name"
                                        defaultValue={userData?.userDetails[0]?.lastName}
                                        placeholder="Enter Last Name"
                                        // required
                                    />
                                    {errors.lastName && <ErrorMessage>{errors.lastName?.message}</ErrorMessage>}
                                </Col>
                            </CustomNameLabel>
                            <Row>
                                <Col xs={24} lg={24} md={24}>
                                    {' '}
                                    <CustomInput
                                        {...register('email')}
                                        className="not-allowed-input"
                                        type="email"
                                        defaultValue={userData?.userDetails[0]?.email}
                                        placeholder="Enter Email"
                                        required
                                        readOnly
                                    />
                                </Col>
                                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                            </Row>
                            {!editInfo && (
                                <Row>
                                    <Col>
                                        <Button
                                            bgcolor="transparent"
                                            type="secondary"
                                            color={theme.navy.primary}
                                            onClick={() => {
                                                setEditInfo(true);
                                                // reset();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Col>
                                    <Col className="ms-2">
                                        <Button btnType="submit" bgcolor={theme.navy.primary} color={theme.white} lg>
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                        </form>
                    </FormDiv>
                </SettingCard>
            </GlobalContainerStyle>
        </SettingStyle>
    );
};
export default Information;
