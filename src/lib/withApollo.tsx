import { ApolloClient, ApolloProvider } from '@apollo/client';

import { IncomingHttpHeaders } from 'http';
import { NextPage, NextPageContext } from 'next';
import App, { AppContext } from 'next/app';
import React, { ReactNode } from 'react';
import newApollo from './newApollo';

export interface WithApolloOptions {
    getDataFromTree?: (tree: ReactNode, context?: { [key: string]: any }) => Promise<any>;
    render?: (props: { Page: NextPage<any>; props: any }) => any;
    onError?: (error: Error, ctx?: NextPageContext) => void;
}

export interface WithApolloState<TCache> {
    data?: TCache;
}

export interface WithApolloProps<TCache> {
    apolloState: WithApolloState<TCache>;
    apollo: ApolloClient<TCache>;
}

export interface InitApolloOptions<TCache> {
    ctx?: NextPageContext;
    headers?: IncomingHttpHeaders;
    ssrMode?: boolean;
    initialState?: TCache;
}

export type InitApolloClient<TCache> = (options: InitApolloOptions<TCache>) => ApolloClient<TCache>;

export interface ApolloPageContext<C = any> extends NextPageContext {
    // Custom prop added by withApollo
    apolloClient: ApolloClient<C>;
}

export interface ApolloAppContext<C = any> extends AppContext {
    ctx: ApolloPageContext<C>;
    AppTree: any;
}

export type ApolloContext<C = any> = ApolloPageContext<C> | ApolloAppContext<C>;
// Polyfill fetch
//import 'isomorphic-unfetch';

let globalApolloClient: ApolloClient<any>;

function getClient<TCache>(clientFn: InitApolloClient<TCache>, options: InitApolloOptions<TCache> = {}) {
    if (typeof clientFn !== 'function') {
        throw new Error('[withApollo] requires a function that returns an ApolloClient');
    }

    return clientFn(options);
}
export function initApollo<TCache = any>(
    clientFn: InitApolloClient<TCache>,
    options?: InitApolloOptions<TCache>,
): ApolloClient<TCache> {
    if (!clientFn) {
        throw new Error('[withApollo] the first param is missing and is required to get the ApolloClient');
    }

    if (typeof window === 'undefined') {
        return getClient<TCache>(clientFn, options);
    }
    if (!globalApolloClient) {
        globalApolloClient = getClient<TCache>(clientFn, options);
    }

    return globalApolloClient;
}
// Gets the display name of a JSX component for dev tools
function getDisplayName(Component: React.ComponentType<any>) {
    return Component.displayName || Component.name || 'Unknown';
}

function withApollo<TCache = any>(client: InitApolloClient<TCache>, options: WithApolloOptions = {}) {
    type ApolloProps = Partial<WithApolloProps<TCache>>;

    return (Page: NextPage<any> | typeof App, pageOptions: WithApolloOptions = {}) => {
        const getInitialProps = Page.getInitialProps;
        const getDataFromTree =
            'getDataFromTree' in pageOptions ? pageOptions.getDataFromTree : options.getDataFromTree;
        const render = pageOptions.render || options.render;
        const onError = pageOptions.onError || options.onError;

        function WithApollo({ apollo, apolloState, ...props }: ApolloProps) {
            const apolloClient = apollo || initApollo<TCache>(client, { initialState: apolloState?.data });

            if (render) {
                return render({
                    Page: Page as NextPage<any>,
                    props: { ...props, apollo: apolloClient },
                });
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return <Page {...props} apollo={apolloClient} />;
        }

        WithApollo.displayName = `WithApollo(${getDisplayName(Page)})`;

        if (getInitialProps || getDataFromTree) {
            WithApollo.getInitialProps = async (pageCtx: ApolloContext) => {
                const ctx = 'Component' in pageCtx ? pageCtx.ctx : pageCtx;
                const { AppTree } = pageCtx;
                const headers = ctx.req ? ctx.req.headers : {};
                const apollo = initApollo<TCache>(client, { ctx, headers, ssrMode: true });
                const apolloState: WithApolloState<TCache> = {};

                let pageProps = {};

                if (getInitialProps) {
                    ctx.apolloClient = apollo;
                    pageProps = await getInitialProps(pageCtx as any);
                }

                if (typeof window === 'undefined') {
                    if (ctx.res && (ctx.res.headersSent || ctx.res.finished)) {
                        return pageProps;
                    }

                    if (getDataFromTree) {
                        try {
                            const props = { ...pageProps, apolloState, apollo };
                            const appTreeProps = 'Component' in pageCtx ? props : { pageProps: props };

                            await getDataFromTree(<AppTree {...appTreeProps} />);
                        } catch (error) {
                            if (onError) {
                                onError(error as Error, ctx);
                            } else {
                                // Prevent Apollo Client GraphQL errors from crashing SSR.
                                if (process.env.NODE_ENV !== 'production') {
                                    // tslint:disable-next-line no-console This is a necessary debugging log
                                    console.error('GraphQL error occurred [getDataFromTree]', error);
                                }
                            }
                        }

                        // getDataFromTree does not call componentWillUnmount
                        // head side effect therefore need to be cleared manually
                        //Head.rewind();

                        apolloState.data = apollo.cache.extract();
                    }
                }

                // To avoid calling initApollo() twice in the server we send the Apollo Client as a prop
                // to the component, otherwise the component would have to call initApollo() again but this
                // time without the context, once that happens the following code will make sure we send
                // the prop as `null` to the browser
                (apollo as any).toJSON = () => {
                    return null;
                };

                return {
                    ...pageProps,
                    apolloState,
                    apollo,
                };
            };
        }

        return WithApollo;
    };
}

export default withApollo(newApollo, {
    render: ({ Page, props }) => {
        return (
            <ApolloProvider client={props.apollo}>
                <Page {...props} />
            </ApolloProvider>
        );
    },
});
