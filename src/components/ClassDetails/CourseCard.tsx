import { BannerContainerStyle } from '@components/Banner/style';
import { CarouselContainer } from '@components/LiveClasses/style';
import { Session } from '@queries/courses';
import { Typography } from 'antd';
import moment from 'moment';
import { createRef, FC, useLayoutEffect, useState, useEffect } from 'react';
import { BackArrow } from '../icons/back-arrow';
import { RightArrow } from '../icons/right-arrow';
import { getCourseTimeDisplay } from '../utils';
import {
    ClassDataCol,
    ClassDataRow,
    LeftArrowBtn,
    LeftArrowDiv,
    RightArrowBtn,
    RightArrowDiv,
    SessionCount,
    SliderBtnDiv,
} from './style';

type ClassBannerProps = {
    bgcolor?: string;
    sessions?: Session[];
};

const { Text, Title } = Typography;

const CourseCard: FC<ClassBannerProps> = ({ bgcolor, sessions }) => {
    const [scrollX, setScrollX] = useState(0); // For detecting start scroll postion
    const [scrolEnd, setScrolEnd] = useState(true); // For detecting end of scrolling
    const [scrollBtn, SetScrollBtn] = useState(false);

    const ref: any = createRef();
    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        setScrollX(parseInt(e.currentTarget.scrollLeft.toString()));
    };
    useLayoutEffect(() => {
        if (ref.current?.clientWidth < ref.current?.scrollWidth) {
            SetScrollBtn(true);
        } else {
            SetScrollBtn(false);
        }
        if (scrollX + 1 >= ref.current?.scrollWidth - ref.current?.offsetWidth - 1) {
            setScrolEnd(false);
        } else {
            setScrolEnd(true);
        }
    }, [ref, scrollX]);
    const scroll = (scrollOffset: number) => {
        ref.current.scrollLeft += scrollOffset;
    };
    useEffect(() => {
        function handleResize() {
            const divwidth = document.getElementById('rowslider')?.offsetWidth as number;
            if (divwidth < 1256) {
                SetScrollBtn(true);
            } else {
                SetScrollBtn(false);
            }
        }
        window.addEventListener('resize', handleResize);
    });

    return (
        <BannerContainerStyle color={bgcolor}>
            <CarouselContainer>
                <ClassDataRow className="pt-4 gx-2" ref={ref} onScroll={handleScroll} id="rowslider">
                    {sessions?.map((session, index) => {
                        const checkPastCourse = moment().isAfter(session.endTime) ? true : false;
                        return (
                            <ClassDataCol key={session.id} checkpastcourse={checkPastCourse}>
                                <div className="class-data-container">
                                    <div>
                                        <SessionCount>Session {index + 1}</SessionCount>
                                        <Title level={3} className="class-title">
                                            {session.title}
                                        </Title>
                                    </div>
                                    <div>
                                        <Text className="class-date">
                                            {moment(session.startTime).format('MMMM Do')}
                                        </Text>
                                        <p className="class-time">
                                            {checkPastCourse
                                                ? 'Recording Available'
                                                : getCourseTimeDisplay(session.startTime, session.endTime)}
                                        </p>
                                    </div>
                                </div>
                            </ClassDataCol>
                        );
                    })}
                </ClassDataRow>
                <SliderBtnDiv>
                    {scrollX !== 0 && scrollBtn && (
                        <LeftArrowDiv color={bgcolor}>
                            <LeftArrowBtn onClick={() => scroll(-395)}>
                                <BackArrow />
                            </LeftArrowBtn>
                        </LeftArrowDiv>
                    )}
                    {scrolEnd && scrollBtn && (
                        <RightArrowDiv color={bgcolor}>
                            <RightArrowBtn onClick={() => scroll(395)}>
                                <RightArrow />
                            </RightArrowBtn>
                        </RightArrowDiv>
                    )}
                </SliderBtnDiv>
            </CarouselContainer>
        </BannerContainerStyle>
    );
};

export default CourseCard;
