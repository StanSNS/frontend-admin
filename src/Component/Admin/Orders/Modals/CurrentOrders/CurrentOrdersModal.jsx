import React, {useEffect} from "react";
import "./CurrentOrdersModal.css"
import {Modal} from "react-bootstrap";

function CurrentOrdersModal({show, onHide, currentProducts}) {
    useEffect(() => {
        console.log(currentProducts)
    });

    return (
        <Modal show={show} onHide={onHide} size={"xl"}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Products ({currentProducts?.length})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="currentProductsCards">
                    {currentProducts && currentProducts.map((product, index) => (
                        <div key={index} className="card">
                            <div className="card-image">
                                <img src={product?.adminProductDTO?.image} alt={product?.modelId}/>
                            </div>
                            <div className="name">
                                {product?.adminProductDTO?.name}
                            </div>
                            <div className="additionalInfo">
                                <span><strong>Model ID:</strong> {product?.adminProductDTO?.modelId}</span>
                                <span><strong>Quantity:</strong> x{product?.quantity}</span>
                                <span><strong>Weight:</strong> {product?.adminProductDTO?.weightKg} kg</span>
                                <span><strong>Taste:</strong> {product?.selectedTaste}</span>
                                <span><strong>Regular price</strong> {product?.adminProductDTO?.regularPrice} BGN</span>
                                <span><strong>Discounted price</strong> {product?.adminProductDTO?.discountedPrice} BGN</span>
                            </div>
                        </div>
                    ))}
                </div>

            </Modal.Body>
        </Modal>
    );
}

export default CurrentOrdersModal;