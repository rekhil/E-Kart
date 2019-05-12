import axios from "axios";
import { conf } from '../config.js';
import { SEARCH_PRODUCT, DEALS_PRODUCT, RECOMMENTED_PRODUCT, GET_ERRORS } from "./types";

// search products by searchText
export const searchProducts = (searchText) => dispatch => {
    axios
        .post(`${conf.baseUrl}products/search`, { searchText: searchText })
        .then(response => {
            dispatch({ type: SEARCH_PRODUCT, payload: response.data.data })
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};