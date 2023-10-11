import { SubscriptionStatus } from '@queries/user';
import useAuth from './useAuth';

const useSubscription = () => {
    const { user, touchUser, accessToken } = useAuth();
    return {
        ...user?.subscription,
        has: !!user?.subscription,
        active: user?.subscription?.status === SubscriptionStatus.ACTIVE,
        user,
        accessToken,
        touchUser,
    };
};
export default useSubscription;
