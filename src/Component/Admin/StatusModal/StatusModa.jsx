import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FaGear} from "react-icons/fa6";
import './StatusModa.css'
import {modifyOrderStatus} from "../../../Service/AdminService";
import Loader from "../../STATIC/Loader/Loader";

function StatusModal({show, onHide, selectedOrder}) {
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [statusToChange, setStatusToChange] = useState('');

    const handleChangeStatus = async (status) => {
        setShowConfirmation(true);
        setStatusToChange(status);
    };

    const confirmStatusChange = async () => {
        setIsDataLoading(true);
        const response = await modifyOrderStatus(statusToChange, selectedOrder.randomNumber);
        if (response.status === 200) {
            selectedOrder.orderStatus = statusToChange;
            onHide();
        }
        setIsDataLoading(false);
        setShowConfirmation(false);
    };

    const cancelStatusChange = () => {
        setShowConfirmation(false);
    };

    return (

        <>
            {isDataLoading && <Loader/>}

                <Modal show={show} onHide={onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change current order status:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="statuModalBody">
                            {selectedOrder?.orderStatus !== 'PENDING' &&
                                <div className="d-flex align-items-center">
                                    <h5><FaGear className="mb-1 me-1 pending roundedIcon"/>Change the status to:</h5>
                                    <Button
                                        variant={"dark"}
                                        className="ms-2 pending statusButton"
                                        onClick={() => handleChangeStatus("PENDING")}
                                    >
                                        PENDING
                                    </Button>
                                </div>
                            }

                            {selectedOrder?.orderStatus !== 'APPROVED' &&
                                <div className="d-flex align-items-center">
                                    <h5><FaGear className="mb-1 me-1 approved roundedIcon"/>Change the status to:</h5>
                                    <Button
                                        variant={"dark"}
                                        className="ms-2 approved statusButton"
                                        onClick={() => handleChangeStatus("APPROVED")}
                                    >
                                        APPROVED
                                    </Button>
                                </div>
                            }

                            {selectedOrder?.orderStatus !== 'IN_DELIVERY' &&
                                <div className="d-flex align-items-center">
                                    <h5><FaGear className="mb-1 me-1 in-delivery roundedIcon"/>Change the status to:
                                    </h5>
                                    <Button
                                        variant={"dark"}
                                        className="ms-2 in-delivery statusButton"
                                        onClick={() => handleChangeStatus("IN_DELIVERY")}
                                    >
                                        IN_DELIVERY
                                    </Button>
                                </div>
                            }

                            {selectedOrder?.orderStatus !== 'COMPLETED' &&
                                <div className="d-flex align-items-center">
                                    <h5><FaGear className="mb-1 me-1 completed roundedIcon"/>Change the status to:</h5>
                                    <Button
                                        variant={"dark"}
                                        className="ms-2 completed statusButton"
                                        onClick={() => handleChangeStatus("COMPLETED")}
                                    >
                                        COMPLETED
                                    </Button>
                                </div>
                            }

                            {selectedOrder?.orderStatus !== 'CANCELED' &&
                                <div className="d-flex align-items-center">
                                    <h5><FaGear className="mb-1 me-1 canceled roundedIcon"/>Change the status to:</h5>
                                    <Button
                                        variant={"dark"}
                                        className="ms-2 canceled statusButton"
                                        onClick={() => handleChangeStatus("CANCELED")}
                                    >
                                        CANCELED
                                    </Button>
                                </div>
                            }

                            {selectedOrder?.orderStatus !== 'RETURNED' &&
                                <div className="d-flex align-items-center">
                                    <h5><FaGear className="mb-1 me-1 returned roundedIcon"/>Change the status to:</h5>
                                    <Button
                                        variant={"dark"}
                                        className="ms-2 returned statusButton"
                                        onClick={() => handleChangeStatus("RETURNED")}
                                    >
                                        RETURNED
                                    </Button>
                                </div>
                            }

                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={showConfirmation} onHide={cancelStatusChange}>
                    <Modal.Header>
                        <Modal.Title>Confirm Status Change</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        Are you sure you want to change the status to <strong>{statusToChange}</strong>?
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <Button variant="danger" onClick={cancelStatusChange}>No</Button>
                        <Button variant="dark" onClick={confirmStatusChange}>Yes</Button>
                    </Modal.Footer>
                </Modal>
        </>

    );
}

export default StatusModal;
