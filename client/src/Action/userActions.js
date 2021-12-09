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
import { getAllItems, getAllUsers } from "./listActions";

const Api = Axios.create({
	withCredentials: true
});

export const authCheck = () =>
    async (dispatch) => {
        try {
            dispatch({ type: AUTH_CHECK });

            const url = "/auth";
            const response = await Api.get(url);
            
            if (response.status === 200) {
                if (response.data.email === "admin") {
                    getAllUsers(response.data.email);
                } else {
                    dispatch(getAllItems(response.data.email));
                }
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

            if (response.data.email !== "admin") {
                dispatch(getAllItems(response.data.email));
            }
            
            dispatch({
                type: AUTH_REQUEST_SUCCESS,
                payload: response.data,
            });

            // if (response.data.email === "admin") {
            //     dispatch(getAllUsers(response.data.email));
            // } else {
            //     dispatch(getAllItems(response.data.email));
            // }
            
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

            const url = "/logout";
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
