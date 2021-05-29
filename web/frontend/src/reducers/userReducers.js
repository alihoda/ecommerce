import * as consts from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case consts.USER_LOGIN_REQUEST:
            return { loading: true };

        case consts.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };

        case consts.USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };

        case consts.USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case consts.USER_REGISTER_REQUEST:
            return { loading: true };

        case consts.USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };

        case consts.USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };

        case consts.USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case consts.USER_DETAIL_REQUEST:
            return { ...state, loading: true };

        case consts.USER_DETAIL_SUCCESS:
            return { loading: false, user: action.payload };

        case consts.USER_DETAIL_FAIL:
            return { loading: false, error: action.payload };

        case consts.USER_DETAIL_RESET:
            return { user: {} };

        default:
            return state;
    }
};

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case consts.USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };

        case consts.USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };

        case consts.USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };

        case consts.USER_UPDATE_PROFILE_RESET:
            return {};

        default:
            return state;
    }
};

export const resetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case consts.RESET_PASSWORD_REQUEST:
            return { loading: true };

        case consts.RESET_PASSWORD_SUCCESS:
            return { loading: false, success: true };

        case consts.RESET_PASSWORD_FAIL:
            return { loading: false, error: action.payload };

        case consts.RESET_PASSWORD_RESET:
            return {};

        default:
            return state;
    }
};
