import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader";
import Message from "../Message";
import FormContainer from "../FormContainer";

import { login } from "../../actions/userActions";

function LoginScreen({ location, history }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
    };

    return (
        <FormContainer>
            <Card>
                <Card.Header>
                    <h2>Sign In</h2>
                </Card.Header>

                <Card.Body>
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="d-flex flex-column">
                            <Button type="submit" className="btn btn-primary">
                                Sign In
                            </Button>
                        </Form.Group>
                    </Form>
                </Card.Body>

                <Card.Footer>
                    New Customer?{" "}
                    <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                        Sign Up
                    </Link>
                </Card.Footer>
            </Card>
        </FormContainer>
    );
}

export default LoginScreen;
