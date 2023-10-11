/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';
import TeachWithUs from './TeachWithUs';
import PopularClasses from '@components/PopularClasses';
import DistinguishEducator from './DistinguishEducator';
import {
    EducatorClassesStyled,
    ClassesSectionStyle,
    EducatorHeading,
    HomePageStyle,
    EducatorsStyle,
    EducatorText,
    EducatorContainer,
} from './style';
import { GlobalContainerStyle } from '@components/Global/style';
import { Row, Col } from 'antd';
import Image from 'next/image';
import { GetHomeDataResponse } from '@queries/home';
import ApplyImage from 'public/apply-img.png';
import home1 from 'public/Home/home1.svg';
import home2 from 'public/Home/home2.svg';
import home3 from 'public/Home/home3.svg';
import home4 from 'public/Home/home4.svg';

type EducatorHomePageProps = {
    loading: boolean;
    homeData: GetHomeDataResponse | undefined;
};

const EducatorHomePage: FC<EducatorHomePageProps> = ({ loading, homeData }) => {
    return (
        <>
            <EducatorsStyle>
                <GlobalContainerStyle>
                    <EducatorContainer>
                        <EducatorHeading>Why Our Experts and Artists Work with Us</EducatorHeading>
                        <DistinguishEducator loading={loading} educatorsData={homeData?.educators || []} />
                    </EducatorContainer>
                </GlobalContainerStyle>
            </EducatorsStyle>
            <HomePageStyle>
                <GlobalContainerStyle>
                    <div className="midsection">
                        <Row>
                            <Col lg={12} className="pe-lg-5 d-flex flex-column justify-content-center">
                                <EducatorHeading className="col-heading d-flex align-items-center">
                                    EXPERIMENTATION
                                </EducatorHeading>
                                <EducatorText className="d-flex align-items-center">
                                    Many experts and artists are working on new projects or taking sabbaticals to
                                    explore new areas. Roundtable discussions are the perfect place to explore new
                                    ideas, subjects or responses from interested audiences. Our highly engaged,
                                    critically-thinking participants are the perfect foil for exploration and
                                    experimention.
                                </EducatorText>
                            </Col>
                            <Col lg={12} md={24} className="text-end">
                                <Image src={home1} alt="home1-img" objectFit="contain" priority />
                            </Col>
                        </Row>
                        <Row className="mt-5 pt-5 flex-lg-row flex-column-reverse">
                            <Col lg={12} className="d-grid justify-content-start">
                                <Image src={home2} alt="home1-img" objectFit="contain" priority />
                            </Col>
                            <Col lg={12} className="ps-lg-5 d-flex flex-column justify-content-center">
                                <EducatorHeading className="col-heading d-flex align-items-center">
                                    SUPPORT
                                </EducatorHeading>
                                <EducatorText className="d-flex align-items-center">
                                    Roundtable exists to bring experts and artists closer to their audiences. We create
                                    a supportive, host-first environment, that caters to the expert's and artist's
                                    schedule and provides reliable attendance and respectful interaction.
                                </EducatorText>
                            </Col>
                        </Row>
                        <Row className="mt-5 pt-5">
                            <Col lg={12} className="pe-lg-5 d-flex flex-column justify-content-center">
                                <EducatorHeading className="col-heading d-flex align-items-center">
                                    ENTHUSIASM
                                </EducatorHeading>
                                <EducatorText className="d-flex align-items-center">
                                    Our participants are present because of personal interest and passions - not out of
                                    obligation. They are literally invested in our topics because they pay to attend and
                                    to ask the questions that they are most curious about. Participants like these are
                                    the impetous to the great joy of sharing knowledge. Roundtable attracts this
                                    audience in abundance, and we invite our experts and artists to experience that
                                    culture and rapport with every discussion they lead.
                                </EducatorText>
                            </Col>
                            <Col lg={12} md={24} className="text-end">
                                <Image src={home3} alt="home1-img" objectFit="contain" priority />
                            </Col>
                        </Row>
                        <Row className="mt-5 pt-5 flex-lg-row flex-column-reverse">
                            <Col lg={12} className="d-grid justify-content-start">
                                <Image src={home4} alt="home1-img" objectFit="contain" priority />
                            </Col>
                            <Col lg={12} className="ps-lg-5 d-flex flex-column justify-content-center">
                                <EducatorHeading className="col-heading d-flex align-items-center">
                                    PEERAGE
                                </EducatorHeading>
                                <EducatorText className="d-flex align-items-center">
                                    Roundtable by The 92nd Street Y, New York attracts the best in the field because of
                                    its historic field of exceptoinal thinkers and influential partners developed
                                    through the heritage of The 92nd Street Y, New York. We never loose sight of the
                                    level of quality that has set our standard.
                                </EducatorText>
                            </Col>
                        </Row>
                    </div>
                </GlobalContainerStyle>
            </HomePageStyle>
            <TeachWithUs heading="Experience Our Experts and Artists" ApplyImage={ApplyImage}>
                Our membership is made for the always curious, like yourself. Take a class or buy a subscription and
                explore why experts, artists, exceptoinal thinkers and influential partners choose us.{' '}
            </TeachWithUs>
            <ClassesSectionStyle>
                <GlobalContainerStyle>
                    <EducatorClassesStyled>
                        <div className="title">
                            <h1>Latest Classes</h1>
                        </div>
                        <div className="cards">
                            <Row gutter={[26, 48]}>
                                <PopularClasses coursesData={homeData?.courses || []} loading={loading} />
                            </Row>
                        </div>
                    </EducatorClassesStyled>
                </GlobalContainerStyle>
            </ClassesSectionStyle>
        </>
    );
};

export default EducatorHomePage;
