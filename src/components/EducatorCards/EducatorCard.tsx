/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@components/Button';
import { GlobalContainerStyle } from '@components/Global/style';
import ImageShaper from '@components/ImageShaper';
import { ShapeType } from '@components/ImageShaper/types';
import { Educator } from '@queries/educators';
import Link from 'next/link';
import { FC, useState } from 'react';
import theme from '../../theme';
import { EducatorCardCol, EducatorCardRow, EducatorCardStyle, EducatorDesc, EducatorName, ReadMoreBtn } from './style';

type EducatorCardProps = {
    educator?: Educator;
    upperBackground?: string;
    lowerBackground?: string;
    color?: string;
    background?: string;
    textcolor?: string;
    button?: string;
    banner?: boolean;
    isClassDetails?: boolean;
};

const EducatorCard: FC<EducatorCardProps> = ({
    educator,
    upperBackground,
    lowerBackground,
    color,
    background,
    textcolor,
    button,
    banner,
    children,
    isClassDetails,
}) => {
    const educatorPhoto = educator?.avatar.url;
    const educatorName = educator?.fullName;
    const path = educator?.slug || '';
    const title = educator?.profile.tagline;
    const [isReadMore, setIsReadMore] = useState(false);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <EducatorCardStyle upperBackground={upperBackground} lowerBackground={lowerBackground}>
            <GlobalContainerStyle>
                <EducatorCardRow>
                    <EducatorCardCol className={banner ? 'banner-img' : 'img'} md={12} lg={3} bgcolor={color}>
                        {isClassDetails ? (
                            <Link href={{ pathname: `/educator/${path}` }} passHref>
                                <a>
                                    <ImageShaper
                                        image={educatorPhoto}
                                        shape={ShapeType.circle}
                                        shapeColor={color || theme.yellow.secondary}
                                        imgHeight={317}
                                        imgWidth={317}
                                    />
                                </a>
                            </Link>
                        ) : (
                            <ImageShaper
                                image={educatorPhoto}
                                shape={ShapeType.circle}
                                shapeColor={color || theme.yellow.secondary}
                                imgHeight={317}
                                imgWidth={317}
                            />
                        )}
                    </EducatorCardCol>
                    <EducatorCardCol
                        md={12}
                        lg={9}
                        className={banner ? `banner` : 'details'}
                        background={background}
                        textcolor={textcolor}
                    >
                        {isClassDetails ? (
                            <Link href={{ pathname: `/educator/${path}` }} passHref>
                                <a>
                                    <EducatorName className={banner ? `banner` : ''}>{educatorName}</EducatorName>
                                </a>
                            </Link>
                        ) : (
                            <EducatorName className={banner ? `banner` : ''}>{educatorName}</EducatorName>
                        )}

                        <EducatorDesc className="title">{title}</EducatorDesc>
                        {children && banner ? (
                            <>
                                <EducatorDesc className={isReadMore ? 'read-more banner' : 'banner'}>
                                    {children}
                                </EducatorDesc>
                                <ReadMoreBtn onClick={toggleReadMore} role="button">
                                    {!isReadMore ? ' Read More' : ' Read Less'}
                                </ReadMoreBtn>
                            </>
                        ) : (
                            <EducatorDesc className={banner ? `banner` : ''}>{children}</EducatorDesc>
                        )}
                        {button && (
                            <Link href={{ pathname: `/educator/${path}` }} passHref>
                                <a>
                                    <Button
                                        bgcolor={color}
                                        color={theme.black}
                                        lg={button === 'See Profile' ? true : false}
                                    >
                                        {button}
                                    </Button>
                                </a>
                            </Link>
                        )}
                    </EducatorCardCol>
                </EducatorCardRow>
            </GlobalContainerStyle>
        </EducatorCardStyle>
    );
};

export default EducatorCard;
