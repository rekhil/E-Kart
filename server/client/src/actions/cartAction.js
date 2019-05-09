import axios from "axios";
import { conf } from '../config.js';
import { GET_ERRORS, CART_DETAILS } from "./types";

// get cart details
export const getCartDetails = (guestId) => dispatch => {
    axios
        .get(`${conf.baseUrl}cart/${guestId}`)
        .then(response => {
            dispatch({ type: CART_DETAILS, payload: response.data.data })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};

// delete item from cart
export const deleteCartDetails = (cartItemId) => dispatch => {
    axios
        .delete(`${conf.baseUrl}cartitem/${cartItemId}`)
        .then(response => {
            dispatch({ type: CART_DETAILS, payload: response.data.data })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};

// Update cart item quantity
export const updateCartDetails = (cardData) => dispatch => {
    console.log(cardData)
    axios
        .put(`${conf.baseUrl}cartitem/${cardData.cartItemId}`, cardData)
        .then(response => {
            dispatch({ type: CART_DETAILS, payload: response.data.data })
        })
        .catch(err =>
            console.log(err)
        );
};


