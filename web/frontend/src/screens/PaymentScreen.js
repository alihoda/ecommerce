import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";

import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();

    if (!shippingAddress) {
        history.push("/shipping");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/placeorder");
    };

    return (
        <FormContainer>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h2>Payment</h2>
                    </Card.Title>

                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Select Method</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="radio"
                                        label="PayPal or Credit Card"
                                        id="paypal"
                                        name="paymentMethod"
                                        value="PayPal"
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    ></Form.Check>
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="radio"
                                        label="Stripe"
                                        id="stripe"
                                        name="paymentMethod"
                                        value="Stripe"
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    ></Form.Check>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="d-flex flex-column">
                            <Button type="submit" variant="outline-success">
                                Continue
                            </Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </FormContainer>
    );
}

export default PaymentScreen;
