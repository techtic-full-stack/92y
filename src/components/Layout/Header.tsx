/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState, useCallback } from 'react';
import Navbar from './Navbar';
import Link from 'next/link';
import { Col, Drawer } from 'antd';
import { PageHeader, HeaderRow, StyledLogo } from './styles';
import { GlobalContainerStyle } from '@components/Global/style';
import { Sling as Hamburger } from 'hamburger-react';
import Global92UModal from '@components/Modal/92UModal';
import { useRouter } from 'next/router';
import useWindowDimensions from '../../hooks/windowSize';
type HeaderProps = {
    navbarColor?: string;
    buttonText?: string;
    learner?: string;
};

const LogoContainerSection: FC = () => {
    return (
        <Link href="/" passHref>
            <a>
                <StyledLogo />
            </a>
        </Link>
    );
};

const Header: FC<HeaderProps> = ({ navbarColor, buttonText, learner }) => {
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const [is92UModalVisible, setIs92UModalVisible] = useState(false);
    const windowWidth = useWindowDimensions();
    const showDrawer = useCallback(() => {
        setVisible(!visible);
    }, [visible, setVisible]);

    useEffect(() => {
        if (windowWidth.width > 1057) {
            setVisible(false);
        }
    }, [windowWidth.width]);

    useEffect(() => {
        const redirect = router.query?.redirect?.toString().toLowerCase();

        if (redirect === '92u') {
            setIs92UModalVisible(true);
        }
    }, [router]);
    return (
        <PageHeader color={navbarColor}>
            <Global92UModal setIs92UModalVisible={setIs92UModalVisible} is92UModalVisible={is92UModalVisible} />
            <GlobalContainerStyle>
                <HeaderRow className="top-header">
                    <Col lg={5} xs={21} className="text-start">
                        <LogoContainerSection />
                    </Col>
                    <Col lg={19} xs={3} className={`d-grid align-items-center menu-col desktop-menu`}>
                        <Navbar button={buttonText} learner={learner} menuMode="horizontal" />
                    </Col>
                    <Col lg={19} xs={3} className={`d-grid align-items-center menu-col mobile-menu`}>
                        <>
                            <Hamburger
                                size={25}
                                duration={0.8}
                                direction="right"
                                toggled={visible}
                                toggle={setVisible}
                            />
                            <Drawer
                                headerStyle={{ display: 'none' }}
                                drawerStyle={{ background: `${navbarColor}` }}
                                height="100%"
                                placement="top"
                                closable
                                visible={visible}
                            >
                                <Navbar
                                    button={buttonText}
                                    learner={learner}
                                    menuMode="vertical"
                                    showDrawer={showDrawer}
                                />
                            </Drawer>
                        </>
                    </Col>
                </HeaderRow>
            </GlobalContainerStyle>
        </PageHeader>
    );
};

export default Header;
