import React, {useEffect, useState} from 'react';
import './AboutData.css';

import Modal from "react-bootstrap/Modal";
import {FaCheckCircle, FaLock, FaUnlock, FaTimesCircle} from "react-icons/fa";
import Loader from "../../STATIC/Loader";
import {changeAboutData, getAboutData} from "../../../Service/AboutData";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {IoSend} from "react-icons/io5";
import {createOrderInSpeedy} from "../../../Service/AdminService";

function AboutData() {
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [failModalVisible, setFailModalVisible] = useState(false);
    const [inputValues, setInputValues] = useState({});
    const [fieldsLocked, setFieldsLocked] = useState({
        savedMoney: true,
        soldProducts: true,
        satisfiedClients: true,
        deliveredProducts: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getAboutData();
                setInputValues(data);
            } catch (error) {
                navigate("/internal-server-error");
                console.error('Error fetching about data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    const closeModal = () => {
        setSuccessModalVisible(false);
        setFailModalVisible(false);
        setConfirmationModalVisible(false);
    };

    const toggleFieldLock = (field) => {
        setFieldsLocked((prevFieldsLocked) => ({
            ...prevFieldsLocked,
            [field]: !prevFieldsLocked[field],
        }));
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleInputChange = (field, value) => {
        setInputValues({
            ...inputValues,
            [field]: value
        });
    };

    const handleSubmitClick = () => {
        setConfirmationModalVisible(true);
    };

    const handleConfirmSubmit = async () => {
        try {
            setIsLoading(true)
            const response = await changeAboutData(inputValues);
            if (response.status === 200) {
                setSuccessModalVisible(true)
            }
        } catch (err) {
            console.error(err);
            navigate("/internal-server-error");
        } finally {
            setIsLoading(false)
        }
        setConfirmationModalVisible(false);
    };

    return (
        <>
            {isLoading && <Loader/>}

            <div className="aboutDataContainer">
                <h1>About Data Values</h1>

                <div className="aboutDataInputFields">
                    {Object.keys(inputValues).map((key) => (
                        <div className="inputBox" key={key}>
                            <input
                                type="text"
                                value={inputValues[key] || 0}
                                disabled={fieldsLocked[key]}
                                className={fieldsLocked[key] ? "disabled" : ""}
                                onChange={(e) => handleInputChange(key, e.target.value)}
                            />
                            <span>{capitalizeFirstLetter(key.replace(/([A-Z])/g, ' $1'))}:</span>
                            <Button
                                variant={fieldsLocked[key] ? "danger" : "success"}
                                className="ms-1"
                                onClick={() => toggleFieldLock(key)}
                            >
                                {fieldsLocked[key] ? <FaLock/> : <FaUnlock/>}
                            </Button>
                        </div>
                    ))}
                </div>
                <Button
                    variant={"success"}
                    className="mt-3 fw-bold"
                    onClick={handleSubmitClick}
                >
                    Submit
                    <IoSend className="ms-2 mb-1"/>
                </Button>

            </div>

            <Modal show={confirmationModalVisible} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Submission</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center fw-bolder fs-4">Are you sure you want to submit ?</Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="danger" onClick={closeModal}>No</Button>
                    <Button variant="primary" onClick={handleConfirmSubmit}>Yes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={successModalVisible} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FaCheckCircle className="mb-1 me-2 successColor"/>
                        Success!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center fw-bolder fs-4">Action executed successfully.</Modal.Body>
            </Modal>

            <Modal show={failModalVisible} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FaTimesCircle className="mb-1 me-2 errorColor"/>
                        Error!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center fw-bolder fs-4">Action failed. See logs.</Modal.Body>
            </Modal>
        </>
    );
}

export default AboutData;
