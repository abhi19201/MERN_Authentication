import {
    AUTH_CHECK,
    AUTH_REQUEST,
    AUTH_REQUEST_SUCCESS,
    AUTH_REQUEST_FAILURE,
    AUTH_LOGOUT_REQUEST,
    AUTH_LOGOUT_REQUEST_SUCCESS,
    AUTH_LOGOUT_REQUEST_FAILURE,
} from "../Constants/constants";
import Axios from "axios";

const Api = Axios.create({
	withCredentials: true
});

export const authCheck = () =>
    async (dispatch) => {
        try {
            dispatch({ type: AUTH_CHECK });

            const url = "/";
            const response = await Api.get(url);
            
            if (response.status === 200) {
                dispatch({
                    type: AUTH_REQUEST_SUCCESS,
                    payload: response.data,
                });
            }
            
        } catch (error) {
            console.log(error)
            dispatch({
                type: AUTH_REQUEST_FAILURE,
                payload: error.message,
            });
        }
    };

//login
export const loginReq =
    (email = "", password = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: AUTH_REQUEST });

            const url = "/login";

            const userInput = { email: email, password: password };

            const response = await Api.post(url, userInput);

            dispatch({
                type: AUTH_REQUEST_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: AUTH_REQUEST_FAILURE,
                payload: error.message,
            });
        }
    };


//signup
export const signupReq = (signupCreds={}) =>
    async (dispatch) => {
        try {
            dispatch({ type: AUTH_REQUEST });

            const url = "/signup";
            
            const response = await Api.post(url, signupCreds);
            dispatch({
                type: AUTH_REQUEST_SUCCESS,
                payload: response.data,
            });

        } catch (error) {
            dispatch({
                type: AUTH_REQUEST_FAILURE,
                payload: error.message,
            });
        }
    };


    
//logout
export const logoutReq = (email="") =>
    async (dispatch) => {
        try {
            dispatch({ type: AUTH_LOGOUT_REQUEST });

            const url = "http://localhost:8000/logout";
            const response = await Api.post(url);

            dispatch({
                type: AUTH_LOGOUT_REQUEST_SUCCESS,
                payload: response.data,
            });

        } catch (error) {
            dispatch({
                type: AUTH_LOGOUT_REQUEST_FAILURE,
                payload: error.message,
            });
        }
    };
