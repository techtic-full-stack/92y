import '@styles/antd.less';
import '@styles/app.scss';
import { Auth } from 'aws-amplify';
import type { AppProps } from 'next/app';
import { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import AWS_CONFIG from '../../aws-config';
import theme from '../theme';

Auth.configure(AWS_CONFIG);

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default MyApp;
