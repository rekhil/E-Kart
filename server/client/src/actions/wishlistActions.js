import axios from "axios";
import { conf } from '../config.js';
import { WISHLIST_DETAILS, GET_ERRORS } from "./types";

// get wishlist details
export const getWishlistDetails = () => dispatch => {
    axios
        .get(`${conf.baseUrl}wishlist`)
        .then(response => {
            dispatch({ type: WISHLIST_DETAILS, payload: response.data.data })
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

// delete product from wishlist
export const deleteWishlistDetails = (productId) => dispatch => {
    axios
        .delete(`${conf.baseUrl}wishlist/${productId}`)
        .then(response => {
            dispatch({ type: WISHLIST_DETAILS, payload: response.data.data })
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};