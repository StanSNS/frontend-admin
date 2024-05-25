import React, {useState} from "react";
import {Dropdown} from "react-bootstrap";
import SearchInput from "../../SearchInput/SearchInput";

function CurrentOrderProductTable({order}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(order.productOrders);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        const filteredData = order.productOrders.filter(product => product.adminProductDTO.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredProducts(filteredData);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredProducts(order.productOrders);
    };

    const handleSortByChange = (sortType) => {
        let sortedData = [...filteredProducts];
        switch (sortType) {
            case "id":
                sortedData.sort((a, b) => a.adminProductDTO.modelId - b.adminProductDTO.modelId);
                break;
            case "weight":
                sortedData.sort((a, b) => b.adminProductDTO.weightKg - a.adminProductDTO.weightKg);
                break;
            case "normal":
                sortedData.sort((a, b) => b.adminProductDTO.regularPrice - a.adminProductDTO.regularPrice);
                break;
            case "reduced":
                sortedData.sort((a, b) => b.adminProductDTO.discountedPrice - a.adminProductDTO.discountedPrice);
                break;
            case "quantity":
                sortedData.sort((a, b) => b.quantity - a.quantity);
                break;
            default:
                break;
        }
        setFilteredProducts(sortedData);
    };

    return (
        <div className="table-container">
            <div className="tableTopSection">
                <h2>Products</h2>

                <div className="tableSearchInputContainer">
                    <SearchInput
                        searchQuery={searchQuery}
                        handleSearchChange={handleSearchChange}
                        clearSearch={clearSearch}
                        placeHolder="Search by name"
                        myWidth={"100%"}
                        customClass="searchInputCustomClass"
                        buttonCustomClass="buttonCustomClass"
                    />
                </div>

                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic" className="fw-bold fs-5">
                        Sort By
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSortByChange("id")}>
                            ID
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortByChange("weight")}>
                            Weight
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortByChange("normal")}>
                            Normal price
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortByChange("reduced")}>
                            Reduced price
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortByChange("quantity")}>
                            Quantity
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="tableWrapper">
                <table className="table table-striped">
                    <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Weight</th>
                        <th>(R) price</th>
                        <th>(D) price</th>
                        <th>Quantity</th>
                        <th>Taste</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProducts.map((product, index) => (
                        <tr className={index % 2 === 0 ? 'even' : 'odd'} key={index}>
                            <td className="align-content-center">{product.adminProductDTO.modelId}</td>
                            <td className="imageTable align-content-center">
                                <img
                                    className="me-2"
                                    src={product.adminProductDTO.image}
                                    alt={index}
                                />
                                {product.adminProductDTO.name.substring(0,30)}
                            </td>

                            <td className="align-content-center">{product.adminProductDTO.weightKg} kg</td>
                            <td className="align-content-center">{product.adminProductDTO.regularPrice.toFixed(2)}</td>
                            <td className="align-content-center">{product.adminProductDTO.discountedPrice.toFixed(2)}</td>
                            <td className="align-content-center">{product.quantity}</td>
                            <td className="align-content-center">{product.selectedTaste}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default CurrentOrderProductTable;