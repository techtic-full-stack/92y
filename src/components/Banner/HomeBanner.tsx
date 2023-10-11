/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, ReactNode } from 'react';
import { Col } from 'react-bootstrap';
import { SubHeaderRow, BannerStyled, BannerContainerStyle, HeaderRightCol, HomeBannerTitle } from './style';
import { GlobalContainerStyle } from '@components/Global/style';
import Image, { StaticImageData } from 'next/image';
import Button from '@components/Button';
import Link from 'next/link';

type HomeBannerProps = {
    children: ReactNode;
    bgcolor: string;
    heading: string;
    buttonText?: string;
    bannerImg: StaticImageData;
};

const HomeBanner: FC<HomeBannerProps> = ({ bgcolor, heading, children, buttonText, bannerImg }) => {
    return (
        <>
            <BannerContainerStyle color={bgcolor}>
                <GlobalContainerStyle>
                    <SubHeaderRow className="align-items-center">
                        <Col md={6}>
                            <BannerStyled>
                                <Image
                                    src={bannerImg}
                                    alt="card-img"
                                    width="100%"
                                    height="100%"
                                    layout="responsive"
                                    objectFit="contain"
                                    priority
                                />
                            </BannerStyled>
                        </Col>
                        <HeaderRightCol md={6}>
                            <div className="header-text">
                                <HomeBannerTitle level={2}>{heading}</HomeBannerTitle>
                                <p>{children}</p>
                                {buttonText === 'Explore courses' && (
                                    <Link href="/courses" passHref>
                                        <a>
                                            <Button bgcolor="#B0AFED" color="#000000">
                                                {buttonText}
                                            </Button>
                                        </a>
                                    </Link>
                                )}
                            </div>
                        </HeaderRightCol>
                    </SubHeaderRow>
                </GlobalContainerStyle>
            </BannerContainerStyle>
        </>
    );
};

export default HomeBanner;
