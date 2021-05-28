import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader";
import Message from "../Message";

import { getUserDetail } from "../../actions/userActions";

function UserProfileScreen({ location, history }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const userDetail = useSelector((state) => state.userDetail);
    const { error, loading, user } = userDetail;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetail());
            } else {
                setName(user.name);
                setEmail(user.email);
                setUsername(user.username);
            }
        }
    }, [dispatch, history, userInfo, user]);

    const updateHandler = () => {
        console.log("Go to update page");
    };

    return (
        <Row>
            <Col md={6}>
                <Row>
                    <Col md={10}>
                        <h2>My Info</h2>
                    </Col>
                    <Col md={2}>
                        <Button type="button" variant="light" onClick={() => updateHandler()}>
                            <i class="fas fa-pen fa-fw"></i>
                        </Button>
                    </Col>
                </Row>

                <hr />
                <Card border="dark">
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col md={5}>Name</Col>
                                    <Col md={7}>{name}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col md={5}>Username</Col>
                                    <Col md={7}>{username}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col md={5}>Email</Col>
                                    <Col md={7}>{email}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={6}>
                <h2>My Orders</h2>
                <hr />

                <Card border="dark"></Card>
            </Col>
        </Row>
    );
}

export default UserProfileScreen;
