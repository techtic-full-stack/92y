/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { Row, Col } from 'antd';
import { ResourceList, FooterPage, FooterRow, SpanText, StyledLogo, SocialIconList } from './styles';
import { GlobalContainerStyle } from '@components/Global/style';
import Link from 'next/link';
import { BloomBergeLogo } from '@components/icons/bloomberge-logo';
import { Facebook } from '@components/icons/facebook';
import { Instagram } from '@components/icons/instagram';
import { LinkedIn } from '@components/icons/linkedin';
import { Twitter } from '@components/icons/twitter';

const LogoContainerSection: FC = () => {
    return (
        <Link href="/" passHref>
            <a>
                <StyledLogo />
            </a>
        </Link>
    );
};

const Footer: FC = () => {
    return (
        <>
            <FooterPage>
                <GlobalContainerStyle>
                    <Row>
                        <Col xl={12} lg={10} md={24} sm={24} xs={24}>
                            <LogoContainerSection />
                        </Col>
                        <Col xl={12} lg={14} md={24} sm={24} xs={24}>
                            <FooterRow>
                                <Col xl={8} md={8} sm={8} lg={8} xs={24}>
                                    <SpanText>RESOURCES</SpanText>
                                    <ResourceList>
                                        <li>
                                            <Link href="/term-of-services" passHref>
                                                <a className="text-decoration-underline">Terms of Service</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/faq" passHref>
                                                <a className="text-decoration-underline">FAQs</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.92y.org/"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-decoration-underline"
                                            >
                                                Visit 92NY
                                            </a>
                                        </li>
                                    </ResourceList>
                                </Col>
                                <Col xl={8} md={8} sm={8} lg={8} xs={24}>
                                    <SpanText>CONTACT US</SpanText>
                                    <ResourceList>
                                        <li>
                                            <a
                                                className="text-decoration-underline"
                                                href="mailto:hello@roundtable.org"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                hello@roundtable.org
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-decoration-underline" href="tel:+1 (212) 699-7200">
                                                +1 (212) 699-7200
                                            </a>
                                        </li>
                                        <SocialIconList>
                                            <a
                                                href="https://twitter.com/Roundtable_92NY"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Twitter />
                                            </a>
                                            <a
                                                href="https://www.instagram.com/roundtable_92ny/"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Instagram />
                                            </a>
                                            <a
                                                href="https://www.linkedin.com/company/roundtable-by-the-92nd-street-y-new-york/about/"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <LinkedIn />
                                            </a>
                                            <a
                                                href="https://www.facebook.com/Roundtable.92NY/"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Facebook />
                                            </a>
                                        </SocialIconList>
                                    </ResourceList>
                                </Col>
                                <Col xl={8} md={8} sm={8} lg={8} xs={24}>
                                    <a href="https://www.bloomberg.org/" target="_blank" rel="noreferrer">
                                        <BloomBergeLogo />
                                    </a>
                                </Col>
                            </FooterRow>
                        </Col>
                    </Row>
                </GlobalContainerStyle>
            </FooterPage>
        </>
    );
};

export default Footer;
