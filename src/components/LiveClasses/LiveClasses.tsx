/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@components/Button';
import { Course } from '@queries/courses';
import Link from 'next/link';
import { FC } from 'react';
import { GlobalContainerStyle } from '@components/Global/style';
import theme from 'theme';
import { HeadingText, LiveClassStyle, HeadingDiv, LiveClassRow, MinDiv, MaxDiv, CarouselContainer } from './style';
import PopularClasses from '@components/PopularClasses/PopularClasses';
type LiveClassesProps = {
    liveClassData: Course[];
    loading?: boolean;
};
const LiveClasses: FC<LiveClassesProps> = ({ liveClassData, loading }) => {
    return (
        <LiveClassStyle>
            <GlobalContainerStyle>
                <HeadingDiv>
                    <HeadingText>New Courses Now Available</HeadingText>
                    <MaxDiv>
                        <Link href="/courses" passHref>
                            <a>
                                <Button bgcolor={theme.orange.secondary} color={theme.black}>
                                    Explore
                                </Button>
                            </a>
                        </Link>
                    </MaxDiv>
                </HeadingDiv>
            </GlobalContainerStyle>
            <CarouselContainer>
                <div className="cards">
                    <LiveClassRow gutter={[26, 48]}>
                        <PopularClasses
                            coursesData={liveClassData}
                            loading={loading}
                            shapeColor="transparent"
                            className="carousel-col"
                        />
                    </LiveClassRow>
                </div>
            </CarouselContainer>
            <GlobalContainerStyle>
                <MinDiv>
                    <Link href="/courses" passHref>
                        <a>
                            <Button bgcolor={theme.orange.secondary} color={theme.black}>
                                Explore
                            </Button>
                        </a>
                    </Link>
                </MinDiv>
            </GlobalContainerStyle>
        </LiveClassStyle>
    );
};

export default LiveClasses;
