import { GlobalContainerStyle } from '@components/Global/style';
import Image from 'next/image';
import closeIcon from 'public/icons/closeIcon.svg';
import { CSSProperties, FC, useCallback, useState } from 'react';
import { Alertbox, AlertCol, StyledAlert } from './style';

export type AlertProps = {
    bgcolor?: string;
    // text?: string;
    // boldText?: string;
    content: JSX.Element;
    style?: CSSProperties;
    onClose?: () => void;
};

const Alert: FC<AlertProps> = ({ bgcolor, content, style, onClose }) => {
    const [closeAlert, setCloseAlert] = useState(false);
    const handleClick = useCallback(() => {
        setCloseAlert(true);
        onClose?.();
    }, [onClose]);

    return (
        <StyledAlert color={bgcolor} isVisible={closeAlert} style={style}>
            <GlobalContainerStyle>
                <Alertbox>
                    <AlertCol xs={10} sm={11} className="content-wrap">
                        {content}
                    </AlertCol>
                    <AlertCol xs={2} sm={1} className="d-flex justify-content-end close-icon">
                        <Image src={closeIcon} alt="closeIcon" onClick={handleClick} />
                    </AlertCol>
                </Alertbox>
            </GlobalContainerStyle>
        </StyledAlert>
    );
};

export default Alert;
