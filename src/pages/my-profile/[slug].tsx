import type { NextPage } from 'next';
import theme from '../../theme';
import LayoutWrapper from '@components/Layout/LayoutWrapper';
import CatalogueBanner from '@components/Banner/CatalogueBanner';
import { settingButton } from '@components/Banner/CatalogData';
import { useRouter } from 'next/router';
import Myprofile from '@components/Myprofile';
import { convertToString } from '@components/utils';
import withAuth from 'lib/withAuth';

const MyProfile: NextPage = () => {
    const router = useRouter();
    const slug = router.query.slug;
    const title = `${convertToString(`${router.query.slug}`)} | My Profile`;
    const description = `${convertToString(`${router.query.slug}`)} | My Profile`;

    return (
        <>
            {slug !== undefined && (
                <LayoutWrapper title={title} description={description} navbarColor={theme.navy.primary}>
                    <CatalogueBanner
                        bgcolor={theme.navy.primary}
                        data={settingButton}
                        path="/my-profile"
                        heading="My Profile"
                    />
                    <Myprofile />
                </LayoutWrapper>
            )}
        </>
    );
};

export default withAuth(MyProfile);
