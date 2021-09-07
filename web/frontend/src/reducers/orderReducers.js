import * as consts from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case consts.ORDER_CREATE_REQUEST:
            return {
                loading: true,
            };
        case consts.ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            };
        case consts.ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
