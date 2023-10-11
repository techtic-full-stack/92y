import { Layout } from 'antd';
import Head from 'next/head';
import favIcon from 'public/favicon.png';
import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import { ChildStyle } from './styles';
import theme from 'theme';

type WrapperType = {
    children: ReactNode;
    title?: string;
    description?: string;
    navbarColor?: string;
    button?: string;
    learner?: string;
    className?: string;
};

const LayoutWrapper: FC<WrapperType> = ({ children, navbarColor=`${theme.navy.primary}`, button, learner, className }) => {
    const siteName = `ADMED | Brand Behind Brand's`;
    const title = `ADMED | Brand Behind Brand's`;
    const description =
        'Roundtable is live, in-the-moment online courses with respected and passionate experts who give you a place at the table to ask questions, join a discussion, and satisfy your curious mind.';
    const titleTag = `${title}`;
    return (
        <>
            <Head>
                <link
                    rel="preload"
                    as="font"
                    href="_next/static/media/roobert-regular-webfont.0d1452a7.woff2"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    as="font"
                    href="_next/static/media/roobert-bold-webfont.42c12a03.woff2"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <title>{titleTag}</title>
                <meta name="description" content={description} />
                <link rel="icon" href={favIcon.src} />
                <meta name="title" content="Roundtable by The 92nd Street Y, New York — Live, Online Courses" />
                <meta name="type" property="og:type" content="website" />
                <meta name="og:image" property="og:image" content="https://roundtable.org/Roundtable_OG_Image.png" />
                <meta name="og:type" content="website" />
                <meta name="og:site_name" content={`${siteName}`} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={description} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={titleTag} />
                <meta name="twitter:description" content={description} />
                <meta name="author" content="92nd Street Y" />
            </Head>
            <Layout className={className ? className : undefined}>
                <Header navbarColor={navbarColor} buttonText={button} learner={learner} />
                <Layout.Content>
                    <ChildStyle>{children}</ChildStyle>
                </Layout.Content>
                <Footer />
            </Layout>
        </>
    );
};

export default LayoutWrapper;
