import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import { GlobalContainerStyle } from '@components/Global/style';
import { convertToString } from '@components/utils';
import { Typography } from 'antd';
import { FC, useMemo } from 'react';
import { Col } from 'react-bootstrap';
import theme from 'theme';
import { OnBoardingContainerStyle, OnBoardingHeaderCol, OnBoardingSubHeaderRow, OnboardRow } from './style';
import { BackArrow } from '@components/icons/back-arrow';

const { Title, Text } = Typography;

type OnboardingPreferencesProps = {
    onChange: (e?: any) => void;
    selectedPreferences: string[];
    backButtonAction?: (value?: any) => any;
    backButtonLabel?: string;
    nextButtonAction?: (value?: any) => any;
    nextButtonLabel?: string;
    data?: any[];
    heading: string;
    subheading: string;
    description: string;
    isLoading?: boolean;
};

const OnboardingPreferences: FC<OnboardingPreferencesProps> = ({
    onChange,
    selectedPreferences,
    data,
    heading,
    subheading,
    description,
    backButtonAction,
    backButtonLabel,
    nextButtonAction,
    nextButtonLabel,
    isLoading,
}) => {
    const showBackButton = useMemo(() => backButtonAction && backButtonLabel, [backButtonAction, backButtonLabel]);
    const showNextButton = useMemo(() => nextButtonAction && nextButtonLabel, [nextButtonAction, nextButtonLabel]);

    return (
        <OnBoardingContainerStyle color={theme.navy.primary}>
            <GlobalContainerStyle className="px-3">
                <OnBoardingSubHeaderRow>
                    <OnBoardingHeaderCol md={12}>
                        <div className="onboarding-header-text onboardingText">
                            <Title level={2} className="thirdPage">
                                {heading}
                            </Title>

                            <Text className="sub-header">{subheading}</Text>

                            <OnboardRow className="d-flex align-items-center">
                                {data ? (
                                    <>
                                        (
                                        <Col md={12}>
                                            <Title level={3}>{description}</Title>
                                        </Col>
                                        <Col md={12} className="btnChkBx">
                                            {data.map((tag, index) => {
                                                const check = selectedPreferences.includes(tag.value);

                                                return (
                                                    <Checkbox
                                                        key={index}
                                                        checked={check}
                                                        value={tag.value}
                                                        onChange={onChange}
                                                        checkedColor={theme.white}
                                                        label={convertToString(`${tag.value}`)}
                                                        name={convertToString(`${tag.value}`)}
                                                        textColor={theme.black}
                                                        defaultTextColor="white"
                                                    />
                                                );
                                            })}
                                        </Col>
                                        <Col md={12} className="btnCol">
                                            {showBackButton && (
                                                <Button
                                                    onClick={backButtonAction}
                                                    bgcolor="#F9D8C5"
                                                    color="#000000"
                                                    className="me-2"
                                                    disabled={isLoading}
                                                    leftIcon={() => <BackArrow />}
                                                >
                                                    {backButtonLabel}
                                                </Button>
                                            )}

                                            {showNextButton && (
                                                <Button
                                                    onClick={nextButtonAction}
                                                    bgcolor="#F9D8C5"
                                                    color="#000000"
                                                    disabled={isLoading}
                                                >
                                                    {nextButtonLabel}
                                                </Button>
                                            )}
                                        </Col>{' '}
                                    </>
                                ) : (
                                    <Col md={12}>
                                        <div className="spinner-border text-light d-flex m-auto" role="status" />
                                    </Col>
                                )}
                            </OnboardRow>
                        </div>
                    </OnBoardingHeaderCol>
                </OnBoardingSubHeaderRow>
            </GlobalContainerStyle>
        </OnBoardingContainerStyle>
    );
};

export default OnboardingPreferences;
