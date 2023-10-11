import { useQuery } from '@apollo/client';
import { GET_PROFILE_DETAILS, GetUserDetails } from '@queries/user';
import { useEffect } from 'react';

const useAuth = () => {
    const { data: profileData, refetch } = useQuery<GetUserDetails>(GET_PROFILE_DETAILS);
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    useEffect(() => {
        refetch();
    }, [accessToken, refetch]);
    return {
        user: profileData?.userDetails?.[0],
        accessToken,
        touchUser: refetch,
    };
};

export default useAuth;
