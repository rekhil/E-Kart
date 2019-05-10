import axios from "axios";
import { conf } from '../config.js';
import { WISHLIST_DETAILS, GET_ERRORS } from "./types";

// get wishlist details
export const getWishlistDetails = (email) => dispatch => {
    axios
        .get(`${conf.baseUrl}wishlist/${email}`)
        .then(response => {
            dispatch({ type: WISHLIST_DETAILS, payload: response.data.data })
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

// delete product from wishlist
export const deleteWishlistDetails = (wishlistId, productId) => dispatch => {
    axios
        .delete(`${conf.baseUrl}wishlist/${wishlistId}/${productId}`)
        .then(response => {
            dispatch({ type: WISHLIST_DETAILS, payload: response.data.data })
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

// Add new product to wishlist
export const addToCartDetails = (wishlistData) => dispatch => {
    axios
        .post(`${conf.baseUrl}wishlist`, wishlistData)
        .then(response => {
            dispatch({ type: WISHLIST_DETAILS, payload: response.data.data })
        })
        .catch(err => console.log(err));
};