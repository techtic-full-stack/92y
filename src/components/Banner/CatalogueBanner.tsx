import { FC, ReactNode } from 'react';
import { BannerContainerStyle, BannerHeading, BannerParaText, BannerBtnContainer } from './style';
import CatalogBannerButton from './CatalogBannerButton';
import { GlobalContainerStyle } from '@components/Global/style';
import { Topic } from '@queries/topics';

type CatalogueProps = {
    bgcolor?: string;
    heading?: string;
    path?: string;
    children?: ReactNode;
    dataTopic?: Topic[];
    data?: {
        id?: number;
        buttonText?: string;
        class?: string;
    }[];
};

const CatalogueBanner: FC<CatalogueProps> = ({ bgcolor, heading, path, children, data, dataTopic }) => {
    return (
        <BannerContainerStyle color={bgcolor} className="class-catalog">
            <GlobalContainerStyle>
                <BannerHeading
                    className={children ? (path === '/experts-and-artists' ? 'educator-heading' : '') : `mt-4`}
                >
                    {heading}
                </BannerHeading>
                <BannerParaText className={path === '/experts-and-artists' ? 'fs-6' : ''}>{children}</BannerParaText>
            </GlobalContainerStyle>
            <BannerBtnContainer>
                <CatalogBannerButton bgcolor={bgcolor} data={data} dataTopic={dataTopic} path={path} />
            </BannerBtnContainer>
        </BannerContainerStyle>
    );
};

export default CatalogueBanner;
