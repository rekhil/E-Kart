import axios from "axios";
import { conf } from '../config.js';

export function cartCount() {
    return function (dispatch) {
        dispatch({ type: "CART_COUNT" })
        axios({
            method: 'GET',
            url: conf.baseUrl + 'cart/count'
        }).then((response) => {
            dispatch({ type: "CART_COUNT_SUCCESS", payload: response.data })
        }).catch((err) => {
            console.log(err)
        })
    }
}

