import HtmlContent from '@components/HtmlContent';
import { FC } from 'react';
import { AuthorDetailStyled, AuthorBoxDiv, FeatureText } from './style';
import { Row, Col } from 'antd';
import Image from 'next/image';
import { GlobalContainerStyle } from '@components/Global/style';
import { Book, Education } from '../../queries/types';

type AuthorDetailProps = {
    lowerColor?: string;
    upperColor?: string;
    awards?: string;
    educations?: Education[];
    books?: Book[];
};

const AuthorDetail: FC<AuthorDetailProps> = ({ lowerColor, upperColor, awards, educations, books }) => {
    return (
        <AuthorDetailStyled lowerBackground={lowerColor} upperBackground={upperColor}>
            <GlobalContainerStyle>
                <AuthorBoxDiv>
                    {books && books?.length > 0 && (
                        <Row className="award-section book">
                            <Col lg={8} md={8} sm={8} xs={24} className="mb-4 awards-text">
                                Books {`&`} <br /> Publications
                            </Col>
                            <Col lg={16} md={16} sm={16} xs={24}>
                                <Row>
                                    {books.map((book, index) => {
                                        return (
                                            <Col key={index} className="mb-2 mb-md-0 " md={10} sm={24} xs={24}>
                                                <Row>
                                                    <Col md={8} sm={4} xs={5}>
                                                        {book.link ? (
                                                            <a
                                                                href={book.link && `https://${book.link}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                <Image
                                                                    src={book.cover.url}
                                                                    alt="card-img"
                                                                    height="108px"
                                                                    width="85.76px"
                                                                    loading="eager"
                                                                />
                                                            </a>
                                                        ) : (
                                                            <Image
                                                                src={book.cover.url}
                                                                alt="card-img"
                                                                height="108px"
                                                                width="85.76px"
                                                                loading="eager"
                                                            />
                                                        )}
                                                    </Col>
                                                    <Col className="ps-2" md={16} sm={20} xs={19}>
                                                        <p className="book-title mb-1">{book.name}</p>
                                                        <span className="book-year">{book.year}</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Col>
                        </Row>
                    )}
                    {awards && (
                        <Row className="award-section award">
                            <Col lg={8} md={8} sm={24} xs={24} className="mb-4 awards-text">
                                Awards {`&`} <br /> Features
                            </Col>
                            <Col lg={16} md={16} sm={24} xs={24}>
                                {
                                    <FeatureText>
                                        <HtmlContent content={awards} />
                                    </FeatureText>
                                }
                            </Col>
                        </Row>
                    )}
                    {educations && educations.length > 0 && (
                        <Row className="award-section education">
                            <Col lg={8} md={10} xs={24} className="mb-4 awards-text">
                                Education
                            </Col>
                            <Col lg={16} md={14} xs={24}>
                                <Row gutter={{ xs: 8, sm: 8 }}>
                                    {educations.map((education, index) => {
                                        return (
                                            <Col key={index} className="mb-2 mb-md-0" xs={12} sm={12} md={8}>
                                                <Image
                                                    src={education.image.url}
                                                    alt="card-img"
                                                    height="50px"
                                                    width="146.67px"
                                                    loading="eager"
                                                />
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Col>
                        </Row>
                    )}
                </AuthorBoxDiv>
            </GlobalContainerStyle>
        </AuthorDetailStyled>
    );
};

export default AuthorDetail;
