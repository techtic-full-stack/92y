/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useMemo } from 'react';
import { Col } from 'antd';
import Button from '@components/Button';
import theme from '../../theme';
import ImageShaper from '@components/ImageShaper';
import { ScheduleRow, LectureTimeCol, LectureNameCol } from './style';
import { VideoCam } from '../icons/video-cam';

type ScheduleProps = {
    shape?: string;
    fillColor?: string;
    lectureName?: string;
    lectureTime?: string;
    upcoming?: boolean;
    sessionLink: string;
};

const ScheduleCard: FC<ScheduleProps> = ({ shape, fillColor, lectureName, lectureTime, upcoming, sessionLink }) => {
    const href = useMemo(() => {
        if (!sessionLink) {
            return '';
        }

        try {
            const url = new URL(sessionLink);

            return url.toString();
        } catch (e) {
            return `https://${sessionLink}`;
        }
    }, [sessionLink]);

    return (
        <ScheduleRow>
            <Col xl={1} lg={1} md={1} sm={2} xs={2} className="d-flex align-items-center">
                <ImageShaper
                    imgHeight={40}
                    imgWidth={40}
                    shape={shape}
                    fillColor={fillColor}
                    shapeColor={theme.background.offWhite}
                />
            </Col>
            <LectureNameCol xl={10} lg={9} md={9} sm={8} xs={22}>
                {lectureName}
            </LectureNameCol>
            <LectureTimeCol xl={9} lg={9} md={14} sm={14} xs={24} className="d-flex align-items-lg-center">
                {lectureTime}
            </LectureTimeCol>

            <Col xl={4} lg={5} md={24} sm={24} xs={24} className="d-flex justify-content-sm-end">
                {!!href && (
                    <a href={href} target="_blank" rel="noreferrer">
                        <Button
                            bgcolor={theme.background.offWhite}
                            type="secondary"
                            color={theme.black}
                            leftIcon={() => <VideoCam />}
                        >
                            {upcoming ? 'Zoom Link' : 'Recording'}
                        </Button>
                    </a>
                )}
            </Col>
        </ScheduleRow>
    );
};

export default ScheduleCard;
