import axios from "axios";

import * as consts from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: consts.ORDER_CREATE_REQUEST,
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

        const { data } = await axios.post("/api/orders/add/", order, config);

        dispatch({
            type: consts.ORDER_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: consts.ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.message
                    : error.response.data.detail,
        });
    }
};
