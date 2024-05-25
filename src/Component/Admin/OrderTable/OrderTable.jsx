import React, {useEffect, useState} from "react";
import "./OrderTable.css"
import {Button, Dropdown} from "react-bootstrap";
import {FaUserAlt} from "react-icons/fa";
import Loader from "../../STATIC/Loader/Loader";
import CurrentOrderModal from "../CurrentOrderModal/CurrentOrderModal";
import StatusModal from "../StatusModal/StatusModa";
import SearchInput from "../../SearchInput/SearchInput";
import {getAllOrderData} from "../../../Service/AdminService";

function OrderTable() {
    const [orderData, setOrderData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState(orderData);
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDataLoading, setIsDataLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllOrderData();
            console.log(data)


            setOrderData(data)
            setFilteredOrders(data);
            setIsDataLoading(false)
        };
        setIsDataLoading(true)
        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        const filteredData = orderData.filter(order => order.randomNumber.toString().toLowerCase().includes(value.toLowerCase()));
        setFilteredOrders(filteredData);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredOrders(orderData);
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

    const handleStatusChange = (status) => {
        if (status === 'All') {
            setFilteredOrders(orderData);
        } else {
            const filteredData = orderData.filter(order => order.orderStatus === status);
            setFilteredOrders(filteredData);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'long'});
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes().toString().padStart(2, '0');
        return `${day} ${month} ${year} - ${hour}:${minute}`;
    }

    return (
        <>
            {isDataLoading && <Loader/>}

            <CurrentOrderModal
                show={showUserInfoModal}
                onHide={() => setShowUserInfoModal(false)}
                selectedOrder={selectedOrder}
            />

            <StatusModal
                show={showStatusModal}
                onHide={() => setShowStatusModal(false)}
                selectedOrder={selectedOrder}
            />

            <div className="table-container">
                <div className="tableTopSection">
                    <h2>Orders</h2>

                    <div className="tableSearchInputContainer ms-2">
                        <SearchInput
                            searchQuery={searchQuery}
                            handleSearchChange={handleSearchChange}
                            clearSearch={clearSearch}
                            placeHolder="Search by order ID"
                            myWidth={"100%"}
                            customClass="searchInputCustomClass"
                            buttonCustomClass="buttonCustomClass"
                        />
                    </div>

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

                <div className="tableWrapper">
                    <table className="table table-striped">
                        <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Total Weight</th>
                            <th>Products</th>
                            <th>Customer pay</th>
                            <th>Company pay</th>
                            <th>Profit</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredOrders.map((order, index) => (
                            <tr className={index % 2 === 0 ? "even" : "odd"} key={index}>
                                <td className="align-content-center">{order.randomNumber}</td>
                                <td className="align-content-center">{formatDate(order.date)}</td>
                                <td className="align-content-center">{order.totalWeight.toFixed(3)} kg</td>
                                <td className="align-content-center">{order.productOrders.length}</td>
                                <td className="align-content-center">{order.amountToBePayedByCustomer.toFixed(2)} BGN</td>
                                <td className="align-content-center">{order.amountToBePayedByAdmin.toFixed(2)} BGN</td>
                                <td className="align-content-center">{order.companyProfit.toFixed(2)} BGN</td>
                                <td className="align-content-center">
                                    <Button
                                        className={`${getStatusColor(order.orderStatus)}`}
                                        variant={"dark"}
                                        onClick={() => {
                                            setShowStatusModal(true);
                                            setSelectedOrder(order);
                                        }}>
                                        {order.orderStatus}
                                    </Button>
                                </td>
                                <td className="align-content-center">
                                    <Button variant="dark" onClick={() => {
                                        setShowUserInfoModal(true);
                                        setSelectedOrder(order);
                                    }}>
                                        <FaUserAlt className="mb-1"/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
}

export default OrderTable;