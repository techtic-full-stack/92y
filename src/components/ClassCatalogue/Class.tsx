import { useQuery } from '@apollo/client';
import Dropdown from '@components/Dropdown';
import { GlobalContainerStyle } from '@components/Global/style';
import { EducatorClassesStyled } from '@components/Home/style';
import PopularClasses from '@components/PopularClasses';
import PromoBanner from '@components/PromoBanner';
import { Course, GET_COURSES_BY_TOPIC_ID, GetCoursesByFilterResponse } from '@queries/courses';
import { Col, DatePicker, Row, Typography } from 'antd';
import { Moment } from 'moment-timezone';
import moment from 'moment-timezone';
import { EventValue, RangeValue } from 'rc-picker/lib/interface';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { DropDownArrow } from '../icons/drop-down-arrow';
import { ClassStyle, FilterContainerStyle, NoResponse, NoResponseText, PaginationStyle, RangeDropdown } from './style';
import { LiveClassRow } from '@components/LiveClasses/style';
import { useRouter } from 'next/router';
const { Title } = Typography;
interface ClassType {
    id: string;
    name: string;
}
interface DaysOfWeek {
    id: number;
    name: string;
}

const DAYS_DROPDOWN: Array<DaysOfWeek> = [
    { id: 7, name: 'All' },
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 0, name: 'Sunday' },
];

const CLASS_TYPE_DROPDOWN: Array<ClassType> = [
    { id: 'all', name: 'All' },
    { id: 'live', name: 'Live Lecture' },
];

export interface ClassFetchFilters {
    topicId?: string[];

    dayOfWeek: number[];
    educatorId?: string[];
    courseType: string[];
    startDate?: Moment | null;
    endDate?: Moment | null;
}
type ClassProps = {
    topicId?: string[];
    educatorList: {
        id: string;
        name: string;
    }[];
    recentlyAddedClasses: Course[];
    recentlyAddedLoading: boolean;
    onFiltersChanged: (filters: ClassFetchFilters) => void;
};
const LIMIT = 8;

const Class: FC<ClassProps> = ({
    onFiltersChanged,
    topicId,
    educatorList,
    recentlyAddedLoading,
    recentlyAddedClasses,
}) => {
    const { RangePicker } = DatePicker;
    const [currentPage, setCurrentPage] = useState(1);
    const [dayOfWeek, setDayOfWeek] = useState([0, 1, 2, 3, 4, 5, 6]);
    const [classType, setClassType] = useState(['live']);
    const [educatorId, setEducatorId] = useState<string[]>();
    const [startDate, setStartDate] = useState<EventValue<Moment>>(moment());
    const [endDate, setEndDate] = useState<EventValue<Moment>>();
    const [showDate, setShowDate] = useState(true);
    const router = useRouter();

    const onChangeDaysType = (value: any) => {
        if (value === 7) {
            setDayOfWeek([0, 1, 2, 3, 4, 5, 6]);
        } else {
            setDayOfWeek(value);
        }
    };
    const onChangeEducatorType = (value: any) => {
        if (value === 'all') {
            setEducatorId(educatorList.filter((item) => item.id !== 'all').map((item) => item.id));
        } else {
            setEducatorId([value]);
        }
    };
    const onChangeClassType = (value: any) => {
        if (value === 'all') {
            setClassType(['live']);
        } else {
            setClassType(value);
        }
    };

    const handleCalender = useCallback(
        (dates: RangeValue<Moment>) => {
            setStartDate(dates?.[0] || null);
            setEndDate(dates?.[1] || null);
        },
        [setStartDate, setEndDate],
    );

    useEffect(() => {
        if (!startDate?.isValid()) {
            setShowDate(true);
        }
    }, [startDate]);

    const variables: ClassFetchFilters = useMemo(() => {
        return {
            topicId,
            dayOfWeek: dayOfWeek,
            educatorId: educatorId,
            courseType: classType,
            startDate,
            endDate,
            filteredByDate: !!endDate || !!startDate,
        };
    }, [startDate, endDate, topicId, dayOfWeek, educatorId, classType]);

    const {
        fetchMore,
        data: courseData,
        loading: courseLoading,
    } = useQuery<GetCoursesByFilterResponse>(GET_COURSES_BY_TOPIC_ID, {
        variables,
    });

    const loadMore = useCallback(
        (nextPage) => {
            setCurrentPage(nextPage);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            return fetchMore({
                variables: {
                    offset: (nextPage - 1) * LIMIT,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return fetchMoreResult;
                },
            });
        },
        [fetchMore, setCurrentPage],
    );

    useEffect(() => {
        onFiltersChanged(variables);
    }, [variables, onFiltersChanged]);

    useEffect(() => {
        setCurrentPage(1);
    }, [router.query.filter]);

    return (
        <>
            <PromoBanner />
            <ClassStyle className="pb-0">
                <GlobalContainerStyle>
                    <FilterContainerStyle>
                        <Row>
                            <Col xs={24} md={24}>
                                {CLASS_TYPE_DROPDOWN.length > 2 && (
                                    <Dropdown
                                        onChange={onChangeClassType}
                                        placeholder="Class Type"
                                        options={CLASS_TYPE_DROPDOWN}
                                        key={`dropdown_1`}
                                    />
                                )}
                                {educatorList.length > 2 && (
                                    <Dropdown
                                        onChange={onChangeEducatorType}
                                        placeholder="Experts and Artists"
                                        options={educatorList.sort((a, b) => (a.name > b.name ? 1 : -1))}
                                        key={`dropdown_2`}
                                    />
                                )}
                                <Dropdown
                                    onChange={onChangeDaysType}
                                    placeholder="Day of the Week"
                                    options={DAYS_DROPDOWN}
                                    key={`dropdown_3`}
                                />
                                <RangeDropdown onClick={() => setShowDate(false)} className={showDate ? '' : 'd-none'}>
                                    Date Range
                                    <DropDownArrow />
                                </RangeDropdown>
                                <RangePicker
                                    bordered={false}
                                    className={showDate ? 'd-none' : ''}
                                    onChange={handleCalender}
                                />
                            </Col>
                        </Row>
                    </FilterContainerStyle>
                    {currentPage === 1 && (
                        <EducatorClassesStyled>
                            <div className="title">
                                <Title>New Courses Now Available</Title>
                            </div>
                            {recentlyAddedClasses?.length !== 0 || recentlyAddedLoading ? (
                                <div className="cards">
                                    <LiveClassRow gutter={[24, 48]}>
                                        <PopularClasses
                                            coursesData={recentlyAddedClasses || []}
                                            loading={recentlyAddedLoading}
                                            className="carousel-col"
                                        />
                                    </LiveClassRow>
                                </div>
                            ) : (
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <NoResponse>No Results</NoResponse>
                                    <NoResponseText>
                                        No classes match your search. Please try removing some filters and try again.
                                    </NoResponseText>
                                </div>
                            )}
                        </EducatorClassesStyled>
                    )}
                </GlobalContainerStyle>
            </ClassStyle>
            <ClassStyle className="more-classes">
                <GlobalContainerStyle>
                    <EducatorClassesStyled>
                        <div className="title">
                            <Title>Happening Soon. Sign Up Now.</Title>
                        </div>
                        {courseData?.courses.length !== 0 ? (
                            <div className="cards">
                                <Row gutter={[24, 48]}>
                                    <PopularClasses coursesData={courseData?.courses || []} loading={courseLoading} />
                                </Row>
                                <PaginationStyle
                                    pageSize={LIMIT}
                                    current={currentPage}
                                    total={courseData?.total.aggregate.count}
                                    onChange={loadMore}
                                    hideOnSinglePage={true}
                                />
                            </div>
                        ) : (
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <NoResponse>No Results</NoResponse>
                                <NoResponseText>
                                    No classes match your search. Please try removing some filters and try again.
                                </NoResponseText>
                            </div>
                        )}
                    </EducatorClassesStyled>
                </GlobalContainerStyle>
            </ClassStyle>
        </>
    );
};

export default Class;
