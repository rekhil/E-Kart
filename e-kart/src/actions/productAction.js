import axios from "axios";
import { conf } from '../config.js';

export function searchProducts(searchString) {
    return function (dispatch) {
        axios({
            method: 'GET',
            url: `${conf.baseUrl}products`,
            headers: { 'Access-Control-Allow-Origin': '*' }
        }).then(function (response) {
            dispatch({ type: "SEARCH_PRODUCT", payload: response.data.data })
        }).catch(function (error) {
            console.log(error)
        });
    }
}