import { useLazyQuery } from '@apollo/client';
import Button from '@components/Button';
import { NoResponse, NoResponseText } from '@components/ClassCatalogue/style';
import EducatorCard from '@components/EducatorCards';
import HtmlContent from '@components/HtmlContent';
import { Educator, GET_ALL_EDUCATOR, GetAllEducatorResponse } from '@queries/educators';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import theme from '../../theme';
import { DirectoryPage, InfiniteScrollButton } from './style';

interface EducatorDirectoryProps {
    topicId?: string | number;
    end: boolean;
    setEnd: (arg: boolean) => void;
    page: number;
    setPage: (arg: number) => void;
}
const LIMIT = 2;

const EducatorDirectory: FC<EducatorDirectoryProps> = ({ topicId, end, setEnd, page, setPage }) => {
    const [educatorList, setEducatorList] = useState<Educator[]>([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const variables = useMemo(() => {
        const hasTopics = topicId !== 'all';

        return {
            offset: (page - 1) * LIMIT,
            hasTopics,
            topicIds: hasTopics ? [topicId] : undefined,
        };
    }, [topicId, page]);

    useEffect(() => {
        setLoading(true);
    }, [topicId]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [getEducators] = useLazyQuery<GetAllEducatorResponse>(GET_ALL_EDUCATOR, {
        variables,
        fetchPolicy: 'cache-and-network',
        onCompleted: useCallback(
            ({ educators, total }) => {
                try {
                    setLoading(false);
                    if (educators) {
                        if (educators.length < LIMIT) setEnd(true);
                        if (total?.aggregate.count > educatorList.length) setTotalCount(total?.aggregate.count);
                        setEducatorList((previousEducatorList) => [...previousEducatorList, ...educators]);
                    }
                    setCount(educatorList.length + educators.length);
                } catch (error) {}
            },
            [educatorList, setEnd],
        ),
    });
    const loadMore = useCallback(() => {
        ///removeLoading(true);
        const nextPage = page + 1;

        setPage(nextPage);

        return getEducators();
    }, [getEducators, setPage, page]);

    useEffect(() => {
        getEducators();
    }, [getEducators]);

    useEffect(() => {
        setEducatorList([]);
    }, [topicId, setEducatorList]);

    return (
        <DirectoryPage>
            {loading ? (
                ''
            ) : educatorList && educatorList.length > 0 ? (
                <InfiniteScroll
                    dataLength={educatorList.length || 0} //This is important field to render the next data
                    next={loadMore}
                    hasMore={!end}
                    loader={''}
                >
                    {educatorList.map((educator) => {
                        return (
                            <EducatorCard
                                key={educator.id}
                                educator={educator}
                                upperBackground={theme.background.dark}
                                lowerBackground={theme.background.dark}
                                button={`See Full Profile`}
                                color={educator.profile.topic?.secondaryColor || theme.yellow.secondary}
                            >
                                <HtmlContent content={educator.profile?.bio} />
                            </EducatorCard>
                        );
                    })}
                    {count !== totalCount ? (
                        <InfiniteScrollButton>
                            <Button
                                className="text-center"
                                onClick={() => loadMore()}
                                type="secondary"
                                bgcolor={theme.navy.primary}
                                color={theme.white}
                            >
                                Load more
                            </Button>
                        </InfiniteScrollButton>
                    ) : (
                        <></>
                    )}
                </InfiniteScroll>
            ) : (
                <div className="d-flex flex-column align-items-center justify-content-center px-4">
                    <NoResponse>No Results</NoResponse>
                    <NoResponseText>
                        No Educators match your search. Please try removing some filters and try again
                    </NoResponseText>
                </div>
            )}
        </DirectoryPage>
    );
};

export default EducatorDirectory;
