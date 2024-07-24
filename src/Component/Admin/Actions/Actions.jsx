import React, { useState } from 'react';
import './Actions.css';
import Modal from "react-bootstrap/Modal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Loader from "../../STATIC/Loader";
import {
    allExecute,
    brandTasteExecution,
    productDataDetailsExecute,
    productDataDetailsSheetExecute,
    productDataDetailsWebExecute,
    productDataExecute,
    speedyOfficesExecute,
    tasteColorExecution
} from "../../../Service/AdminService";

function Actions() {
    const [isLoading, setIsLoading] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [failModalVisible, setFailModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);

    const executeAction = async (actionFunction) => {
        setIsLoading(true);
        setConfirmModalVisible(false);
        try {
            const response = await actionFunction();
            setIsLoading(false);
            if (response.status === 200) {
                setSuccessModalVisible(true);
            } else {
                setFailModalVisible(true);
            }
        } catch (error) {
            setIsLoading(false);
            setFailModalVisible(true);
        }
    };

    const closeModal = () => {
        setSuccessModalVisible(false);
        setFailModalVisible(false);
        setConfirmModalVisible(false);
    };

    const handleActionClick = (actionFunction) => {
        setPendingAction(() => () => executeAction(actionFunction));
        setConfirmModalVisible(true);
    };

    return (
        <>
            {isLoading && <Loader />}

            <div className="actionsContainer">
                <h1>Database Scripts Executioners</h1>

                <div className="executeButtons">
                    <button
                        className="executeButton"
                        onClick={() => handleActionClick(tasteColorExecution)}
                        disabled={isLoading}
                    >
                        <span>Taste - Color #1</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => handleActionClick(brandTasteExecution)}
                        disabled={isLoading}
                    >
                        <span>Brand & Taste #2</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => handleActionClick(productDataExecute)}
                        disabled={isLoading}
                    >
                        <span>Product data #3</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => handleActionClick(productDataDetailsExecute)}
                        disabled={isLoading}
                    >
                        <span>Product data details #4</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => handleActionClick(productDataDetailsSheetExecute)}
                        disabled={isLoading}
                    >
                        <span>Product data details sheet #5</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => handleActionClick(productDataDetailsWebExecute)}
                        disabled={isLoading}
                    >
                        <span>Product data details web #6</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => handleActionClick(speedyOfficesExecute)}
                        disabled={isLoading}
                    >
                        <span>Speedy offices #7</span>
                    </button>

                    <button
                        className="executeButton"
                        onClick={() => handleActionClick(allExecute)}
                        disabled={isLoading}
                    >
                        <span>Execute all scripts #8</span>
                    </button>
                </div>
            </div>

            <Modal show={confirmModalVisible} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">Are you sure you want to execute this action?</Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <button className="btn btn-primary" onClick={pendingAction}>
                        Confirm
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={successModalVisible} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FaCheckCircle className="mb-1 me-2 successColor" />Success!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center fw-bolder fs-4">Action executed successfully.</Modal.Body>
            </Modal>

            <Modal show={failModalVisible} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FaTimesCircle className="mb-1 me-2 errorColor" />Error!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center fw-bolder fs-4">Action failed. See logs.</Modal.Body>
            </Modal>
        </>
    );
}

export default Actions;
