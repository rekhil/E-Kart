import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER
} from "./types";
import { conf } from '../config.js';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post(`${conf.baseUrl}account/profile`, userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Register User
export const updateProfile = (userData, history) => dispatch => {
    axios
        .put(`${conf.baseUrl}account/profile`, userData)
        .then(res => {
            // Remove token from local storage
            localStorage.removeItem("jwtToken");
            // Remove auth header for future requests
            setAuthToken(false);
            // Set current user to empty object {} which will set isAuthenticated to false
            dispatch(setCurrentUser({}, ''));
            history.push("/login")
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post(`${conf.baseUrl}account/login`, userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded, userData.email));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = (decoded, email) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        name: decoded.name,
        email: email
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}, ''));
};