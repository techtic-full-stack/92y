/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useCallback } from 'react';
import { Styled92UContent, Styled92UModal, Styled92UTitle, Styled92UCloseIcon, Styled92ULogo } from './styles';
import { useRouter } from 'next/router';

type Global92UModalProps = {
    setIs92UModalVisible: (value: boolean) => void;
    is92UModalVisible: boolean;
};

const Global92UModal: FC<Global92UModalProps> = ({ setIs92UModalVisible, is92UModalVisible }) => {
    const handleOk = () => {
        setIs92UModalVisible(false);
    };
    const router = useRouter();
    const handleCancel = useCallback(() => {
        setIs92UModalVisible(false);
        const { redirect, ...query } = router.query;
        router.replace(
            {
                pathname: router.pathname,
                query,
            },
            undefined,
            {
                shallow: true,
            },
        );
    }, [router, setIs92UModalVisible]);

    return (
        <Styled92UModal
            visible={is92UModalVisible}
            centered
            footer={null}
            width={846}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
        >
            <Styled92UCloseIcon onClick={handleCancel} />

            <Styled92UTitle> Welcome to</Styled92UTitle>

            <Styled92ULogo />
            {router.pathname === '/courses' && router.query.filter !== undefined ? (
                <Styled92UContent>
                    Our new site improves our service for you. You&apos;ll find and purchase all your future courses
                    here. Take a moment to register with us to complete any new purchases.
                </Styled92UContent>
            ) : (
                <Styled92UContent>
                    We&apos;re excited for you to experience our new destination, filled with hundreds of hours of
                    thoughtfully curated courses designed to enlighten, delight, and inspire curious minds. Explore and
                    enjoy finding the courses that interest you most.
                </Styled92UContent>
            )}
        </Styled92UModal>
    );
};
export default Global92UModal;
