import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { getUserDetail, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function UserProfileUpdateScreen({ location, history }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const userDetail = useSelector((state) => state.userDetail);
    const { error, loading, user } = userDetail;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        // Redirect if not logged in
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user || !user.name) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetail());
            } else {
                setName(user.name);
                setEmail(user.email);
                setUsername(user.username);
            }
            // Redirect if update was successful
            if (success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetail());
                history.push("/profile");
            }
        }
    }, [dispatch, history, userInfo, user, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!name || !username || !email) {
            setMessage("Found empty fields. Fill them.");
        } else {
            // Dispatch updateUserProfile action
            dispatch(
                updateUserProfile({
                    id: user.id,
                    name: name,
                    username: username,
                    email: email,
                })
            );
        }
    };

    return (
        <FormContainer>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h2>Update Profile</h2>
                    </Card.Title>
                    <hr />

                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="d-flex flex-column">
                            <Button type="submit" variant="outline-primary">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </FormContainer>
    );
}

export default UserProfileUpdateScreen;
