import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import { conf } from '../config.js';

export const registerUser = (userData, history) => dispatch => {
    axios
        .post(`${conf.baseUrl}account/profile`, userData)
        .then(res => history.push("/login"))
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const updateProfile = (userData, history) => dispatch => {
    axios
        .put(`${conf.baseUrl}account/profile`, userData)
        .then(res => {
            localStorage.removeItem("jwtToken");
            setAuthToken(false);
            dispatch(setCurrentUser({}));
            history.push("/login")
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const loginUser = userData => dispatch => {
    axios
        .post(`${conf.baseUrl}account/login`, userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        name: decoded.name,
        email: decoded.email
    };
};