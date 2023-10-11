import { StaticImageData } from 'next/image';
import { FC, ReactNode } from 'react';
import { Typography } from 'antd';
import {
    CollectionRow,
    CollectionBannerStyle,
    LiveClassDetailsCol,
    LiveClassImgCol,
    ClassImgStyled,
    ClassDetailsStyled,
} from './style';
import { GlobalContainerStyle } from '@components/Global/style';
import ImageShaper from '@components/ImageShaper';
import { ShapeType } from '@components/ImageShaper/types';

type ClassBannerProps = {
    children: ReactNode;
    bgcolor?: string;
    heading?: string;
    bannerImg?: StaticImageData | string;
    parts?: number;
    shapeColor?: string;
};

const { Text, Title } = Typography;

const CollectionBanner: FC<ClassBannerProps> = ({ bgcolor, heading, children, bannerImg, parts, shapeColor }) => {
    return (
        <>
            <CollectionBannerStyle color={bgcolor}>
                <GlobalContainerStyle>
                    <CollectionRow>
                        <LiveClassDetailsCol md={8}>
                            <ClassDetailsStyled className="mb-4">
                                <Text className="class-category">{parts} Parts</Text>
                                <Title level={2} className="mt-0">
                                    {heading}
                                </Title>
                                <p>{children}</p>
                            </ClassDetailsStyled>
                        </LiveClassDetailsCol>
                        <LiveClassImgCol md={4}>
                            <ClassImgStyled>
                                <ImageShaper
                                    image={bannerImg}
                                    imgHeight={400}
                                    imgWidth={400}
                                    shape={ShapeType.eight}
                                    shapeColor={shapeColor}
                                />
                            </ClassImgStyled>
                        </LiveClassImgCol>
                    </CollectionRow>
                </GlobalContainerStyle>
            </CollectionBannerStyle>
        </>
    );
};

export default CollectionBanner;
