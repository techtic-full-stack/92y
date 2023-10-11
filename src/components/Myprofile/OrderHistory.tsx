/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/client';
import Button from '@components/Button';
import { calculateAmountWithFees } from '@components/Checkout/common';
import { NoResponse } from '@components/ClassCatalogue/style';
import { GlobalContainerStyle } from '@components/Global/style';
import ImageShaper from '@components/ImageShaper';
import { getCourseTimeDisplayComponents, getShapeType } from '@components/utils';
import { GET_ORDER_HISTORY, GetOrderHistoryResponse, Order } from '@queries/myclasses';
import { Col, Row, Typography } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import theme from 'theme';
import RtImage from '../../public/order-history-rt.svg';
import { priceIntToFloat } from '../utils';
import {
    HeadingCol,
    OrderHistoryCardDiv,
    OrderHistoryCardRow,
    OrderHistoryPriceDiv,
    OrderHistoryStatusCol,
    OrderHistoryTime,
    OrderHistoryTotal,
    SettingStyle,
    StatusDiv,
} from './style';

const { Title } = Typography;
const LIMIT = 2;
const OrderHistory: FC = () => {
    const [orderHistoryList, setOrderHistoryList] = useState<Order[]>([]);
    const [end, setEnd] = useState(false);
    const [page, setPage] = useState(1);
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
            setIsMac(true);
        }
    }, []);
    const variables = {
        offset: 0,
    };
    const { fetchMore } = useQuery<GetOrderHistoryResponse>(GET_ORDER_HISTORY, {
        variables,
        skip: !variables,
        fetchPolicy: 'network-only',
        onCompleted: ({ orders }) => {
            setOrderHistoryList(orders);
        },
    });
    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        return fetchMore({
            variables: {
                offset: (nextPage - 1) * LIMIT,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if (fetchMoreResult.orders.length < LIMIT) setEnd(true);
                return {
                    ...prev,
                    orders: [...(prev.orders || []), ...fetchMoreResult.orders],
                };
            },
        });
    };
    const getCourseStatus = (startDate: string, endDate: string) => {
        const statusObj = {
            status: 'Upcoming',
            bgColor: '#BB912C',
        };
        if (moment().isBetween(startDate, endDate)) {
            statusObj.status = 'In Progress';
            statusObj.bgColor = '#1F442E';
        } else if (moment().isAfter(endDate)) {
            statusObj.status = 'Finished';
            statusObj.bgColor = '#010132';
        }
        return statusObj;
    };

    return (
        <SettingStyle>
            <GlobalContainerStyle>
                {orderHistoryList && orderHistoryList.length > 0 ? (
                    <InfiniteScroll
                        dataLength={orderHistoryList.length || 0} //This is important field to render the next data
                        next={loadMore}
                        hasMore={!end}
                        loader={''}
                    >
                        <Title level={2} className="title">
                            Order History
                        </Title>
                        {orderHistoryList.map((orderHistory, index) => {
                            const { timeDisplay, dateDisplay } = getCourseTimeDisplayComponents(
                                orderHistory.enrollment.course,
                            );
                            const amountWithFees = calculateAmountWithFees({
                                amount: orderHistory.pricePerSeat,
                                seats: orderHistory.seats,
                                shouldBeFree: orderHistory.withSubscription,
                                coupon: orderHistory.promoCode?.coupon,
                            });

                            const courseStatus = getCourseStatus(
                                orderHistory.enrollment.course.startDate,
                                orderHistory.enrollment.course.endDate,
                            );
                            return (
                                <>
                                    <OrderHistoryCardRow key={index + '_' + orderHistory.amount}>
                                        <Col md={6} sm={24} className="register-img-col">
                                            <div className="register-img">
                                                <ImageShaper
                                                    image={orderHistory?.enrollment?.course.image.url}
                                                    imgHeight={400}
                                                    imgWidth={400}
                                                    shape={getShapeType(
                                                        orderHistory.enrollment.course.totalSessions.aggregate.count,
                                                    )}
                                                    shapeColor={orderHistory.enrollment.course.topic.secondaryColor}
                                                />
                                            </div>
                                        </Col>
                                        <Col md={18} sm={24}>
                                            <OrderHistoryCardDiv>
                                                <Row className="register-text-row">
                                                    <Col md={24} xs={24} className="timing">
                                                        <StatusDiv>
                                                            <Button
                                                                className={isMac ? 'mac-status-tag' : ''}
                                                                bgcolor={courseStatus.bgColor}
                                                            >
                                                                {courseStatus.status}
                                                            </Button>
                                                        </StatusDiv>
                                                        <OrderHistoryTime>
                                                            {dateDisplay} • {timeDisplay} •{' '}
                                                            {
                                                                orderHistory.enrollment.course.totalSessions.aggregate
                                                                    .count
                                                            }{' '}
                                                            Sessions
                                                        </OrderHistoryTime>
                                                    </Col>
                                                    <HeadingCol
                                                        md={20}
                                                        className={
                                                            !orderHistory.withSubscription ? 'without-subscription' : ''
                                                        }
                                                    >
                                                        <Title level={3} className="heading-text">
                                                            {orderHistory.enrollment.course.name}
                                                        </Title>
                                                    </HeadingCol>

                                                    <Col md={24}>
                                                        <Row className="d-flex flex-column flex-md-row align-items-md-end align-items-sm-stretch">
                                                            <OrderHistoryStatusCol md={10}>
                                                                {orderHistory.seats > 1 && (
                                                                    <OrderHistoryPriceDiv>
                                                                        <span>{orderHistory.seats} Seats</span>
                                                                        <span>
                                                                            ${amountWithFees.display.baseAmount}/ea
                                                                        </span>
                                                                    </OrderHistoryPriceDiv>
                                                                )}
                                                                <OrderHistoryPriceDiv>
                                                                    <span>Subtotal</span>
                                                                    <span>
                                                                        $
                                                                        {priceIntToFloat(
                                                                            orderHistory.pricePerSeat *
                                                                                orderHistory.seats,
                                                                        )}
                                                                    </span>
                                                                </OrderHistoryPriceDiv>
                                                                {orderHistory.withSubscription && (
                                                                    <OrderHistoryPriceDiv>
                                                                        <Image src={RtImage} alt="rtimage" />
                                                                        <span>
                                                                            -$
                                                                            {priceIntToFloat(
                                                                                orderHistory.pricePerSeat *
                                                                                    orderHistory.seats,
                                                                            )}
                                                                        </span>
                                                                    </OrderHistoryPriceDiv>
                                                                )}
                                                                {amountWithFees.discountAmount > 0 && (
                                                                    <OrderHistoryPriceDiv>
                                                                        <span>Coupon</span>
                                                                        <span>
                                                                            -$ {amountWithFees.display.discountAmount}
                                                                        </span>
                                                                    </OrderHistoryPriceDiv>
                                                                )}
                                                                {!orderHistory.withSubscription && (
                                                                    <OrderHistoryPriceDiv>
                                                                        <span>Processing fee</span>
                                                                        <span>${amountWithFees.display.fee}</span>
                                                                    </OrderHistoryPriceDiv>
                                                                )}
                                                                <OrderHistoryPriceDiv>
                                                                    <OrderHistoryTotal>Total</OrderHistoryTotal>
                                                                    <OrderHistoryTotal>
                                                                        ${amountWithFees.display.customerTotal}
                                                                    </OrderHistoryTotal>
                                                                </OrderHistoryPriceDiv>
                                                            </OrderHistoryStatusCol>
                                                            <Col
                                                                md={14}
                                                                className="d-flex align-items-end justify-content-md-end order-detail-btn"
                                                            >
                                                                <Link
                                                                    href={`/my-courses/in-progress/${orderHistory.enrollment.id}`}
                                                                    passHref
                                                                >
                                                                    <a>
                                                                        <Button
                                                                            bgcolor={
                                                                                orderHistory.enrollment.course.topic
                                                                                    .secondaryColor
                                                                            }
                                                                            color={theme.black}
                                                                            type="primary"
                                                                            lg
                                                                        >
                                                                            Details
                                                                        </Button>
                                                                    </a>
                                                                </Link>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </OrderHistoryCardDiv>
                                        </Col>
                                    </OrderHistoryCardRow>
                                </>
                            );
                        })}
                    </InfiniteScroll>
                ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center px-4 mt-5">
                        <NoResponse>No Order Found.</NoResponse>
                    </div>
                )}
            </GlobalContainerStyle>
        </SettingStyle>
    );
};

export default OrderHistory;
