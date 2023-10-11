import Tags from '@components/Tags';
import { Educator } from '@queries/educators';
import Link from 'next/link';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { EduInfo, ImageDiv, Images } from './style';

type DistinguishEducatorProps = {
    educatorsData: Educator[];
    loading: boolean;
};

const DistinguishEducator: FC<DistinguishEducatorProps> = ({ loading, educatorsData }) => {
    const skeletonItems = [1, 2, 3];

    return (
        <Row>
            {loading
                ? skeletonItems.map((item: number) => {
                      return (
                          <Col key={item} className="d-lg-flex mb-4 mb-lg-0" lg={4}>
                              <ImageDiv>
                                  <Skeleton circle height={150} width={150} containerClassName="avatar-skeleton" />
                                  <EduInfo>
                                      <Skeleton width={138} />
                                  </EduInfo>
                                  <EduInfo className="EduName">
                                      <Skeleton width={164} />
                                  </EduInfo>
                                  <EduInfo className="EduDetail ">
                                      <Skeleton height={36} />
                                  </EduInfo>
                                  <Row className="justify-content-center">
                                      <Col md={1}>
                                          <svg
                                              width="18"
                                              height="19"
                                              viewBox="0 0 18 19"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                          >
                                              <rect
                                                  x="2.38672"
                                                  y="0.214844"
                                                  width="12.8571"
                                                  height="12.8571"
                                                  rx="6"
                                                  fill="#D4D4D4"
                                              />
                                              <rect
                                                  x="5.95703"
                                                  y="3.78516"
                                                  width="5.71429"
                                                  height="5.71429"
                                                  rx="2.85714"
                                                  fill="#D4D4D4"
                                              />
                                              <rect
                                                  x="0.167969"
                                                  y="10.9297"
                                                  width="7.40289"
                                                  height="7.8495"
                                                  rx="3.70145"
                                                  fill="#D4D4D4"
                                              />
                                              <rect
                                                  x="10.4297"
                                                  y="10.6562"
                                                  width="7.40692"
                                                  height="8.12177"
                                                  rx="3.70346"
                                                  fill="#D4D4D4"
                                              />
                                          </svg>{' '}
                                      </Col>
                                      <Col md={6}>
                                          {' '}
                                          <Skeleton height={24} />
                                      </Col>
                                  </Row>
                              </ImageDiv>
                          </Col>
                      );
                  })
                : educatorsData?.map((educator) => {
                      return (
                          <Col key={educator.id} className="mb-4 mb-lg-0" lg={4}>
                              <Link
                                  href={{
                                      pathname: `/educator/${educator.slug}`,
                                  }}
                                  passHref
                              >
                                  <ImageDiv>
                                      <Images
                                          src={educator.avatar.url}
                                          alt={educator.firstName}
                                          loading="eager"
                                          height="150px"
                                          width="150px"
                                      />
                                      <EduInfo>
                                          <Tags
                                              variant={educator.profile?.topic?.slug}
                                              label={educator.profile?.topic?.name}
                                          />
                                      </EduInfo>
                                      <EduInfo className="EduName">{`${educator.fullName}`}</EduInfo>
                                      <EduInfo className="EduDetail">{educator.profile.tagline}</EduInfo>
                                  </ImageDiv>
                              </Link>
                          </Col>
                      );
                  })}
        </Row>
    );
};

export default DistinguishEducator;
