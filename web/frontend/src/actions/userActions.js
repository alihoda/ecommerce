import axios from "axios";

import * as consts from "../constants/userConstants";

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: consts.USER_LOGIN_REQUEST,
        });
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const { data } = await axios.post(
            "/api/users/login/",
            {
                username: username,
                password: password,
            },
            config
        );
        dispatch({
            type: consts.USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: consts.USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.message
                    : error.response.data.detail,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: consts.USER_LOGOUT });
    dispatch({ type: consts.USER_DETAIL_RESET });
};

export const register = (name, username, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: consts.USER_REGISTER_REQUEST,
        });

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/users/register/",
            {
                name: name,
                username: username,
                email: email,
                password: password,
            },
            config
        );

        dispatch({
            type: consts.USER_REGISTER_SUCCESS,
            payload: data,
        });

        dispatch({
            type: consts.USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: consts.USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.message
                    : error.response.data.detail,
        });
    }
};

export const getUserDetail = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: consts.USER_DETAIL_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Token ${userInfo.token}`,
            },
        };

        const { data } = await axios.get("/api/users/profile/", config);

        dispatch({
            type: consts.USER_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: consts.USER_DETAIL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.message
                    : error.response.data.detail,
        });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: consts.USER_UPDATE_PROFILE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Token ${userInfo.token}`,
            },
        };

        const { data } = await axios.put("/api/users/profile/", user, config);

        dispatch({
            type: consts.USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: consts.USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: consts.USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.message
                    : error.response.data.detail,
        });
    }
};

export const resetPassword = (oldPassword, newPassword) => async (dispatch, getState) => {
    try {
        dispatch({
            type: consts.RESET_PASSWORD_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Token ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            "/api/users/reset-password/",
            {
                old_password: oldPassword,
                new_password: newPassword,
            },
            config
        );

        dispatch({
            type: consts.RESET_PASSWORD_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: consts.RESET_PASSWORD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.message
                    : error.response.data.detail,
        });
    }
};
