import React, { useState } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
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
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="paypal"
                            name="paymentMethod"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Form.Group className="d-flex flex-column">
                    <Button type="submit" variant="outline-success">
                        Continue
                    </Button>
                </Form.Group>
            </Form>
        </FormContainer>
    );
}

export default PaymentScreen;
