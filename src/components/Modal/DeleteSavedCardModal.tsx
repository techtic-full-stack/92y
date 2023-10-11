/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useCallback, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { OnBoardingContainerStyle, OnBoardingSubHeaderRow, ContainerStyle } from '../Onboarding/style';
import { OnBoardingModal, DeleteCardHeader, DeleteCardText, CardRowContainer } from './styles';
import { PopupCloseBtn } from '@components/icons/popup-close-btn';
import theme from 'theme';
import Button from '@components/Button';
import {
    UPDATE_PAYMENT_INFO,
    UpdatePaymentInfoResults,
    UpdatePaymentVariables,
    LIST_PAYMENT_METHODS,
} from '@queries/stripe';
import { useMutation } from '@apollo/client';
type DeletePaymentModalProps = {
    setIsModalVisible: (value: boolean) => void;
    isModalVisible: boolean;
};

const DeleteSavedCardModal: FC<DeletePaymentModalProps> = ({ setIsModalVisible, isModalVisible }) => {
    const [closeBtn] = useState(true);
    const [loading, setLoading] = useState('false');
    const [updatePayment] = useMutation<UpdatePaymentInfoResults, UpdatePaymentVariables>(UPDATE_PAYMENT_INFO, {
        refetchQueries: [{ query: LIST_PAYMENT_METHODS }],
        onCompleted: () => {
            setIsModalVisible(false);
            setLoading('false');
        },
    });
    const handleOk = () => {
        setLoading('true');
        updatePayment({ variables: { remove: true } });
    };

    const handleCancel = useCallback(() => {
        setIsModalVisible(false);
    }, [setIsModalVisible]);
    return (
        <OnBoardingModal
            visible={isModalVisible}
            centered
            footer={null}
            width={846}
            onOk={handleOk}
            onCancel={handleCancel}
            closeBtn={closeBtn}
            closeIcon={<PopupCloseBtn />}
        >
            <OnBoardingContainerStyle color={theme.navy.primary}>
                <ContainerStyle className="d-flex justify-content-center forgot">
                    <CardRowContainer>
                        <OnBoardingSubHeaderRow>
                            <Col>
                                <DeleteCardHeader level={2}>Delete</DeleteCardHeader>
                                <DeleteCardHeader level={2}>Payment Method</DeleteCardHeader>
                                <DeleteCardText>
                                    Are you sure you want to delete this payment method ? This action can’t be undone.
                                </DeleteCardText>
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <Button
                                            bgcolor="#FFFFFF"
                                            color="#000000"
                                            onClick={handleCancel}
                                            className="me-4"
                                            lg
                                        >
                                            Cancel
                                        </Button>

                                        {loading === 'true' ? (
                                            <Button
                                                bgcolor="#c4c4c4"
                                                color="#000000"
                                                className="align-self-end"
                                                disabled={loading === 'true' && true}
                                                lg
                                            >
                                                <span
                                                    className="spinner-border spinner-border-sm text-dark me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                Loading...
                                            </Button>
                                        ) : (
                                            <Button bgcolor="#F9D8C5" color="#000000" onClick={handleOk} lg>
                                                Confirm
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                        </OnBoardingSubHeaderRow>
                    </CardRowContainer>
                </ContainerStyle>
            </OnBoardingContainerStyle>
        </OnBoardingModal>
    );
};
export default DeleteSavedCardModal;
