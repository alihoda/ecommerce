import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { productListReducer, productDetailReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import * as userReducers from "./reducers/userReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userReducers.userLoginReducer,
    userRegister: userReducers.userRegisterReducer,
    userDetail: userReducers.userDetailReducer,
    userUpdateProfile: userReducers.userUpdateProfileReducer,
    userResetPassword: userReducers.resetPasswordReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems");
const cartItems = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [];

const userInfoFromStorage = localStorage.getItem("userInfo");
const userInfo = userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress");
const shippingAddress = shippingAddressFromStorage ? JSON.parse(shippingAddressFromStorage) : {};

const initialState = {
    cart: { cartItems: cartItems, shippingAddress: shippingAddress },
    userLogin: { userInfo: userInfo },
};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
