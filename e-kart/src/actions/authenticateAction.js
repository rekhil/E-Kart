import axios from "axios";
import { conf } from '../config.js';

export function login(loginInfo) {
    return function (dispatch) {
        axios({
            method: 'POST',
            url: conf.baseUrl + 'authentication/login',
            headers: { "Content-Type": "application/json" },
            data: loginInfo
        }).then(function (response) {
            dispatch({ type: "LOGIN_SUCCESS", payload: response })
        }).catch(function (error) {
            console.log(error);
        });
    }
}