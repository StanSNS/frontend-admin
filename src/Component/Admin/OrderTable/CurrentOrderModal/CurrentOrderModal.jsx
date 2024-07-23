import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import CurrentOrderProductTable from "./CurrentOrderProductTable/CurrentOrderProductTable";
import {FaCity, FaEnvelope, FaGlobeAmericas, FaUser} from "react-icons/fa";
import {FaPhoneVolume} from "react-icons/fa6";
import {IoIosPin} from "react-icons/io";
import {createOrderInSpeedy} from "../../../../Service/AdminService";
import Loader from "../../../STATIC/Loader";
import "./CurrentOrderModal.css"

function CurrentOrderModal({show, onHide, selectedOrder}) {
    const [isLoading, setIsLoading] = useState(false);

    const createOrderInSpeedyFunc = async () => {
        const officeID = selectedOrder.addressInfo.officeID
        const amountToBePayedByAdmin = selectedOrder.amountToBePayedByAdmin
        const amountToBePayedByCustomer = selectedOrder.amountToBePayedByCustomer
        const randomNumber = selectedOrder.randomNumber
        const totalWeight = selectedOrder.totalWeight
        const email = selectedOrder.userInfo.email
        const firstName = selectedOrder.userInfo.firstName
        const lastName = selectedOrder.userInfo.lastName
        const phone = selectedOrder.userInfo.phone

        const body = {
            officeID,
            amountToBePayedByAdmin,
            amountToBePayedByCustomer,
            randomNumber,
            totalWeight,
            email,
            firstName,
            lastName,
            phone,
        }

        try {
            setIsLoading(true)
            const response = await createOrderInSpeedy(body)
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    };

    console.log(selectedOrder)

    return (
        <>
            {isLoading && <Loader/>}

            <Modal show={show} onHide={onHide} className="modal-xl">
                <Modal.Header>
                    <Modal.Title>
                        Details for order: #{selectedOrder?.randomNumber}
                    </Modal.Title>

                    <Button variant={"dark"}
                            className="fs-5 fw-bold"
                            onClick={() => createOrderInSpeedyFunc()}
                            disabled={selectedOrder?.orderStatus !== 'APPROVED'}
                    >
                        Create order in speedy
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="orderInfo">
                        <div className="orderUserInfo">
                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <FaUser className="mb-1 me-1 myRedColor"/>Име:
                                </span>
                                <span>
                                    {selectedOrder?.userInfo?.firstName}
                                </span>
                            </span>

                            <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <FaUser className="mb-1 me-1 myRedColor"/>Фамилия:
                                </span>
                                <span>
                                    {selectedOrder?.userInfo?.lastName}
                                </span>
                            </span>

                            <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <FaEnvelope className="mb-1 me-1 myRedColor"/>Имейл:
                                </span>
                                <span>
                                    {selectedOrder?.userInfo?.email}
                                </span>
                            </span>

                            <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <FaPhoneVolume className="mb-1 me-1 myRedColor"/>Телефон:
                                </span>
                                <span>
                                    {selectedOrder?.userInfo?.phone}
                                </span>
                            </span>
                        </div>

                        <div className="orderAddressInfo">
                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <FaGlobeAmericas className="mb-1 me-1 myRedColor"/>Държава:
                                </span>
                                <span>
                                    {selectedOrder?.addressInfo?.country}
                                </span>
                            </span>

                            <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <FaCity className="mb-1 me-1 myRedColor"/>Град:
                                </span>
                                <span>
                                    {selectedOrder?.addressInfo?.town}
                                </span>
                            </span>

                            {selectedOrder?.addressInfo.address && (
                                <span className="fw-bolder mt-2">
                                    <span className="keyColorInfo me-2">
                                        <IoIosPin className="mb-1 me-1 myRedColor"/>Адрес:
                                    </span>
                                    <span>
                                        {selectedOrder?.addressInfo?.address}
                                    </span>
                            </span>
                            )}

                            {selectedOrder?.addressInfo.additionalAddress && (
                                <span className="fw-bolder mt-2">
                                    <span className="keyColorInfo me-2">
                                        <IoIosPin className="mb-1 me-1 myRedColor"/>Допълнителен адрес:
                                    </span>
                                    <span>
                                        {selectedOrder?.addressInfo?.additionalAddress}
                                    </span>
                            </span>
                            )}

                            {selectedOrder?.addressInfo.officeAddress && (
                                <span className="fw-bolder mt-2">
                                    <span className="keyColorInfo me-2">
                                        <IoIosPin className="mb-1 me-1 myRedColor"/>Офис адрес:
                                    </span>
                                    <span>
                                        {selectedOrder?.addressInfo?.officeAddress}
                                    </span>
                            </span>
                            )}

                        </div>
                    </div>

                    <div className="mt-4">
                        <CurrentOrderProductTable order={selectedOrder}/>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CurrentOrderModal;
