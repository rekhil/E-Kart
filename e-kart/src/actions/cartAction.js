import axios from "axios";
import { conf } from '../config.js';

export function getCartDetails(guestId) {
    return function (dispatch) {
        axios({
            method: 'GET',
            url: `${conf.baseUrl}cart/${guestId}`,
            headers: { 'Access-Control-Allow-Origin': '*' }
        }).then(function (response) {
            dispatch({ type: "CART_DETAILS", payload: response.data.data })
        }).catch(function (error) {
            console.log(error)
        });
    }
}

export function deleteCartDetails(cartItemId) {
    return function (dispatch) {
        axios({
            method: 'DELETE',
            url: `${conf.baseUrl}cartitem/${cartItemId}`,
            headers: { 'Access-Control-Allow-Origin': '*' }
        }).then(function (response) {
            dispatch({ type: "CART_DETAILS", payload: response.data.data })
        }).catch(function (error) {
            console.log(error)
        });
    }
}


