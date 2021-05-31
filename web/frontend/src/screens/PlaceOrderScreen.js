import React, { useState } from "react";
import { Button, Card, ListGroup, Image, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Message from "../components/Message";
import { saveShippingAddress } from "../actions/cartActions";

function PlaceOrderScreen() {
    const cart = useSelector((state) => state.cart);

    cart.itemsPrice = cart.cartItems
        .reduce((acc, item) => acc + item.qty * item.price, 0)
        .toFixed(2);
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
    cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);

    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice);

    const placeOrderHandler = (e) => {
        e.preventDefault();
        console.log("placed");
    };

    return (
        <Row>
            <Col md={7}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h1>Shipping</h1>
                            <strong>Location:</strong>
                            <span>
                                {" "}
                                {cart.shippingAddress.country}
                                {", "} {cart.shippingAddress.city}
                                {", "}
                                {cart.shippingAddress.address}
                                {", "}
                                {cart.shippingAddress.postalCode}
                            </span>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h1>Payment Method</h1>
                            <strong>Method:</strong>
                            <span> {cart.paymentMethod}</span>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h1>Orders Items</h1>
                            {cart.cartItems.length === 0 ? (
                                <Message variant="info">Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>

                                                <Col>
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                        className="text-dark"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={5}>
                                                    {item.qty} X ${item.price} = $
                                                    {(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

            <Col md={5}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item className="d-flex flex-column">
                            <Button
                                type="button"
                                className="btn-light"
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default PlaceOrderScreen;
