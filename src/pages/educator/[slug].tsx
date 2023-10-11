import { useQuery } from '@apollo/client';
import EducatorDetail from '@components/EducatorDetails/EducatorDetail';
import LayoutWrapper from '@components/Layout/LayoutWrapper';
import { GET_EDUCATOR_BY_SLUG, GetEducatorDetailsResponse } from '@queries/educators';
import withApollo from 'lib/withApollo';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import theme from 'theme';

const EducatorDetails: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const buttonText = `Join Us`;
    const [navColor, setNavColor] = useState(theme.navy.primary);
    const [loading, setLoading] = useState(true);
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    const { data: educatorDetailsData, refetch } = useQuery<GetEducatorDetailsResponse>(GET_EDUCATOR_BY_SLUG, {
        variables: {
            slug,
        },
        skip: !slug,
        onCompleted: ({ educator }) => {
            if (educator) {
                if (educator.profile.topic?.primaryColor) {
                    setNavColor(educator.profile.topic?.primaryColor);
                }
                setLoading(false);
            }
        },
    });

    let title = '';
    let description = '';
    useEffect(() => {
        if (accessToken) {
            refetch();
        }
    }, [accessToken, refetch]);
    if (educatorDetailsData) {
        title = `${educatorDetailsData.educator.firstName} ${educatorDetailsData.educator.lastName}`;
        description = `${title} ${educatorDetailsData.educator.profile.tagline}`;
    }

    return (
        <>
            {slug && (
                <LayoutWrapper title={title} description={description} navbarColor={navColor} button={buttonText}>
                    <EducatorDetail loading={loading} educator={educatorDetailsData?.educator} />
                </LayoutWrapper>
            )}
        </>
    );
};

export default withApollo(EducatorDetails);
