/* eslint-disable jsx-a11y/anchor-is-valid */
import { StaticImageData } from 'next/image';
import { FC, useMemo } from 'react';
import { Row, Col, Typography } from 'antd';
import Button from '@components/Button';
import { ClassesCardRow, RegisterCardDiv, HeadingCol, RegisterStatusCol } from './style';
import theme from '../../theme';
import ImageShaper from '@components/ImageShaper';
import { Cross } from '../icons/cross-shapper';
import Link from 'next/link';
import { VideoCam } from '../icons/video-cam';

type UpcomingClassCardProps = {
    registrationImage: string | StaticImageData;
    classDate?: string;
    classTime?: string;
    title?: string;
    btnColor?: string;
    imgHeight?: number;
    imgWidth?: number;
    shapes?: string;
    status?: number;
    linkText?: string;
    classDetailButton?: boolean;
    live?: boolean;
    id?: number | string;
    totalSessions?: number;
    link?: string;
};

const { Title, Text } = Typography;

const ClassesCard: FC<UpcomingClassCardProps> = ({
    registrationImage,
    classDate,
    classTime,
    title,
    btnColor,
    imgHeight,
    imgWidth,
    shapes,
    status,
    linkText,
    classDetailButton,
    live,
    id,
    totalSessions,
    link,
}) => {
    const getCross1 = (totalCrossSession: number, crossStatus: number | undefined) => {
        const cross = [];
        for (let i = 0; i < totalCrossSession; i++) {
            if (crossStatus !== undefined) {
                if (i < crossStatus) {
                    cross.push(<Cross fillColor={theme.orange.secondary} />);
                } else {
                    cross.push(<Cross />);
                }
            }
        }
        return cross;
    };
    const href = useMemo(() => {
        if (!link) {
            return '';
        }

        try {
            const url = new URL(link);

            return url.toString();
        } catch (e) {
            return `https://${link}`;
        }
    }, [link]);
    return (
        <ClassesCardRow>
            <Col md={6} sm={24} className="register-img-col">
                <div className="register-img">
                    <ImageShaper
                        image={registrationImage}
                        imgHeight={imgHeight}
                        imgWidth={imgWidth}
                        shape={shapes}
                        shapeColor={btnColor}
                    />
                </div>
            </Col>
            <Col md={18} sm={24}>
                <RegisterCardDiv>
                    <Row className="register-text-row">
                        <Col md={24} className="timing">
                            <Text>
                                {classDate} • {classTime} • {totalSessions} Sessions
                            </Text>
                        </Col>
                        <Col md={24} className="title-col">
                            <Row>
                                <HeadingCol md={24} sm={24} xs={24}>
                                    <Title level={3} className="heading-text">
                                        {title}
                                    </Title>
                                </HeadingCol>
                                {!!href && (
                                    <Col md={24} sm={24} xs={24} className={live ? 'view-btn' : 'view-link'}>
                                        <a href={href} target="_blank" rel="noreferrer">
                                            <Button
                                                bgcolor={theme.background.dark}
                                                type={live ? 'secondary' : 'primary'}
                                                color="#000000"
                                                leftIcon={() => <VideoCam />}
                                            >
                                                {linkText}
                                            </Button>
                                        </a>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                        <Col md={24}>
                            <Row>
                                <RegisterStatusCol md={18} lg={16} xl={14}>
                                    <Row>
                                        <Col className="d-lg-flex align-items-center">
                                            {totalSessions ? getCross1(totalSessions, status) : ''}
                                        </Col>
                                        <Col>
                                            <Text className="ms-1">
                                                {status}/{totalSessions} Sessions Complete
                                            </Text>
                                        </Col>
                                    </Row>
                                </RegisterStatusCol>
                                <Col md={6} lg={8} xl={10} className="register-text-btn-col">
                                    {classDetailButton && (
                                        <Link href={`/my-courses/in-progress/${id}`} passHref>
                                            <a>
                                                <Button
                                                    bgcolor={btnColor || theme.orange.secondary}
                                                    color="#000000"
                                                    rightIcon
                                                    lg
                                                >
                                                    Details
                                                </Button>
                                            </a>
                                        </Link>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </RegisterCardDiv>
            </Col>
        </ClassesCardRow>
    );
};

export default ClassesCard;
