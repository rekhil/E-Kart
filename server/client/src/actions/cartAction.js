import axios from "axios";
import { conf } from '../config.js';
import { GET_ERRORS, CART_DETAILS, CART_COUNT } from "./types";

// get cart details
export const getCartDetails = (guestId) => dispatch => {
    axios
        .get(`${conf.baseUrl}cart/${guestId}`)
        .then(response => {
            dispatch({ type: CART_DETAILS, payload: response.data.data })
            return axios
                .get(`${conf.baseUrl}cart/${guestId}/count`)
                .then(response => { dispatch({ type: CART_COUNT, payload: response.data.data }) })
                .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

// delete item from cart
export const deleteCartDetails = (cartItemId, guestId) => dispatch => {
    axios
        .delete(`${conf.baseUrl}cartitem/${cartItemId}`)
        .then(response => {
            dispatch({ type: CART_DETAILS, payload: response.data.data })
            return axios
                .get(`${conf.baseUrl}cart/${guestId}/count`)
                .then(countresponse => { dispatch({ type: CART_COUNT, payload: countresponse.data.data }) })
                .catch(counterr => dispatch({ type: GET_ERRORS, payload: counterr }));
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

// Add new product to cart
export const addToCartDetails = (cardData) => dispatch => {
    axios
        .post(`${conf.baseUrl}cart`, cardData)
        .then(response => {
            dispatch({ type: CART_DETAILS, payload: response.data.data })
            return axios
                .get(`${conf.baseUrl}cart/${cardData.guestId}/count`)
                .then(countresponse => { dispatch({ type: CART_COUNT, payload: countresponse.data.data }) })
                .catch(counterr => dispatch({ type: GET_ERRORS, payload: counterr }));
        })
        .catch(err => console.log(err));
};

// Update cart item quantity
export const updateCartDetails = (cardData) => dispatch => {
    axios
        .put(`${conf.baseUrl}cartitem/${cardData.cartItemId}`, cardData)
        .then(response => {
            dispatch({ type: CART_DETAILS, payload: response.data.data })
        })
        .catch(err => console.log(err));
};

//get count of distinct items
export const getCartCount = (guestId) => dispatch => {
    axios
        .get(`${conf.baseUrl}cart/${guestId}/count`)
        .then(response => { dispatch({ type: CART_COUNT, payload: response.data.data }) })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err })
        );
};



