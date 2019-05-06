import axios from "axios";
import { conf } from '../config.js';

export function createAccount(userProfile) {
    return function (dispatch) {
        axios({
            method: 'POST',
            url: conf.baseUrl + 'account',
            headers: { "Content-Type": "application/json" },
            data: userProfile
        }).then(function (response) {
            dispatch({ type: "ACCOUNT_CREATE_SUCCESS", payload: response })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function updateAccount(userProfile) {
    return function (dispatch) {
        axios({
            method: 'PUT',
            url: conf.baseUrl + 'account',
            headers: { "Content-Type": "application/json" },
            data: userProfile
        }).then(function (response) {
            dispatch({ type: "ACCOUNT_UPDATE_SUCCESS", payload: response })
        }).catch(function (error) {
            console.log(error);
        });
    }
}