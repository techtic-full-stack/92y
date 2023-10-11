import { useQuery } from '@apollo/client';
import Alert from '@components/Alert';
import Button from '@components/Button';
import { toJSX } from '@components/utils';
import { GET_APP_CONFIG } from '@queries/courses';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import useSubscription from '../../hooks/useSubscription';
import theme from '../../theme';

const HIDE_BANNER = 'hide-banner';
const PromoBanner = () => {
    const subscription = useSubscription();
    const hasLocalStorage = typeof localStorage !== 'undefined';
    const [hide, setHide] = useState(hasLocalStorage && !!localStorage?.getItem(HIDE_BANNER));

    const { data: promotionMsg } = useQuery(GET_APP_CONFIG, {
        fetchPolicy: 'cache-and-network',
    });
    const promotionText = promotionMsg?.config_values.find((item: any) => item.configType === 'general_promotion_text');

    const returnNull = !promotionText?.value || hide;
    const showSubscriptionError = subscription.has && !subscription.active;
    const onClose = useCallback(() => {
        setHide(false);
        localStorage.setItem(HIDE_BANNER, 'true');
    }, [setHide]);

    //|| (subscription.accessToken && !subscription.user)
    if (!showSubscriptionError && returnNull) {
        return null;
    }

    const content = showSubscriptionError ? (
        <>
            Update payment method to restore subscription{'    '}
            <Link href="/my-profile/purchase-details" passHref>
                <Button type="secondary" bgcolor="#000000" color="#ffffff">
                    Update
                </Button>
            </Link>
        </>
    ) : (
        toJSX(`${promotionText?.value}`)
    );
    return (
        <Alert
            style={{ whiteSpace: 'pre' }}
            bgcolor={theme.yellow.secondary}
            onClose={onClose}
            // text="Individual classes start at $25, or"
            // boldText="subscribe to our unlimited monthly membership:"
            content={content}
        />
    );
};

export default PromoBanner;
