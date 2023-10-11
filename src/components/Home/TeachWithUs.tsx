/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, ReactNode, useState } from 'react';
import { ApplyBannerStyle, ApplyBannerText, ApplyBannerTitle, TeachWithUsContainer } from './style';
import { GlobalContainerStyle } from '@components/Global/style';
import { Row, Col } from 'react-bootstrap';
import Button from '@components/Button';
import Image, { StaticImageData } from 'next/image';
import theme from 'theme';
import PopupModal from '@components/Modal/PopupModal';
import Link from 'next/link';
import { GetUserDetails, GET_PROFILE_DETAILS } from '@queries/user';
import { useQuery } from '@apollo/client';

type TeachWithUsProps = {
    heading?: string;
    children: ReactNode;
    ApplyImage: StaticImageData;
};

const TeachWithUs: FC<TeachWithUsProps> = ({ heading, children, ApplyImage }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    const { data } = useQuery<GetUserDetails>(GET_PROFILE_DETAILS, {
        skip: !accessToken,
    });
    return (
        <>
            <PopupModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
            <ApplyBannerStyle>
                <GlobalContainerStyle>
                    <TeachWithUsContainer>
                        <Row className="teach-with-us-container mb-5 align-items-center d-flex">
                            <Col md={6} className="teach-with-us-text">
                                <ApplyBannerTitle>{heading}</ApplyBannerTitle>
                                <ApplyBannerText>{children}</ApplyBannerText>
                                {!accessToken ? (
                                    <Button
                                        onClick={() => setIsModalVisible(true)}
                                        bgcolor="#6463B2"
                                        color={theme.white}
                                        lg
                                    >
                                        Sign Up
                                    </Button>
                                ) : data?.userDetails[0].subscription === null ? (
                                    <Link href="/my-profile/purchase-details" passHref>
                                        <a>
                                            <Button bgcolor="#6463B2" color={theme.white} lg>
                                                Subscribe Now
                                            </Button>
                                        </a>
                                    </Link>
                                ) : (
                                    ''
                                )}
                            </Col>
                            <Col md={6} className="text-lg-end text-center img-container">
                                <div className="teach-with-us-img">
                                    <Image src={ApplyImage} alt="teachImg" loading="eager" width={528} height={371} />
                                </div>
                            </Col>
                        </Row>
                    </TeachWithUsContainer>
                </GlobalContainerStyle>
            </ApplyBannerStyle>
        </>
    );
};

export default TeachWithUs;
