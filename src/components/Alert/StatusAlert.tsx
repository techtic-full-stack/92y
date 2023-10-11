/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { GlobalContainerStyle } from '@components/Global/style';
import { StyledAlert, AlertCol, Alertbox, AlertMessage, AlertCollection } from './style';
import flatArrow from 'public/icons/flatArrow.svg';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export type StatusAlertProps = {
    bgcolor?: string;
    text?: string;
    boldText?: string;
    status?: string;
    statusIcon: StaticImageData;
    slug?: string;
};

const StatusAlert: FC<StatusAlertProps> = ({ bgcolor, text, boldText, status, statusIcon, slug }) => {
    return (
        <StyledAlert color={bgcolor}>
            <GlobalContainerStyle>
                <Alertbox>
                    <AlertCol md="auto" xs="auto" className="d-inline-flex align-items-center pe-0">
                        <Image src={statusIcon} alt="statusIcon" loading="eager" />
                    </AlertCol>
                    <AlertCol className="d-flex align-items-center content-wrap">
                        <span className="fw-bold me-1 span-text">{boldText}</span>
                        <AlertMessage> {text}</AlertMessage>
                    </AlertCol>
                    {status && (
                        <AlertCol md="auto" xs="auto" className="text-end d-flex align-items-center">
                            <Link href={`/collection/${slug}`} passHref>
                                <a className="text-dark d-flex">
                                    <AlertCollection>{status}</AlertCollection>
                                    <span className="ms-2 d-inline-flex align-items-center">
                                        <Image src={flatArrow} alt="flatArrowIcon" loading="eager" />
                                    </span>
                                </a>
                            </Link>
                        </AlertCol>
                    )}
                </Alertbox>
            </GlobalContainerStyle>
        </StyledAlert>
    );
};

export default StatusAlert;
