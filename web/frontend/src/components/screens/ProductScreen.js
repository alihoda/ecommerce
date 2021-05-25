import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";

import { listProductDetails } from "../../actions/productActions";
import Rating from "../Rating";
import Loader from "../Loader";
import Message from "../Message";

function ProductScreen({ match }) {
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetail);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Col>
                    <Row>
                        {/* Image col */}
                        <Col md={7}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Col>
                        {/* Cart col */}
                        <Col md={5}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="d-flex justify-content-between">
                                        <span>Price:</span>
                                        <strong>${product.price}</strong>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex justify-content-between">
                                        <span>Status:</span>
                                        <span>
                                            {product.countInStock > 0
                                                ? "In stock"
                                                : "Out of stock"}
                                        </span>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex flex-column">
                                        <Button
                                            className="btn-light"
                                            type="button"
                                            disabled={product.countInStock == 0}
                                        >
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="my-3">
                        <Col md={7}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>{product.name}</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>

                        <Col md={5}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Rating
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                            color={"#f8e825"}
                                        />
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex justify-content-between">
                                        <span>Brand:</span>
                                        <span>{product.brand}</span>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex justify-content-between">
                                        <span>Price:</span>
                                        <span>${product.price}</span>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            )}
        </div>
    );
}

export default ProductScreen;
