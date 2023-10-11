import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import fetch from 'cross-fetch';

interface PendingSessionRefresh {
    exp?: number;
    promise?: Promise<CognitoUserSession>;
}
const pendingRefresh: PendingSessionRefresh = {};
const currentSession = async () => {
    const session = await Auth.currentSession();
    const exp = session.getIdToken().getExpiration();
    const epoch = new Date().getTime() / 1000;
    const isExp = epoch > exp;

    if (isExp && pendingRefresh.exp !== exp) {
        pendingRefresh.exp = exp;
        const user = (await Auth.currentUserPoolUser()) as CognitoUser;
        const refreshToken = session.getRefreshToken();
        if (refreshToken) {
            const p = (pendingRefresh.promise = new Promise((resolve, reject) => {
                user.refreshSession(refreshToken, (err, result) => {
                    if (err) {
                        console.log('user.refreshSession', err);
                        return reject(err);
                    }
                    return resolve(result);
                });
            }));
            p.catch((e) => {
                console.log('refreshToken', e);
                localStorage.clear();
                window.location.reload();
            });
        }
    }
    if (!isExp) {
        return Promise.resolve(session);
    }

    return pendingRefresh.promise;
};
const buildAuthHeaders = async ({ headers = {} }) => {
    return currentSession()
        .then((session) => {
            if (!session) {
                return headers;
            }
            return {
                headers: {
                    ...headers,
                    Authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
                },
            };
        })
        .catch((e) => {
            console.log(e);
            return {
                headers,
            };
        });
};
const authLink = setContext((_, context) => buildAuthHeaders(context));

interface Props {
    initialState?: any;
    headers?: any;
    ssrMode?: boolean;
}
const newApollo = ({ initialState, headers, ssrMode }: Props) => {
    const cache = new InMemoryCache();
    cache.restore(initialState || {});
    return new ApolloClient({
        link: ApolloLink.from([
            authLink,
            onError(({ response, networkError }) => {
                response?.errors?.map((e) => {
                    if (e.extensions?.code === 'validation-failed') {
                        e.message =
                            'Unexpected error, if the problem persists try logging out. If the problem' +
                            ' still persists please contact support.';
                    }
                    return e;
                });

                if (networkError) console.log(`[Network error]: ${networkError}`);
            }),
            new HttpLink({
                uri: process.env.GRAPHQL_ENDPOINT,
                fetch,
                headers,
            }),
        ]),
        ssrMode,
        cache,
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network',
            },
        },
    });
};
export default newApollo;
