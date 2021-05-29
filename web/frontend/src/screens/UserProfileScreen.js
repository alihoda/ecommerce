import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { getUserDetail } from "../actions/userActions";

function UserProfileScreen({ location, history }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

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

    return (
        <Row>
            <Col md={6}>
                <h2>My Info</h2>
                <hr />

                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

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

                            <ListGroup.Item>
                                <Row>
                                    <Col md={6} className="justify-content-md-center">
                                        <Link to={"/profile-update"}>Update Profile</Link>
                                    </Col>
                                    <Col md={6} className="justify-content-md-center">
                                        <Link to={"/reset-password"}>Reset Password</Link>
                                    </Col>
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
