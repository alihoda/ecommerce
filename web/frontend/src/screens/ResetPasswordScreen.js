import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { resetPassword } from "../actions/userActions";
import { RESET_PASSWORD_RESET } from "../constants/userConstants";

function ResetPasswordScreen({ location, history }) {
    // States
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    // Retrieve current logged in user state
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userResetPassword = useSelector((state) => state.userResetPassword);
    const { error, loading, success } = userResetPassword;

    useEffect(() => {
        // Redirect user if not logged in
        if (!userInfo) {
            history.push("/login");
        } else {
            dispatch({ type: RESET_PASSWORD_RESET });

            // Redirect if update was successful
            if (success) {
                dispatch({ type: RESET_PASSWORD_RESET });
                history.push("/profile");
            }
        }
    }, [dispatch, history, userInfo, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!oldPassword || !newPassword || !newPasswordConfirm) {
            setMessage("All fields must be filled");
        } else {
            // Check newPassword is the same with newPasswordConfirm
            if (newPassword !== newPasswordConfirm) {
                setMessage("Password does not matched");
            } else {
                // Dispatch resetPassword action
                dispatch(resetPassword(oldPassword, newPassword));
                setMessage("");
            }
        }
    };

    return (
        <FormContainer>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h2>Reset Password</h2>
                    </Card.Title>
                    <hr />

                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="oldPassword">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="newPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Confirm New Password"
                                value={newPasswordConfirm}
                                onChange={(e) => setNewPasswordConfirm(e.target.value)}
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

export default ResetPasswordScreen;
