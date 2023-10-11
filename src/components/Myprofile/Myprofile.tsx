import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Preferences from './Preferences';
import Billing from './Billing/Billing';
import Membership from './Membership';
import Information from './Information';
import OrderHistory from './OrderHistory';
import withApollo from '../../lib/withApollo';

const Myprofile: FC = () => {
    const router = useRouter();
    return (
        <>
            {(() => {
                switch (router.query.slug) {
                    case 'my-information':
                        return <Information />;
                    case 'order-history':
                        return <OrderHistory />;
                    case 'purchase-details':
                        return <Membership />;
                    case 'billing':
                        return <Billing />;
                    case 'preferences':
                        return <Preferences />;
                    default:
                        return <Information />;
                }
            })()}
        </>
    );
};

export default withApollo(Myprofile);
