import React, { useEffect, useState } from 'react';
import './AboutData.css';

import Modal from "react-bootstrap/Modal";
import { FaCheckCircle, FaLock, FaUnlock, FaTimesCircle } from "react-icons/fa";
import Loader from "../../STATIC/Loader";
import { getAboutData } from "../../../Service/AboutData";
import { Button } from "react-bootstrap";

function AboutData() {
    const [isLoading, setIsLoading] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [failModalVisible, setFailModalVisible] = useState(false);
    const [aboutData, setAboutData] = useState({});
    const [inputValues, setInputValues] = useState({});
    const [fieldsLocked, setFieldsLocked] = useState({
        savedMoney: true,
        soldProducts: true,
        satisfiedClients: true,
        deliveredProducts: true,
    });

    const closeModal = () => {
        setSuccessModalVisible(false);
        setFailModalVisible(false);
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

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getAboutData();
                setAboutData(data);
                setInputValues(data); // Initialize input values with fetched data
            } catch (error) {
                navigator("/internal-server-error");
                console.error('Error fetching about data:');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [navigator]);

    return (
        <>
            {isLoading && <Loader />}

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
                                {fieldsLocked[key] ? <FaLock /> : <FaUnlock />}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <Modal show={successModalVisible} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FaCheckCircle className="mb-1 me-2 successColor" />
                        Success!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center fw-bolder fs-4">Action executed successfully.</Modal.Body>
            </Modal>

            <Modal show={failModalVisible} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FaTimesCircle className="mb-1 me-2 errorColor" />
                        Error!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center fw-bolder fs-4">Action failed. See logs.</Modal.Body>
            </Modal>
        </>
    );
}

export default AboutData;
