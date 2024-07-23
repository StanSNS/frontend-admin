import React, {useEffect, useState} from "react";
import "./Orders.css"
import Loader from "../../STATIC/Loader";
import {FaCircleCheck, FaPhoneVolume, FaSignHanging, FaTruckFront, FaTruckMedical} from "react-icons/fa6";
import {
    FaCalendarAlt, FaCheckDouble,
    FaCity,
    FaEnvelope,
    FaExchangeAlt, FaEye,
    FaGlobeAmericas,
    FaHashtag,
    FaShoppingCart, FaTimesCircle, FaTruckLoading,
    FaUser
} from "react-icons/fa";
import {IoIosPin} from "react-icons/io";
import {GiPayMoney, GiProfit, GiWeight} from "react-icons/gi";
import {Button, Dropdown, Modal} from "react-bootstrap";
import StatusModal from "./Modals/StatusModal/StatusModal";
import {getAllOrderData, modifyIsUserCalled, validateAllProductsInOrder} from "../../../Service/AdminService";

function Orders() {
    const [orderData, setOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState(orderData);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllOrderData();
            console.log(data)
            setOrderData(data)
            setFilteredOrders(data);
            setIsLoading(false);
        };
        setIsLoading(true)
        fetchData();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'long'});
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes().toString().padStart(2, '0');
        return `${day} ${month} ${year} - ${hour}:${minute}`;
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "pending";
            case "APPROVED":
                return "approved";
            case "IN_DELIVERY":
                return "in-delivery";
            case "COMPLETED":
                return "completed";
            case "CANCELED":
                return "canceled";
            case "RETURNED":
                return "returned";
            default:
                return "";
        }
    };

    const handleSortByChange = (sortType) => {
        let sortedData = [...filteredOrders];
        switch (sortType) {
            case "date":
                sortedData.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });
                break;
            case "weight":
                sortedData.sort((a, b) => b.totalWeight - a.totalWeight);
                break;
            case "products":
                sortedData.sort((a, b) => b.productOrders.length - a.productOrders.length);
                break;
            case "customer":
                sortedData.sort((a, b) => b.amountToBePayedByCustomer - a.amountToBePayedByCustomer);
                break;
            case "admin":
                sortedData.sort((a, b) => b.amountToBePayedByAdmin - a.amountToBePayedByAdmin);
                break;
            case "profit":
                sortedData.sort((a, b) => b.companyProfit - a.companyProfit);
                break;
            default:
                break;
        }
        setFilteredOrders(sortedData);
    };

    const handleStatusChange = (status) => {
        if (status === 'All') {
            setFilteredOrders(orderData);
        } else {
            const filteredData = orderData.filter(order => order.orderStatus === status);
            setFilteredOrders(filteredData);
        }
    };

    const handleChangeIsUserCalled = async (randomNumber, isUserCalled) => {
        try {
            await modifyIsUserCalled(randomNumber, isUserCalled);
            const updatedOrderData = orderData.map(order =>
                order.randomNumber === randomNumber ? {...order, isUserCalled} : order
            );
            setOrderData(updatedOrderData);
            setFilteredOrders(updatedOrderData)
        } catch (error) {
            console.error("Failed to update isUserCalled:", error);
        }
    };

    const handleValidateAllProductsInCart = async (productOrders) => {
        const productDetailsList = [];

        productOrders.forEach(order => {
            const productDetails = {
                brandId: order.adminProductDTO.brandID,
                modelId: order.adminProductDTO.modelId,
                selectedTasteID: order.selectedTasteID
            };
            productDetailsList.push(productDetails);
        });
        const response = await validateAllProductsInOrder(productDetailsList);
        console.log(response)

        if (response.status === 200 || response.status === 202) {
            setModalMessage(response.data)
            setShowModal(true)
        }

    };

    const handleCloseModalValidProducts = () => {
        setShowModal(false)
        setModalMessage('')
    }

    return (
        <>
            {isLoading && <Loader/>}

            <div className="ordersContainer">
                <div className="ordersTopSection">
                    <h2 className="myBlackColor">Orders</h2>
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className="fw-bold fs-4">
                            Order By
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSortByChange("date")}>
                                Date
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortByChange("weight")}>
                                Weight
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortByChange("products")}>
                                Products count
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortByChange("customer")}>
                                Customer Pay
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortByChange("admin")}>
                                Admin Pay
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortByChange("profit")}>
                                Profit
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className="fw-bold fs-4">
                            Status
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleStatusChange("All")}>
                                All
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleStatusChange("PENDING")}>
                                Pending
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleStatusChange("APPROVED")}>
                                Approved
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleStatusChange("IN_DELIVERY")}>
                                In delivery
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleStatusChange("COMPLETED")}>
                                Completed
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleStatusChange("CANCELED")}>
                                Canceled
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="cards">
                    {filteredOrders.map((order, index) => (
                        <div key={index} className="card">
                            <div className="orderDetails">
                                <div className="singleLine">
                                    <h6><FaHashtag/>ID:</h6>
                                    <span>{order.randomNumber}</span>
                                </div>
                                <div className="singleLine">
                                    <h6><FaSignHanging/>Status:</h6>
                                    <span className={`${getStatusColor(order.orderStatus)}`}>{order.orderStatus}</span>
                                    <button
                                        disabled={!order.isUserCalled}
                                        className={!order.isUserCalled ? "disabledCustomButton" : "customButton"}
                                        onClick={() => {
                                            setShowStatusModal(true);
                                            setSelectedOrder(order);
                                        }}>
                                        <FaExchangeAlt/>
                                    </button>
                                </div>
                                <div className="singleLine">
                                    <h6><FaCalendarAlt/>Date:</h6>
                                    <span>{formatDate(order.date)}</span>
                                </div>
                                <hr/>
                                <div className="singleLine">
                                    <h6><FaUser/>User:</h6>
                                    <span>{order?.userInfo?.firstName} {order?.userInfo?.lastName} </span>
                                </div>
                                <div className="singleLine">
                                    <h6><FaEnvelope/>Email:</h6>
                                    <span>{order?.userInfo?.email}</span>
                                </div>
                                <div className="singleLine">
                                    <h6><FaPhoneVolume/>Phone:</h6>
                                    <span><span>{order?.userInfo?.phone}</span></span>
                                    <div className="checkbox-apple">
                                        <input
                                            className="yep"
                                            id={`check-apple-${order.randomNumber}`}
                                            type="checkbox"
                                            onChange={(e) =>
                                                handleChangeIsUserCalled(order.randomNumber, e.target.checked)}
                                            defaultChecked={order.isUserCalled || false}
                                        />
                                        <label htmlFor={`check-apple-${order.randomNumber}`}></label>
                                    </div>
                                </div>
                                <div className="singleLine">
                                    <h6><FaGlobeAmericas/>Country:</h6>
                                    <span>{order?.addressInfo?.country}</span>
                                </div>
                                <div className="singleLine">
                                    <h6><FaCity/>City:</h6>
                                    <span>{order?.addressInfo?.town}</span>
                                </div>
                                <div className="singleLine">
                                    <h6><IoIosPin/>Office:</h6>
                                    <span>{order?.addressInfo?.officeAddress}</span>
                                </div>
                                <hr/>
                                <div className="singleLine">
                                    <h6><FaTruckLoading/>Amount on delivery:</h6>
                                    <span>{order.amountToBePayedByCustomer.toFixed(2)} BGN</span>
                                </div>
                                <div className="singleLine">
                                    <h6><GiPayMoney/>Company amount:</h6>
                                    <span>{order.amountToBePayedByAdmin.toFixed(2)} BGN</span>
                                </div>
                                <div className="singleLine">
                                    <h6><GiProfit/>Profit:</h6>
                                    <span>{order.companyProfit.toFixed(2)} BGN</span>
                                </div>
                                <div className="singleLine">
                                    <h6><GiWeight/>Weight:</h6>
                                    <span>{order.totalWeight.toFixed(3)} kg</span>
                                </div>
                                <div className="singleLine">
                                    <h6><FaShoppingCart/>Products count:</h6>
                                    <span>{order.productOrders.length}</span>
                                    <button className="customButton"><FaEye/></button>
                                </div>
                                <div className="singleLine">
                                    <h6><FaTruckFront/>Speedy ID:</h6>
                                    <span>{order.speedyDeliveryId || "Not available"}</span>
                                </div>
                            </div>
                            <Button
                                variant="dark"
                                className="mt-2 text-center"
                                onClick={() => {
                                    handleValidateAllProductsInCart(order.productOrders)
                                }}
                            >
                                <FaCheckDouble className="mb-1 me-2 myGreenBlueColor"/>
                                Validate all products availability
                            </Button>
                            <Button variant="dark" className="mt-2 text-center">
                                <FaTruckMedical className="mb-1 me-2 myGreenBlueColor"/>
                                Generate Order in Speedy
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <StatusModal
                show={showStatusModal}
                onHide={() => setShowStatusModal(false)}
                selectedOrder={selectedOrder}
            />

            <Modal show={showModal} onHide={handleCloseModalValidProducts}>
                {modalMessage && modalMessage === 'All passed' && (
                    <>
                        <Modal.Header>
                            <Modal.Title><FaCircleCheck className="mb-1 me-2 myGreenBlueColor"/>Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center fw-bolder">
                            {modalMessage}
                        </Modal.Body>
                    </>
                )}

                {modalMessage && modalMessage !== 'All passed' && (
                    <>
                        <Modal.Header>
                            <Modal.Title><FaTimesCircle className="myRedColor mb-2 me-2"/>Fail</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center fw-bolder">
                            {modalMessage}
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </>
    );
}

export default Orders;