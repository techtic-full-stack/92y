/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@components/Button';
import PopupModal from '@components/Modal/PopupModal';
import { OnboardingScreens } from '@components/Modal/types';
import { Auth } from 'aws-amplify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState, useEffect } from 'react';
import theme from '../../theme';
import { Dot } from '../icons/dot';
import { NavMenu, NavMenuItems } from './styles';
import { DropDownArrow } from '../icons/drop-down-arrow';
import { RightArrow } from '../icons/right-arrow';
import { browserName } from 'react-device-detect';

const { SubMenu } = NavMenu;

type NavbarProps = {
    button?: string;
    learner?: string;
    menuMode: 'horizontal' | 'vertical' | 'inline';
    showDrawer?: () => void;
};

const Navbar: FC<NavbarProps> = ({ button, learner, menuMode, showDrawer }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isBrowser, setIsBrowser] = useState('');
    const [loginScreen, setLoginScreen] = useState<OnboardingScreens>();
    const router = useRouter();
    const handleLogin = () => {
        setLoginScreen(OnboardingScreens.LOGIN);
        setIsModalVisible(true);
    };
    useEffect(() => {
        if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
            setIsBrowser(browserName);
        }
    }, []);

    const handleSignup = () => {
        setLoginScreen(OnboardingScreens.SIGNUP);
        setIsModalVisible(true);
    };

    const handleLogout = () => {
        Auth.signOut();
        localStorage.clear();

        router.replace(router.asPath);
    };
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    const loginAuth = typeof window !== 'undefined' ? localStorage.getItem('loginAuth') : null;

    useEffect(() => {
        if (loginAuth) {
            setIsModalVisible(true);
            setLoginScreen(OnboardingScreens.LOGIN);
        }
        localStorage.removeItem('loginAuth');
    }, [loginAuth]);
    return (
        <>
            <PopupModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                loginScreen={loginScreen}
                setLoginScreen={setLoginScreen}
            />
            <NavMenu mode={menuMode} onClick={showDrawer}>
                <NavMenuItems
                    key="courses"
                    icon={
                        <>
                            <Dot className={`dot-icon ${isBrowser}-dot`} />
                            <RightArrow
                                arrowColor={
                                    router.pathname === '/courses' ||
                                    router.pathname === '/class/live/[slug]' ||
                                    router.pathname === '/class/course/[slug]'
                                        ? theme.yellow.secondary
                                        : theme.white
                                }
                                className="right-arrow"
                            />
                        </>
                    }
                    className={
                        router.pathname === '/courses' ||
                        router.pathname === '/class/live/[slug]' ||
                        router.pathname === '/class/course/[slug]'
                            ? 'active menu-items'
                            : 'menu-items'
                    }
                >
                    <Link href={`/courses`} passHref>
                        <a>Courses</a>
                    </Link>
                </NavMenuItems>
                <NavMenuItems
                    key="educators-all"
                    icon={
                        <>
                            <Dot className={`dot-icon ${isBrowser}-dot`} />
                            <RightArrow
                                arrowColor={
                                    router.pathname === '/experts-and-artists' || router.pathname === '/educator/[slug]'
                                        ? theme.yellow.secondary
                                        : theme.white
                                }
                                className="right-arrow"
                            />
                        </>
                    }
                    className={
                        router.pathname === '/experts-and-artists' || router.pathname === '/educator/[slug]'
                            ? 'active menu-items'
                            : 'menu-items'
                    }
                >
                    <Link href={`/experts-and-artists`} passHref>
                        <a>Experts and Artists</a>
                    </Link>
                </NavMenuItems>
                {learner && (
                    <NavMenuItems
                        key="learner"
                        icon={
                            <>
                                <Dot className={`dot-icon ${isBrowser}-dot`} />
                                <RightArrow arrowColor={theme.white} className="right-arrow" />
                            </>
                        }
                        className="menu-items"
                    >
                        <Link href={`/`} passHref>
                            <a>{learner}</a>
                        </Link>
                    </NavMenuItems>
                )}
                {accessToken == null && (
                    <NavMenuItems
                        key="login"
                        icon={
                            <>
                                <Dot className={`dot-icon ${isBrowser}-dot`} />
                                <RightArrow arrowColor={theme.white} className="right-arrow" />
                            </>
                        }
                        className="menu-items"
                    >
                        <a onClick={handleLogin}>Login</a>
                    </NavMenuItems>
                )}
                {accessToken == null && (
                    <NavMenuItems key="button">
                        <Button bgcolor={theme.yellow.secondary} onClick={handleSignup} rightIcon color="#000000">
                            {button}
                        </Button>
                    </NavMenuItems>
                )}
                {accessToken !== null && (
                    <SubMenu
                        key="my-account"
                        className={
                            router.pathname === '/my-courses' ||
                            router.pathname === '/my-courses/[slug]' ||
                            router.pathname === '/my-profile/[slug]'
                                ? 'active-dropdown'
                                : ''
                        }
                        icon={
                            <>
                                <Dot className="dot-icon" />
                                <DropDownArrow className="down-arrow" />
                            </>
                        }
                        title="My Account"
                    >
                        <NavMenuItems key="my-courses">
                            <Link href={`/my-courses`} passHref>
                                <a>My Courses</a>
                            </Link>
                        </NavMenuItems>

                        <NavMenuItems key="my-profile">
                            <Link href={`/my-profile/my-information`} passHref>
                                <a>My Profile</a>
                            </Link>
                        </NavMenuItems>

                        <NavMenuItems key="logout">
                            <Link href="/" passHref>
                                <a onClick={handleLogout}>Logout</a>
                            </Link>
                        </NavMenuItems>
                    </SubMenu>
                )}
            </NavMenu>
        </>
    );
};

export default Navbar;
