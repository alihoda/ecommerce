import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import FormContainer from "../components/FormContainer";

import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen({ history }) {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, country, postalCode }));
        history.push("/payment");
    };

    return (
        <FormContainer>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h2>Shipping</h2>
                    </Card.Title>

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="postalCode">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
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

export default ShippingScreen;
