/* eslint-disable jsx-a11y/anchor-is-valid */
import ImageShaper from '@components/ImageShaper';
import { Course } from '@queries/courses';
import { Col, Row } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import theme from 'theme';
import Tags from '../Tags';
import { getCourseTimeDisplayComponents, getShapeType } from '../utils';
import {
    CardBodyStyled,
    CardBodyTime,
    CardHeaderContainer,
    CardListCol,
    CardListStyle,
    CategoryTypeRow,
    DateCol,
    TimeCol,
} from './style';

export interface CardData {
    coursesData: Course[];
    loading?: boolean;
    shapeColor?: string;
    className?: string;
}

const PopularClasses: FC<CardData> = ({ loading, coursesData, shapeColor, className }) => {
    const [loadedImg, setLoadedImg] = useState(false);

    const handleImageLoaded = () => {
        setLoadedImg(true);
    };
    const skeletonItems = [
        {
            id: 1,
            shape: 'hexagon',
        },
        {
            id: 2,
            shape: 'eight',
        },
        {
            id: 3,
            shape: 'circle',
        },
        {
            id: 4,
            shape: 'cross',
        },
    ];

    return (
        <>
            {loading
                ? skeletonItems.map((item) => {
                      return (
                          <CardListCol md={6} key={item.id} className={className}>
                              <CardListStyle bordered={false}>
                                  <CardHeaderContainer>
                                      <figure>
                                          <ImageShaper
                                              fillColor={theme.skeletonShape.primary}
                                              shape={item.shape}
                                              shapeColor={shapeColor || theme.background.offWhite}
                                          />
                                      </figure>
                                      <CategoryTypeRow>
                                          <Col md={24} className="category-type-col">
                                              <Skeleton width={105} />
                                          </Col>
                                      </CategoryTypeRow>
                                      <h3 className="card-header-title">
                                          <Skeleton width={293} height={48} />
                                      </h3>
                                  </CardHeaderContainer>
                                  <CardBodyStyled>
                                      <div className="author-details with-sekeleton">
                                          <div className="author-img-div">
                                              <Skeleton
                                                  circle
                                                  height={30}
                                                  width={30}
                                                  containerClassName="avatar-skeleton"
                                              />
                                          </div>
                                          <div className="author-text">
                                              <h3>
                                                  <Skeleton width={79} />
                                              </h3>

                                              <p>
                                                  <Skeleton width={250} />
                                              </p>
                                          </div>
                                      </div>
                                      <svg
                                          width="293"
                                          height="2"
                                          viewBox="0 0 293 2"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                      >
                                          <path d="M0 1H293" stroke="#D4D4D4" />
                                      </svg>

                                      <CardBodyTime>
                                          <Row className="card-body-time-row">
                                              <DateCol md={12}>
                                                  <span className="time">
                                                      <Skeleton width={100} />
                                                  </span>
                                              </DateCol>
                                              <TimeCol md={12}>
                                                  <span className="time">
                                                      <Skeleton width={100} />
                                                  </span>
                                              </TimeCol>
                                          </Row>
                                      </CardBodyTime>
                                  </CardBodyStyled>
                              </CardListStyle>
                          </CardListCol>
                      );
                  })
                : coursesData?.map((course) => {
                      const { timeDisplay, dateDisplay } = getCourseTimeDisplayComponents(course, 'cardDate');
                      const availableSeats = course.maxSeats - (course.remainingSeats || 0);
                      const isPassed = moment().isAfter(course.maxSessionStartsAt);
                      return (
                          <CardListCol md={6} key={course.id} className={className}>
                              <CardListStyle bordered={false}>
                                  <Link href={`/class/course/${course.slug}`} passHref>
                                      <a>
                                          <CardHeaderContainer>
                                              <figure>
                                                  <ImageShaper
                                                      image={course.image?.url}
                                                      fillColor={!loadedImg ? theme.skeletonShape.primary : ''}
                                                      shape={getShapeType(course.sessions.length)}
                                                      shapeColor={shapeColor || theme.background.offWhite}
                                                      onLoad={handleImageLoaded}
                                                  />
                                              </figure>
                                              <CategoryTypeRow>
                                                  <Col md={24} className="category-type-col">
                                                      <div>
                                                          {course.collection[0]?.name !== null && (
                                                              <Tags
                                                                  variant="status"
                                                                  label="IN A COLLECTION"
                                                                  bgColor={course.topic.primaryColor}
                                                              />
                                                          )}
                                                          {course.collection[0]?.name !== null ? (
                                                              course.topic?.name.length < 20 ? (
                                                                  <Tags
                                                                      variant={course.topic?.slug}
                                                                      label={
                                                                          course.topic?.name.length > 10
                                                                              ? course.topic?.name.slice(0, 10) + '...'
                                                                              : course.topic?.name
                                                                      }
                                                                  />
                                                              ) : (
                                                                  <Tags
                                                                      variant={course.topic?.slug}
                                                                      label={`${course.topic?.name.slice(0, 20)}...`}
                                                                  />
                                                              )
                                                          ) : (
                                                              <Tags
                                                                  variant={course.topic?.slug}
                                                                  label={
                                                                      course.topic?.name.length > 28
                                                                          ? course.topic?.name.slice(0, 28) + '...'
                                                                          : course.topic?.name
                                                                  }
                                                              />
                                                          )}
                                                      </div>
                                                      {course.maxSeats !== 0 && (
                                                          <>
                                                              {!isPassed && (
                                                                  <Tags
                                                                      variant="seats"
                                                                      label={
                                                                          availableSeats < 1
                                                                              ? 'Sold Out'
                                                                              : availableSeats.toString()
                                                                      }
                                                                      bgColor={course.topic?.secondaryColor}
                                                                  />
                                                              )}
                                                          </>
                                                      )}
                                                  </Col>
                                              </CategoryTypeRow>
                                              <h3 className="card-header-title">
                                                  {course?.name.length < 59
                                                      ? course?.name
                                                      : `${course?.name.slice(0, 59)}...`}
                                              </h3>
                                          </CardHeaderContainer>
                                      </a>
                                  </Link>

                                  <CardBodyStyled>
                                      <Link
                                          href={{
                                              pathname: `/educator/${course.educator?.slug}`,
                                          }}
                                          passHref
                                      >
                                          <a>
                                              <div className="author-details">
                                                  <div className="author-img-div">
                                                      <Image
                                                          src={course.educator?.avatar.url}
                                                          alt="img"
                                                          width="100%"
                                                          height="100%"
                                                          layout="responsive"
                                                          objectFit="contain"
                                                          loading="eager"
                                                      />
                                                  </div>
                                                  <div className="author-text">
                                                      <h3>{course.educator?.fullName}</h3>
                                                      <p>{course.educator?.profile.tagline}</p>
                                                  </div>
                                              </div>
                                          </a>
                                      </Link>
                                      <CardBodyTime>
                                          <Row className="card-body-time-row">
                                              <DateCol md={10} xs={10}>
                                                  <span className="date">{dateDisplay}</span>
                                              </DateCol>
                                              {timeDisplay && (
                                                  <TimeCol md={14} xs={14}>
                                                      <span className="time">{timeDisplay}</span>
                                                  </TimeCol>
                                              )}
                                          </Row>
                                      </CardBodyTime>
                                  </CardBodyStyled>
                              </CardListStyle>
                          </CardListCol>
                      );
                  })}
        </>
    );
};

export default PopularClasses;
